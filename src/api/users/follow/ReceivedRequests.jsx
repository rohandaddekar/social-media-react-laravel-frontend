import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useUserReceivedRequests = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userReceivedRequestsReq = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/users/requests/received`, authHeaders);
      console.log("user received requests res: ", res?.data?.data);
      setData(res?.data?.data);
    } catch (error) {
      console.error("failed to fetch received requests: ", error);
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message || "Failed to fetch received requests",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, setData, error, isLoading, userReceivedRequestsReq };
};

export default useUserReceivedRequests;
