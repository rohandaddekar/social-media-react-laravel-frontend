import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useAllNotifications = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allNotificationsReq = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/notifications`, authHeaders);
      console.log("fetch all notifications res: ", res);
      setData(res?.data?.data);
    } catch (error) {
      console.log("failed to fetch all notifications: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [axios, authHeaders]);

  const reFetch = useCallback(async () => {
    await allNotificationsReq();
  }, [allNotificationsReq]);

  return { data, error, isLoading, allNotificationsReq, reFetch };
};

export default useAllNotifications;
