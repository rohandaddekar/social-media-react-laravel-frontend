import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useResendEmailToken = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const resendEmailTokenReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/verify-email/resend", payload);
      console.log("resend email token res: ", res?.data);
      toast.success(res?.data?.message || "email verified successfully");
      setData(res?.data);
      // navigate("/");
    } catch (error) {
      console.error("failed to resend email token: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to resend email token"
      );
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, resendEmailTokenReq };
};

export default useResendEmailToken;
