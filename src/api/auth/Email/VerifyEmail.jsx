import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const useVerifyEmail = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const verifyEmailReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/verify-email", payload);
      console.log("verify email res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "email verified successfully",
      });
      setData(res?.data);
      navigate("/sign-in");
    } catch (error) {
      console.error("failed to verify email: ", error);
      toast({
        title: error?.response?.data?.message || "Failed to verify email",
        variant: "destructive",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, verifyEmailReq };
};

export default useVerifyEmail;
