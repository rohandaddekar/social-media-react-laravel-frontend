import { PlusCircle } from "lucide-react";
import { useSelector } from "react-redux";
import CreateStoryModal from "@/components/CreateStoryModal";
import { useState } from "react";

const arr = [
  {
    id: 1,
    profile_image: "https://example.com/profile1.jpg",
    username: "user1",
    stories: [
      "https://example.com/story1.jpg",
      "https://example.com/story2.jpg",
    ],
  },
  {
    id: 2,
    profile_image: "https://example.com/profile2.jpg",
    username: "user2",
    stories: [
      "https://example.com/story1.jpg",
      "https://example.com/story2.jpg",
    ],
  },
  {
    id: 3,
    profile_image: "https://example.com/profile3.jpg",
    username: "user3",
    stories: [
      "https://example.com/story1.jpg",
      "https://example.com/story2.jpg",
    ],
  },
];

const Stories = () => {
  const authUser = useSelector((state) => state.authUser);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <>
      <div className="border px-5 py-3 mb-3 rounded-lg">
        <div
          className="flex overflow-x-auto gap-3"
          style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
        >
          <div
            className="relative flex-shrink-0 w-16 cursor-pointer"
            onClick={() => setOpenCreateModal(true)}
          >
            <img
              src={authUser?.profile_image}
              alt="User Image"
              className="w-16 h-16 object-cover rounded-full border-4 border-gray-200"
            />
            <PlusCircle className="absolute right-1 bottom-5 w-5 h-5 text-gray-600 z-10 bg-white rounded-full" />
            <p className="text-xs text-gray-600 mt-2 text-center">Your Story</p>
          </div>
          {arr.map((data, i) => (
            <div key={i} className="flex-shrink-0 w-16 cursor-pointer">
              <img
                src={authUser?.profile_image}
                alt="User Image"
                className="w-16 h-16 object-cover rounded-full border-4 border-gray-400"
              />
              <p className="text-xs text-gray-600 mt-2 text-center">
                {data?.username}
              </p>
            </div>
          ))}
        </div>
      </div>

      <CreateStoryModal open={openCreateModal} setOpen={setOpenCreateModal} />
    </>
  );
};

export default Stories;
