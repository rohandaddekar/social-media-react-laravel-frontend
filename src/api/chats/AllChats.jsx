import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useAllChats = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allChatsReq = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/chats/users`, authHeaders);
      // console.log("fetch all chats res: ", res);
      setData(res?.data?.data);
    } catch (error) {
      console.log("failed to fetch all chats: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [axios, authHeaders]);

  const reFetch = useCallback(async () => {
    await allChatsReq();
  }, [allChatsReq]);

  return { data, setData, error, isLoading, allChatsReq, reFetch };
};

export default useAllChats;
