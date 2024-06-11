import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const useUserChangePassword = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userChangePasswordReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/users/change-password`,
        payload,
        authHeaders
      );
      setData(res?.data?.data);
      navigate("/");
      toast({
        title: res?.data?.message || "Password changed successfully",
      });
    } catch (error) {
      console.log("failed to user password change: ", error);
      setError(error?.response?.data);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to change password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    setData,
    error,
    isLoading,
    userChangePasswordReq,
  };
};

export default useUserChangePassword;
