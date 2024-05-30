import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import toast from "react-hot-toast";
import useAuthHeaders from "@/api/authHeaders";

const useUserRemoveFollow = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userRemoveFollowReq = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/users/follow/remove/${userId}`,
        {},
        authHeaders
      );
      console.log("user remove follow res: ", res?.data?.data);
      toast.success(
        res?.data?.message || "follow request removeed successfully"
      );
      setData(res?.data);
    } catch (error) {
      console.error("failed to remove follow: ", error);
      toast.error(
        error?.response?.data?.message || "Failed to remove follow request"
      );
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, userRemoveFollowReq };
};

export default useUserRemoveFollow;
