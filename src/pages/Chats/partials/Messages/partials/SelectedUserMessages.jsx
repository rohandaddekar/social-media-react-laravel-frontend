/* eslint-disable react/prop-types */

import useAllChatMessages from "@/api/chats/AllChatMessages";
import useChatMessageListner from "@/listners/chat/ChatMessage";
import { CheckCheck, Ellipsis } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ChatEditMessageModal from "@/components/Chats/EditMessageModal";
import AlertModal from "@/components/AlertModal";
import useDeleteChatMessage from "@/api/chats/DeleteChatMessage";

const SelectedUserMessages = ({ selectedChatUserId }) => {
  const endMsgRef = useRef(null);
  const authUser = useSelector((state) => state.authUser);
  const {
    allChatMessagesReq,
    data: dataAllChatMessages,
    setData: setDataAllChatMessages,
    error: errorAllChatMessages,
    isLoading: isLoadingAllChatMessages,
  } = useAllChatMessages();
  const { isLoading: isLoadingDeleteChatMessage, deleteChatMessageReq } =
    useDeleteChatMessage();

  const [editMessage, setEditMessage] = useState(null);
  const [deleteMessageId, setDeleteMessageId] = useState(null);
  const [openEditMessageModal, setOpenEditMessageModal] = useState(false);
  const [openDeleteMessageModal, setOpenDeleteMessageModal] = useState(false);

  useEffect(() => {
    allChatMessagesReq(selectedChatUserId);
  }, [selectedChatUserId]);

  useEffect(() => {
    if (endMsgRef.current) {
      endMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [dataAllChatMessages]);

  const chatMessageListnerHandler = (e) => {
    console.log("chatMessageListnerHandler selected user: ", e);

    if (e?.type === "created") {
      setDataAllChatMessages((prev) => [...prev, e?.message]);
    }

    if (e?.type === "updated") {
      setDataAllChatMessages((prev) => {
        const updatedData = prev.map((message) => {
          if (message.id === e.message.id) {
            return e.message;
          }
          return message;
        });

        return updatedData;
      });
    }

    if (e?.type === "deleted") {
      setDataAllChatMessages((prev) =>
        prev.filter((message) => message.id !== e.message.id)
      );
    }
  };
  useChatMessageListner(chatMessageListnerHandler);

  if (isLoadingAllChatMessages) {
    return (
      <div className="border rounded-md bg-gray-50 flex-1 m-2 overflow-y-auto">
        <p className="flex items-center justify-center h-full text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  if (errorAllChatMessages) {
    return (
      <div className="border rounded-md bg-gray-50 flex-1 m-2 overflow-y-auto">
        <p className="flex items-center justify-center h-full text-gray-500">
          failed to load
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-md bg-gray-50 flex-1 m-2 overflow-y-auto">
        {dataAllChatMessages?.length > 0 ? (
          <ul className="h-full p-2 space-y-2">
            {dataAllChatMessages?.map((message, i) => (
              <li
                key={i}
                className={
                  message?.sender_id === authUser?.id
                    ? "text-right"
                    : "text-left"
                }
              >
                <div
                  className={`relative border px-4 py-2 max-w-sm inline-block bg-white rounded-[15px] ${
                    message?.sender_id === authUser?.id
                      ? "rounded-br-none"
                      : "rounded-tl-none"
                  }`}
                >
                  {message?.sender_id === authUser?.id && (
                    <div className="absolute top-0 right-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis className="w-4 h-4 text-gray-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setOpenEditMessageModal(true);
                              setEditMessage(message);
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              setOpenDeleteMessageModal(true);
                              setDeleteMessageId(message?.id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  <p
                    className={`text-left text-sm ${
                      message?.sender_id === authUser?.id && "mt-2"
                    }`}
                  >
                    {message?.message}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <p className="text-xs text-gray-400">
                      {message?.updated_at > message?.created_at && "(edited)"}
                    </p>

                    <p className="flex items-center gap-1 text-xs text-right text-gray-400">
                      {moment(message?.created_at).format("h:mm A")}
                      <CheckCheck className="w-4 h-4 text-green-500" />
                    </p>
                  </div>
                </div>
              </li>
            ))}

            <div ref={endMsgRef} className="py-1" />
          </ul>
        ) : (
          <p className="flex items-center justify-center h-full text-gray-500">
            No messages
          </p>
        )}
      </div>

      <ChatEditMessageModal
        open={openEditMessageModal}
        setOpen={setOpenEditMessageModal}
        message={editMessage?.message}
        selectedMessageId={editMessage?.id}
      />

      <AlertModal
        open={openDeleteMessageModal}
        setOpen={setOpenDeleteMessageModal}
        isLoading={isLoadingDeleteChatMessage}
        deleteHandler={() => deleteChatMessageReq(deleteMessageId)}
      />
    </>
  );
};

export default SelectedUserMessages;

{
  /* <div className="border rounded-md bg-gray-50 flex-1 m-2 overflow-y-auto">
  <ul className="h-full p-2 space-y-2">
    <li className="text-left">
      <div className="border p-4 max-w-sm inline-block bg-white rounded-[20px] rounded-tl-none">
        <p className="text-left text-sm">
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
          dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet.
        </p>
        <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
          9:45 PM
          <CheckCheck className="w-4 h-4 text-green-500" />
        </p>
      </div>
    </li>
    <li className="text-left">
      <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
        <img
          src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
          alt=""
          className="w-60 h-52 object-cover rounded-md"
        />
        <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
          9:45 PM
          <CheckCheck className="w-4 h-4 text-green-500" />
        </p>
      </div>
    </li>
    <li className="text-left">
      <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
        <video controls className="w-60 h-52 object-cover rounded-md">
          <source src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.mp4" />
        </video>
        <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
          9:45 PM
          <CheckCheck className="w-4 h-4 text-green-500" />
        </p>
      </div>
    </li>
    <li className="text-left">
      <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
        <div className="w-full flex items-center gap-2">
          <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center p-2">
            <File className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm">file-name.pdf</p>
        </div>
        <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
          9:45 PM
          <CheckCheck className="w-4 h-4 text-green-500" />
        </p>
      </div>
    </li>

    <li className="text-right">
      <div className="border p-4 max-w-sm inline-block bg-white rounded-[20px] rounded-br-none">
        <p className="text-left text-sm">
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum
          dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet.
        </p>
        <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
          9:45 PM
          <CheckCheck className="w-4 h-4 text-green-500" />
        </p>
      </div>
    </li>
    <li className="text-right">
      <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
        <img
          src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.jpg"
          alt=""
          className="w-60 h-52 object-cover rounded-md"
        />
        <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
          9:45 PM
          <CheckCheck className="w-4 h-4 text-green-500" />
        </p>
      </div>
    </li>
    <li className="text-right">
      <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
        <video controls className="w-60 h-52 object-cover rounded-md">
          <source src="https://d38b044pevnwc9.cloudfront.net/cutout-nuxt/enhancer/2.mp4" />
        </video>
        <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
          9:45 PM
          <CheckCheck className="w-4 h-4 text-green-500" />
        </p>
      </div>
    </li>
    <li className="text-right">
      <div className="border p-2 max-w-sm inline-block bg-white rounded-lg">
        <div className="w-full flex items-center gap-2">
          <div className="bg-gray-500 rounded-full w-8 h-8 flex items-center justify-center p-2">
            <File className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm">file-name.pdf</p>
        </div>
        <p className="flex items-center justify-end gap-1 text-xs text-right mt-1 text-gray-400">
          9:45 PM
          <CheckCheck className="w-4 h-4 text-green-500" />
        </p>
      </div>
    </li>
  </ul>
</div>; */
}
