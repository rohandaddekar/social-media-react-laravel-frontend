/* eslint-disable react/prop-types */

import { useEffect } from "react";
import useAllPosts from "@/api/posts/All";
import PostCard from "@/components/Posts/Card";

const PublishedPosts = ({ userId, setSelectedTab }) => {
  const {
    allPostsReq,
    data: dataAllPosts,
    isLoading: isLoadingAllPosts,
    reFetchAllPosts,
    error: errorAllPosts,
  } = useAllPosts();

  const reFetch = () => {
    reFetchAllPosts(`user_id=${userId}`);
    setSelectedTab("published-posts");
  };

  useEffect(() => {
    allPostsReq(`per_page=10&user_id=${userId}`);
  }, [userId]);

  return (
    <>
      {isLoadingAllPosts ? (
        <p>loading...</p>
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