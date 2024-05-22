import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      toast.success(res?.data?.message || "email verified successfully");
      setData(res?.data);
      navigate("/sign-in");
    } catch (error) {
      console.error("failed to verify email: ", error);
      toast.error(error?.response?.data?.message || "Failed to verify email");
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, verifyEmailReq };
};

export default useVerifyEmail;
