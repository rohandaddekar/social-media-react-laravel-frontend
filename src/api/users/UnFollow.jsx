import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useUserUnFollow = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userUnFollowReq = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/users/follow/cancel-or-unfollow/${userId}`,
        {},
        authHeaders
      );
      console.log("user unfollow res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "Unfollowed successfully",
      });
      setData(res?.data);
    } catch (error) {
      console.error("failed to unfollow user: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to unfollow",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userUnFollowReq };
};

export default useUserUnFollow;
