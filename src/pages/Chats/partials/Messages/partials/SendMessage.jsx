/* eslint-disable react/prop-types */

import useSendChatMessage from "@/api/chats/SendMessage";
import { Input } from "@/components/ui/input";
import { Loader2, Paperclip, Send } from "lucide-react";
import { useEffect, useState } from "react";

const SendMessage = ({ selectedChatUserId }) => {
  const {
    isLoading: isLoadingSendMessage,
    data: dataSendChatMessage,
    sendChatMessageReq,
  } = useSendChatMessage();

  const [message, setMessage] = useState("");

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = () => {
    sendChatMessageReq({ message, receiver_id: selectedChatUserId });
  };

  useEffect(() => {
    if (dataSendChatMessage) {
      setMessage("");
    }
  }, [dataSendChatMessage]);

  return (
    <>
      <div className="border rounded-md flex items-center gap-2 bg-gray-100 p-2 m-2 mt-0">
        <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
          <Paperclip className="w-4 h-4 text-white" />
        </div>
        <Input
          placeholder="Type a message"
          className="flex-1 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={message}
          onChange={onChangeHandler}
        />
        <div
          className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={sendMessageHandler}
        >
          {isLoadingSendMessage ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-white" />
          )}
        </div>
      </div>
    </>
  );
};

export default SendMessage;
