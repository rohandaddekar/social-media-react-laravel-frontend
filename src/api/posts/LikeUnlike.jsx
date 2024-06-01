import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useLikeUnlikePost = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const likeUnlikePostReq = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/posts/like-unlike/${id}`, {}, authHeaders);
      toast({
        title: res?.data?.message || "Post like/unlike successfully",
      });
      console.log("like/unlike post res: ", res?.data?.data);
      setData(res);
    } catch (error) {
      console.log("failed to like/unlike posts: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to like/unlike post",
      });
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, likeUnlikePostReq };
};

export default useLikeUnlikePost;
