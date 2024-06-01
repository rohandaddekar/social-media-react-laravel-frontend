import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useUserRejectFollow = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userRejectFollowReq = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/users/follow/reject/${userId}`,
        {},
        authHeaders
      );
      console.log("user reject follow res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "follow request rejected successfully",
      });
      setData(res?.data);
    } catch (error) {
      console.error("failed to reject follow: ", error);
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message || "Failed to reject follow request",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userRejectFollowReq };
};

export default useUserRejectFollow;
