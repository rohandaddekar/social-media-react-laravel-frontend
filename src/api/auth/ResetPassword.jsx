import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const useResetPassword = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const resetPasswordReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/reset-password", payload);
      console.log("reset password res: ", res?.data?.data);
      toast({
        variant: "destructive",
        title: res?.data?.message || "Password resetd successfully",
      });
      setData(res?.data);
      navigate("/sign-in");
    } catch (error) {
      console.error("failed to reset password: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to reset password",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, resetPasswordReq };
};

export default useResetPassword;
