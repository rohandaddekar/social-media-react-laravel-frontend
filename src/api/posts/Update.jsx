import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import toast from "react-hot-toast";

const useUpdatePost = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const updatePostReq = async (payload, id) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/posts/${id}`,
        payload,
        // authHeaders
        {
          ...authHeaders,
          headers: {
            ...authHeaders.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(res?.data?.message || "post updated successfully");
      setData(res?.data?.data);
    } catch (error) {
      console.log("failed to update post: ", error);
      toast.error(error?.response?.data?.message || "Failed to update post");
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, setError, updatePostReq };
};

export default useUpdatePost;