import useShowPost from "@/api/posts/Show";
import PostCard from "@/components/Posts/Card";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const { data, error, isLoading, showPostReq } = useShowPost();

  console.log("postId: ", postId);

  useEffect(() => {
    showPostReq(postId);
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto py-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>failed to load</p>
        ) : (
          <PostCard post={data} redirect={false} />
        )}
      </div>
    </>
  );
};

export default PostDetails;
