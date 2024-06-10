import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useAllPosts = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allPostsReq = useCallback(
    async (query) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/posts${query ? query : ""}`, authHeaders);
        setData(res?.data?.data);
      } catch (error) {
        console.log("failed to fetch all posts: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios]
  );

  const reFetchAllPosts = useCallback(
    async (query) => {
      await allPostsReq(query);
    },
    [allPostsReq]
  );

  return { data, setData, error, isLoading, allPostsReq, reFetchAllPosts };
};

export default useAllPosts;
