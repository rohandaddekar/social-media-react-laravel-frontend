import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useMeUser = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const meUserReq = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/users/me`, authHeaders);
      setData(res?.data?.data);
    } catch (error) {
      console.log("failed to fetch me user: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [axios, authHeaders]);

  const reFetchAllUsers = useCallback(async () => {
    await meUserReq();
  }, [meUserReq]);

  return { data, setData, error, isLoading, meUserReq, reFetchAllUsers };
};

export default useMeUser;
