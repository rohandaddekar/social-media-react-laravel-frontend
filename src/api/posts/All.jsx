import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";

const useAllPosts = () => {
  const axios = useAxios();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allPostsReq = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/posts");
      setData(res?.data?.data);
    } catch (error) {
      console.log("failed to fetch all posts: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  const reFetchAllPosts = useCallback(async () => {
    await allPostsReq();
  }, [allPostsReq]);

  return { data, setData, error, isLoading, allPostsReq, reFetchAllPosts };
};

export default useAllPosts;
