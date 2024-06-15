/* eslint-disable react/prop-types */

import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import AllChats from "@/pages/Chats/partials/Sidebar/partials/AllChats";

const Sidebar = ({
  setOpenAllUsersModal,
  setSelectedChatUser,
  selectedChatUser,
}) => {
  return (
    <>
      <div className="col-span-3 rounded-l-md overflow-y-auto bg-white">
        <div className="sticky top-0 bg-white p-4 pb-2">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl">Chats</h1>
            <div
              className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer"
              onClick={() => setOpenAllUsersModal(true)}
            >
              <Plus className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="mt-4 border rounded-md flex items-center px-2 py-1">
            <Search className="w-5 h-5 mx-0.5 text-gray-400" />
            <Input
              placeholder="Search"
              className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <AllChats
            setSelectedChatUser={setSelectedChatUser}
            selectedChatUser={selectedChatUser}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
