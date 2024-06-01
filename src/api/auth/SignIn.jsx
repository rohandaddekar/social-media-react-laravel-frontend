import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/slices/user";
import { toast } from "@/components/ui/use-toast";

const useSignIn = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const signInReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/auth/sign-in", payload);
      console.log("signed in res: ", res?.data?.data);

      const isEmailVerified = res?.data?.data?.user?.email_verified_at;
      if (!isEmailVerified) {
        toast({
          variant: "destructive",
          title: "Please verify your email",
        });
        navigate(`/verify-email?email=${res?.data?.data?.user?.email}`);
        return;
      }

      toast({
        title: res?.data?.message || "Signed in successfully",
      });
      setData(res?.data);
      dispatch(
        signIn({
          id: res?.data?.data?.user?.id,
          first_name: res?.data?.data?.user?.first_name,
          last_name: res?.data?.data?.user?.last_name,
          email: res?.data?.data?.user?.email,
          email_verified_at: res?.data?.data?.user?.emai_verified_atl,
          profile_image: res?.data?.data?.user?.profile_image,
          profile_banner_image: res?.data?.data?.user?.profile_banner_image,
          about_me: res?.data?.data?.user?.about_me,
          role: res?.data?.data?.user?.role,
          token: res?.data?.data?.token,
        })
      );
      navigate("/");
    } catch (error) {
      console.error("failed to sign in: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to sign in",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, signInReq };
};

export default useSignIn;
