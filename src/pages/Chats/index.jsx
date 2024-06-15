import Sidebar from "@/pages/Chats/partials/Sidebar";
import Messages from "@/pages/Chats/partials/Messages";
import { useState } from "react";
import AllUsersModal from "@/components/Chats/AllUsersModal";

const Chats = () => {
  const [openAllUsersModal, setOpenAllUsersModal] = useState(false);
  const [selectedChatUser, setSelectedChatUser] = useState(null);

  return (
    <>
      <main className="container py-8 h-[calc(100vh-118px)] overflow-y-hidden">
        <div className="border rounded-md h-full grid grid-cols-12">
          <Sidebar
            setOpenAllUsersModal={setOpenAllUsersModal}
            setSelectedChatUser={setSelectedChatUser}
            selectedChatUser={selectedChatUser}
          />
          <Messages selectedChatUser={selectedChatUser} />
        </div>
      </main>

      <AllUsersModal
        open={openAllUsersModal}
        setOpen={setOpenAllUsersModal}
        setSelectedChatUser={setSelectedChatUser}
      />
    </>
  );
};

export default Chats;
