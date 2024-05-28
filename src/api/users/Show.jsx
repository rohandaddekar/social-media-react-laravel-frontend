import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useShowUser = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const showUserReq = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/users/${id}`, authHeaders);
        setData(res?.data?.data);
      } catch (error) {
        console.log("failed to fetch user details: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios, authHeaders]
  );

  const reFetchShowUser = useCallback(
    async (id) => {
      await showUserReq(id);
    },
    [showUserReq]
  );

  return { data, setData, error, isLoading, showUserReq, reFetchShowUser };
};

export default useShowUser;
