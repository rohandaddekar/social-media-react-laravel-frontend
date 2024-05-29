import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import useAuthHeaders from "@/api/authHeaders";

const useUserAcceptFollow = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userAcceptFollowReq = async (payload, userId) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/users/accept-follow/${userId}`,
        payload,
        authHeaders
      );
      console.log("user accept follow res: ", res?.data?.data);
      toast.success(
        res?.data?.message || "follow request accepted successfully"
      );
      setData(res?.data);
    } catch (error) {
      console.error("failed to accept follow: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to accept follow request"
      );
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userAcceptFollowReq };
};

export default useUserAcceptFollow;
