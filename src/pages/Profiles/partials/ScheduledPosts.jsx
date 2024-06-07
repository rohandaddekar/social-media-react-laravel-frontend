/* eslint-disable react/prop-types */

import { useEffect } from "react";
import useAllPosts from "@/api/posts/All";
import PostCard from "@/components/Posts/Card";
import PostCardSkeleton from "@/components/Posts/CardSkeleton";

const ScheduledPosts = ({ userId, setSelectedTab }) => {
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
    allPostsReq(`per_page=10&user_id=${userId}&scheduled=true`);
  }, [userId]);

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
                <PostCard post={post} scheduled setReFetch={reFetch} />
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

export default ScheduledPosts;
