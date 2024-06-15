import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useSendChatMessage = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const sendChatMessageReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/chats/messages", payload, authHeaders);
      // console.log("send chat message res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "send chat message successfully",
      });
      setData(res?.data);
    } catch (error) {
      console.error("failed to send chat message: ", error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to send chat message",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, setError, isLoading, sendChatMessageReq };
};

export default useSendChatMessage;
