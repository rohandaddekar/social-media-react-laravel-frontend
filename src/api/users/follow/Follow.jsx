import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useUserFollow = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userFollowReq = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/users/follow/send/${userId}`,
        {},
        authHeaders
      );
      console.log("user follow res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "Follow request sent successfully",
      });
      setData(res?.data);
    } catch (error) {
      console.error("failed to follow user: ", error);
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message || "Failed to sent follow request",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userFollowReq };
};

export default useUserFollow;
