import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import useAuthHeaders from "@/api/authHeaders";

const useUserFollow = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userFollowReq = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/users/follow/${userId}`, {}, authHeaders);
      console.log("user follow res: ", res?.data?.data);
      toast.success(res?.data?.message || "Follow request sent successfully");
      setData(res?.data);
    } catch (error) {
      console.error("failed to follow user: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to sent follow request"
      );
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userFollowReq };
};

export default useUserFollow;
