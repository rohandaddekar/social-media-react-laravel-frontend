import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useShowPost = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const showPostReq = async (id) => {
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
  };

  return { data, error, isLoading, showPostReq };
};

export default useShowPost;
