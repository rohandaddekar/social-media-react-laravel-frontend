import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import { toast } from "@/components/ui/use-toast";

const useResendEmailToken = () => {
  const axios = useAxios();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const resendEmailTokenReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/verify-email/resend", payload);
      console.log("resend email token res: ", res?.data);
      toast({
        title: res?.data?.message || "email verified successfully",
      });
      setData(res?.data);
    } catch (error) {
      console.error("failed to resend email token: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to resend email token",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, resendEmailTokenReq };
};

export default useResendEmailToken;
