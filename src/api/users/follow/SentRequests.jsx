import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useUserSentRequests = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userSentRequestsReq = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/users/requests/sent`, authHeaders);
      console.log("user sent requests res: ", res?.data?.data);
      setData(res?.data?.data);
    } catch (error) {
      console.error("failed to fetch sent requests: ", error);
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message || "Failed to fetch sent requests",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, setData, error, isLoading, userSentRequestsReq };
};

export default useUserSentRequests;
