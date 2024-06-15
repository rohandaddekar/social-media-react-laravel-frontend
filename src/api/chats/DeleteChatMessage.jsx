import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";

const useDeleteChatMessage = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const deleteChatMessageReq = async (messageId) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `/chats/messages/${messageId}`,
        authHeaders
      );
      // console.log("delete chat message res: ", res?.data?.data);
      toast({
        title: res?.data?.message || "deleted chat message successfully",
      });
      setData(res?.data?.data);
    } catch (error) {
      console.error("failed to delete chat message: ", error);
      toast({
        variant: "destructive",
        title:
          error?.response?.data?.message || "Failed to delete chat message",
      });
      setError(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, setError, isLoading, deleteChatMessageReq };
};

export default useDeleteChatMessage;
