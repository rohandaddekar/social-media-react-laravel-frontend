import Sidebar from "@/pages/Chats/partials/Sidebar";
import Messages from "@/pages/Chats/partials/Messages";
import { useEffect, useState } from "react";
import AllUsersModal from "@/components/Chats/AllUsersModal";
import { removeChatUser } from "@/redux/slices/chatUser";
import { useDispatch } from "react-redux";

const Chats = () => {
  const dispatch = useDispatch();

  const [openAllUsersModal, setOpenAllUsersModal] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(removeChatUser());
    };
  }, [dispatch]);

  return (
    <>
      <main className="container py-8 h-[calc(100vh-118px)] overflow-y-hidden">
        <div className="border rounded-md h-full grid grid-cols-12">
          <Sidebar setOpenAllUsersModal={setOpenAllUsersModal} />
          <Messages />
        </div>
      </main>

      <AllUsersModal open={openAllUsersModal} setOpen={setOpenAllUsersModal} />
    </>
  );
};

export default Chats;
