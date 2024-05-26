import useShowPost from "@/api/posts/Show";
import PostCard from "@/components/Posts/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams();
  const { data, error, isLoading, showPostReq, reFetchPost } = useShowPost();

  const [reFetch, setReFetch] = useState(false);

  console.log("postId: ", postId);

  useEffect(() => {
    showPostReq(postId);
  }, []);

  useEffect(() => {
    if (reFetch) {
      reFetchPost(postId);
    }

    return () => {
      setReFetch(false);
    };
  }, [reFetch]);

  return (
    <>
      <div className="max-w-3xl mx-auto py-10">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>failed to load</p>
        ) : (
          <PostCard post={data} redirect={false} setReFetch={setReFetch} />
        )}
      </div>
    </>
  );
};

export default PostDetails;
