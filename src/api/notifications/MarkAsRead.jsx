import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useMarkNotificationAsRead = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const markNotificationAsReadReq = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/notifications/mark-as-read/${id}`,
          authHeaders
        );
        // console.log("fetch all notifications res: ", res);
        setData(res?.data?.data);
      } catch (error) {
        // console.log("failed to fetch all notifications: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios, authHeaders]
  );

  return { data, error, isLoading, markNotificationAsReadReq };
};

export default useMarkNotificationAsRead;
