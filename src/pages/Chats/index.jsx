import Sidebar from "@/pages/Chats/partials/Sidebar";
import Messages from "@/pages/Chats/partials/Messages";

const Chats = () => {
  return (
    <>
      <main className="container py-8 h-[calc(100vh-118px)]">
        <div className="border rounded-md h-full grid grid-cols-12">
          <Sidebar />
          <Messages />
        </div>
      </main>
    </>
  );
};

export default Chats;
