import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useDeletePost = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const deletePostReq = async (postId) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/posts/${postId}`, authHeaders);
      console.log("delete post res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "Post deleted successfully",
      });
      setData(res?.data);
    } catch (error) {
      console.error("failed to delete post: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to delete post",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, setError, isLoading, deletePostReq };
};

export default useDeletePost;
