import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import useAuthHeaders from "@/api/authHeaders";

const useUserFollowers = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userFollowersReq = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/users/followers/${userId}`, authHeaders);
      console.log("user followers res: ", res?.data?.data);
      toast.success(res?.data?.message || "Successfully fetched followers");
      setData(res?.data);
    } catch (error) {
      console.error("failed to fetch followers: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to fetch followers"
      );
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userFollowersReq };
};

export default useUserFollowers;
