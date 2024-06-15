import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useUpdateChatMessage = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const updateChatMessageReq = async (payload, messageId) => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        `/chats/messages/${messageId}`,
        payload,
        authHeaders
      );
      // console.log("update chat message res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "updated chat message successfully",
      });
      setData(res?.data?.data);
    } catch (error) {
      console.error("failed to update chat message: ", error);
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message || "Failed to update chat message",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, setError, isLoading, updateChatMessageReq };
};

export default useUpdateChatMessage;
