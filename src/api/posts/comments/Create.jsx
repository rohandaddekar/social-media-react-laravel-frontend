import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import useAuthHeaders from "@/api/authHeaders";

const useCreatePostComment = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const createPostCommentReq = async (payload, postId) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/posts/comments/${postId}`,
        payload,
        authHeaders
      );
      console.log("add comment res: ", res?.data?.data);
      toast.success(res?.data?.message || "Comment added successfully");
      setData(res?.data);
    } catch (error) {
      console.error("failed to add comment: ", error);
      toast.error(error?.response?.data?.message || "Failed to add comment");
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, setError, isLoading, createPostCommentReq };
};

export default useCreatePostComment;
