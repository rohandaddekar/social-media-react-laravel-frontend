import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";

const useForgotPassword = () => {
  const axios = useAxios();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const forgotPasswordReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/forgot-password", payload);
      console.log("forgot password res: ", res?.data?.data);
      toast.success(res?.data?.message || "Reset link send successfully");
      setData(res?.data);
    } catch (error) {
      console.error("failed to forgot password: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to send reset link"
      );
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, forgotPasswordReq };
};

export default useForgotPassword;
