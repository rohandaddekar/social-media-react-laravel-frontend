import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useAllPostComments = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allPostCommentsReq = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/posts/comments/all/${id}`, authHeaders);
        setData(res?.data?.data);
      } catch (error) {
        console.log("failed to fetch all post comments: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios]
  );

  const reFetchAllPosts = useCallback(
    async (id) => {
      await allPostCommentsReq(id);
    },
    [allPostCommentsReq]
  );

  return {
    data,
    setData,
    error,
    isLoading,
    allPostCommentsReq,
    reFetchAllPosts,
  };
};

export default useAllPostComments;
