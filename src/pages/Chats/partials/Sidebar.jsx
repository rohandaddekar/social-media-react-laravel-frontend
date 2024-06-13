import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import UserCard from "@/pages/Chats/partials/UserCard";

const Sidebar = () => {
  return (
    <>
      <div className="col-span-3 rounded-l-md overflow-y-auto bg-white">
        <div className="sticky top-0 bg-white p-4 pb-2">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-3xl">Chats</h1>
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
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
        </div>

        <ul className="mt-4 p-4 pt-0 space-y-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <UserCard key={i} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
