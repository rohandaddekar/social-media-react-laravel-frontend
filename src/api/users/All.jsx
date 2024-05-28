import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useAllUsers = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allUsersReq = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/users`, authHeaders);
      setData(res?.data?.data);
    } catch (error) {
      console.log("failed to fetch all users: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [axios, authHeaders]);

  const reFetchAllUsers = useCallback(async () => {
    await allUsersReq();
  }, [allUsersReq]);

  return { data, setData, error, isLoading, allUsersReq, reFetchAllUsers };
};

export default useAllUsers;
