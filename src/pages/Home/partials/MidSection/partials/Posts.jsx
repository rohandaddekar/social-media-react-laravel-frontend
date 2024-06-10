import useAllPosts from "@/api/posts/All";
import PostCard from "@/components/Posts/Card";
import PostCardSkeleton from "@/components/Posts/CardSkeleton";
import usePostCommentListner from "@/listners/post/Comment";
import usePostLikeListner from "@/listners/post/Like";
import usePostListner from "@/listners/post/Post";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Posts = () => {
  const authUser = useSelector((state) => state.authUser);
  const { allPostsReq, data, error, setData, isLoading } = useAllPosts();

  useEffect(() => {
    allPostsReq();
  }, []);

  const postListnerHandler = (e) => {
    if (e.type === "created") {
      setData((prev) => {
        return {
          ...prev,
          data: [
            {
              ...e.post,
              images: JSON.parse(e.post.images),
            },
            ...prev.data,
          ],
        };
      });
    }

    if (e.type === "deleted") {
      setData((prev) => {
        return {
          ...prev,
          data: prev.data.filter((post) => post.id !== e.post.id),
        };
      });
    }

    if (e.type === "updated") {
      console.log("updated: ", e);
      setData((prev) => {
        return {
          ...prev,
          data: prev.data.map((post) => {
            if (post.id === e.post.id) {
              return {
                ...e.post,
                images: JSON.parse(e.post.images),
              };
            }
            return post;
          }),
        };
      });
    }
  };
  usePostListner(postListnerHandler);

  const postCommentListnerHandler = (e) => {
    console.log("postCommentListnerHandler: ", e);

    if (e.type === "created") {
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
    }

    if (e.type === "deleted") {
      setData((prev) => {
        const updatedData = prev.data.map((post) => {
          if (post.id === e.comment.post_id) {
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.id !== e.comment.id
              ),
            };
          }
          return post;
        });

        return {
          ...prev,
          data: updatedData,
        };
      });
    }

    if (e.type === "updated") {
      setData((prev) => {
        const updatedData = prev.data.map((post) => {
          if (post.id === e.comment.post_id) {
            return {
              ...post,
              comments: post.comments.map((comment) => {
                if (comment.id === e.comment.id) {
                  return e.comment;
                }
                return comment;
              }),
            };
          }
          return post;
        });
        return {
          ...prev,
          data: updatedData,
        };
      });
    }
  };
  usePostCommentListner(postCommentListnerHandler);

  const postLikeListnerHandler = (e) => {
    // console.log("postLikeListnerHandler: ", e);

    setData((prev) => {
      const updatedData = prev.data.map((post) => {
        if (post.id === e.post.id) {
          return {
            ...post,
            likes: e.post.likes,
            is_liked: e.post.likes.some((like) => like.user_id === authUser.id),
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
  usePostLikeListner(postLikeListnerHandler);

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
