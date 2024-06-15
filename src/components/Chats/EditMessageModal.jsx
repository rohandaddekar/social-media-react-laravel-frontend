/* eslint-disable react/prop-types */

import useUpdateChatMessage from "@/api/chats/UpdateChatMessage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ChatEditMessageModal = ({
  open,
  setOpen,
  selectedMessageId,
  message,
}) => {
  const {
    data: dataUpdateChatMessage,
    isLoading: isLoadingUpdateChatMessage,
    updateChatMessageReq,
  } = useUpdateChatMessage();

  const [editMessage, setEditMessage] = useState(message || "");

  useEffect(() => {
    if (message) {
      setEditMessage(message);
    }
  }, [message]);

  const updateHandler = (e) => {
    e.preventDefault();

    updateChatMessageReq({ message: editMessage }, selectedMessageId);
  };

  useEffect(() => {
    if (dataUpdateChatMessage) {
      setOpen(false);
    }
  }, [dataUpdateChatMessage, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <h1 className="font-semibold text-lg">Update Message</h1>

        <form onSubmit={updateHandler}>
          <Input
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
          />

          <Button className="mt-4 w-full" disabled={isLoadingUpdateChatMessage}>
            Update
            {isLoadingUpdateChatMessage && (
              <Loader2 className="w-4 h-4 animate-spin ml-2" />
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatEditMessageModal;
