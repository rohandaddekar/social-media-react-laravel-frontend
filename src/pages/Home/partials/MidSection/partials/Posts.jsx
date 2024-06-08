import useAllPosts from "@/api/posts/All";
import PostCard from "@/components/Posts/Card";
import PostCardSkeleton from "@/components/Posts/CardSkeleton";
import { publicEventListner } from "@/lib/laravelEcho.config";
import usePostCommentListner from "@/listners/post/Comment";
import { useEffect } from "react";

const Posts = () => {
  const { allPostsReq, data, error, setData, isLoading } = useAllPosts();

  useEffect(() => {
    allPostsReq();
  }, []);

  useEffect(() => {
    publicEventListner()
      .channel("post-channel")
      .listen("PostEvent", (e) => {
        setData((prev) => {
          const parsedImages = JSON.parse(e.post.images);

          console.log("e.post: ", e.post);
          return {
            ...prev,
            data: [{ ...e.post, images: parsedImages }, ...prev.data],
          };
        });
      });

    return () => {
      publicEventListner().leave("post-channel");
    };
  }, []);

  const postCommentListnerHandler = (e) => {
    setData((prev) => {
      const updatedData = prev.data.map((post) => {
        if (post.id === e.comment.post_id) {
          return {
            ...post,
            comments: [e.comment, ...post.comments],
          };
        }
        return post;
      });

      return {
        ...prev,
        data: updatedData,
      };
    });
  };
  usePostCommentListner(postCommentListnerHandler);

  if (isLoading) {
    return Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="mb-3">
        <PostCardSkeleton />
      </div>
    ));
  }

  if (error) {
    return <p>failed to load</p>;
  }

  return (
    <>
      {
        <ul className="space-y-3">
          {data?.data?.length > 0 ? (
            data?.data?.map((post, i) => (
              <li key={i}>
                <PostCard post={post} />
              </li>
            ))
          ) : (
            <li className="bg-gray-50 rounded-md p-3 text-center">
              no post yet...
            </li>
          )}
        </ul>
      }
    </>
  );
};

export default Posts;
