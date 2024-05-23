import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import useAuthHeaders from "@/api/authHeaders";

const useCreatePost = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const createPostReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/posts", payload, {
        ...authHeaders,
        headers: {
          ...authHeaders.headers,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("create post res: ", res?.data?.data);
      toast.success(res?.data?.message || "Post created successfully");
      setData(res?.data);
    } catch (error) {
      console.error("failed to create post: ", error);
      toast.error(error?.response?.data?.message || "Failed to create post");
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, setError, isLoading, createPostReq };
};

export default useCreatePost;
