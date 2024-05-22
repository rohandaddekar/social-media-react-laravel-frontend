import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/slices/user";

const useSignUp = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const signUpReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/sign-up", payload);
      console.log("sign up res: ", res?.data?.data);

      toast.success(res?.data?.message || "Signed up successfully");

      const isEmailVerified = res?.data?.data?.user?.email_verified_at;
      if (!isEmailVerified) {
        toast.error("Please verify your email");
        navigate(`/verify-email?email=${res?.data?.data?.user?.email}`);
        return;
      }

      setData(res?.data);
      dispatch(
        signIn({
          id: res?.data?.data?.user?.id,
          first_name: res?.data?.data?.user?.first_name,
          last_name: res?.data?.data?.user?.last_name,
          email: res?.data?.data?.user?.email,
          email_verified_at: res?.data?.data?.user?.emai_verified_atl,
          profile_image: res?.data?.data?.user?.profile_image,
          role: res?.data?.data?.user?.role,
          token: res?.data?.data?.token,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("failed to sign up: ", error);
      toast.error(error?.response?.data?.message || "Failed to sign up");
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, signUpReq };
};

export default useSignUp;
