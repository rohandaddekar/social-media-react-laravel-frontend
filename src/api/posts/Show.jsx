import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useShowPost = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const showPostReq = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/posts/${id}`, authHeaders);
        setData(res?.data?.data);
      } catch (error) {
        console.log("failed to fetch all posts: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios, authHeaders]
  );

  const reFetchPost = useCallback(
    async (id) => {
      await showPostReq(id);
    },
    [showPostReq]
  );

  return { data, error, isLoading, showPostReq, reFetchPost };
};

export default useShowPost;
