import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useDeleteNotification = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const deleteNotificationReq = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const res = await axios.delete(`/notifications/${id}`, authHeaders);
        // console.log("fetch all notifications res: ", res);
        setData(res);
      } catch (error) {
        // console.log("failed to fetch all notifications: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios, authHeaders]
  );

  return { data, error, isLoading, deleteNotificationReq };
};

export default useDeleteNotification;
