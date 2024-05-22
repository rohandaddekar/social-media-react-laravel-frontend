import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useAxios from "@/api/axiosInstance";
import { signOut } from "@/redux/slices/user";
import { useNavigate } from "react-router-dom";
import useAuthHeaders from "@/api/authHeaders";

const useSignOut = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const signOutReq = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/auth/sign-out", authHeaders);
      toast.success(res?.data?.message || "Signed out successfully");
      console.log("signed out res: ", res?.data?.data);
      setData(res?.data);
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.error("failed to sign out: ", error);
      toast.error(error?.response?.data?.message || "Failed to sign out");
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, signOutReq };
};

export default useSignOut;
