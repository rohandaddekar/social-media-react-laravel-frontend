import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";

const useAllChatMessages = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const allChatMessagesReq = useCallback(
    async (receiverId) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `/chats/messages/${receiverId}`,
          authHeaders
        );
        // console.log("fetch all chat messages res: ", res);
        setData(res?.data?.data);
      } catch (error) {
        console.log("failed to fetch all chat messages: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios, authHeaders]
  );

  const reFetch = useCallback(
    async (receiverId) => {
      await allChatMessagesReq(receiverId);
    },
    [allChatMessagesReq]
  );

  return { data, setData, error, isLoading, allChatMessagesReq, reFetch };
};

export default useAllChatMessages;
