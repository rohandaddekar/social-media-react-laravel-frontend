/* eslint-disable react/prop-types */

import UserDetails from "@/pages/Chats/partials/Messages/partials/UserDetails";
import SelectedUserMessages from "@/pages/Chats/partials/Messages/partials/SelectedUserMessages";
import SendMessage from "@/pages/Chats/partials/Messages/partials/SendMessage";
import { useSelector } from "react-redux";

const Messages = () => {
  const selectedChatUser = useSelector((state) => state.chatUser);

  if (!selectedChatUser) {
    return (
      <>
        <div className="col-span-9 flex items-center justify-center bg-gray-100">
          <p className="text-2xl font-semibold max-w-sm text-center">
            Please select a user to start messaging
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="col-span-9 rounded-r-md flex overflow-y-hidden flex-col justify-between">
        <UserDetails selectedChatUser={selectedChatUser} />

        <SelectedUserMessages selectedChatUserId={selectedChatUser?.id} />

        <SendMessage selectedChatUserId={selectedChatUser?.id} />
      </div>
    </>
  );
};

export default Messages;
