import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import toast from "react-hot-toast";

const useUpdatePostComment = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const updatePostCommentReq = async (payload, id) => {
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `/posts/comments/${id}`,
        payload,
        authHeaders
      );
      toast.success(res?.data?.message || "Comment updated successfully");
      setData(res?.data?.data);
    } catch (error) {
      console.log("failed to update comment: ", error);
      toast.error(error?.response?.data?.message || "Failed to update comment");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, updatePostCommentReq };
};

export default useUpdatePostComment;
