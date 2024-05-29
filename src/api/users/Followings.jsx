import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import useAuthHeaders from "@/api/authHeaders";

const useUserFollowings = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userFollowingsReq = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/users/followings/${userId}`, authHeaders);
      console.log("user followings res: ", res?.data?.data);
      toast.success(res?.data?.message || "Successfully fetched followings");
      setData(res?.data);
    } catch (error) {
      console.error("failed to fetch followings: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch followings"
      );
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userFollowingsReq };
};

export default useUserFollowings;
