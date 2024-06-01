import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useUserFollowings = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userFollowingsReq = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/users/followings/${userId}`, authHeaders);
      console.log("user followings res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "Successfully fetched followings",
      });
      setData(res?.data);
    } catch (error) {
      console.error("failed to fetch followings: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to fetch followings",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userFollowingsReq };
};

export default useUserFollowings;
