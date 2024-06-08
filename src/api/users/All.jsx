import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useAllUsers = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allUsersReq = useCallback(
    async (query) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/users${query ? query : ""}`, authHeaders);
        setData(res?.data?.data);
      } catch (error) {
        console.log("failed to fetch all users: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios, authHeaders]
  );

  const reFetchAllUsers = useCallback(
    async (query) => {
      await allUsersReq(query);
    },
    [allUsersReq]
  );

  return { data, setData, error, isLoading, allUsersReq, reFetchAllUsers };
};

export default useAllUsers;
