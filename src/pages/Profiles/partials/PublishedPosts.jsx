/* eslint-disable react/prop-types */

import { useEffect } from "react";
import useAllPosts from "@/api/posts/All";
import PostCard from "@/components/Posts/Card";
import PostCardSkeleton from "@/components/Posts/CardSkeleton";
import usePostCommentListner from "@/listners/post/Comment";
import usePostLikeListner from "@/listners/post/Like";
import { useSelector } from "react-redux";

const PublishedPosts = ({ userId, setSelectedTab }) => {
  const authUser = useSelector((state) => state.authUser);
  const {
    allPostsReq,
    data: dataAllPosts,
    setData: setDataAllPosts,
    isLoading: isLoadingAllPosts,
    reFetchAllPosts,
    error: errorAllPosts,
  } = useAllPosts();

  const reFetch = () => {
    reFetchAllPosts(`?user_id=${userId}`);
    setSelectedTab("published-posts");
  };

  useEffect(() => {
    allPostsReq(`?per_page=10&user_id=${userId}`);
  }, [userId]);

  const postCommentListnerHandler = (e) => {
    console.log("postCommentListnerHandler: ", e);

    if (e.type === "created") {
      setDataAllPosts((prev) => {
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
      setDataAllPosts((prev) => {
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
      setDataAllPosts((prev) => {
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

    setDataAllPosts((prev) => {
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

  return (
    <>
      {isLoadingAllPosts ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mb-3">
            <PostCardSkeleton />
          </div>
        ))
      ) : errorAllPosts ? (
        <p>failed to load</p>
      ) : (
        <ul className="space-y-3">
          {dataAllPosts?.data?.length > 0 ? (
            dataAllPosts?.data?.map((post, i) => (
              <li key={i}>
                <PostCard post={post} setReFetch={reFetch} />
              </li>
            ))
          ) : (
            <li className="bg-gray-50 rounded-md p-3 text-center">
              no post yet...
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default PublishedPosts;
