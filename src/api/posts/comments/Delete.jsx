import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useDeletePostComment = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const deletePostCommentReq = async (commentId) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `/posts/comments/${commentId}`,
        authHeaders
      );
      console.log("delete Comment res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "Comment deleted successfully",
      });
      setData(res?.data);
    } catch (error) {
      console.error("failed to delete Comment: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to delete Comment",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, setError, isLoading, deletePostCommentReq };
};

export default useDeletePostComment;
