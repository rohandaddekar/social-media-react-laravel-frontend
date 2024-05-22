import { useState } from "react";
import useAxios from "@/api/axiosInstance";

const useAllPosts = () => {
  const axios = useAxios();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allPostsReq = async () => {
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
  };

  return { data, setData, error, isLoading, allPostsReq };
};

export default useAllPosts;
