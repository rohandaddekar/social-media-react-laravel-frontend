/* eslint-disable react/prop-types */

import useAllUsers from "@/api/users/All";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useChatUserIsOnline from "@/listners/chat/ChatUserIsOnline";
import { setChatUser } from "@/redux/slices/chatUser";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Card = ({ user, setOpen }) => {
  const dispatch = useDispatch();
  const [isOnline, setIsOnline] = useState(false);

  useChatUserIsOnline(setIsOnline, user?.id);

  const userClickHandler = (user) => {
    dispatch(
      setChatUser({
        id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        profile_image: user?.profile_image,
        email: user?.email,
        about_me: user?.about_me,
      })
    );
    setOpen(false);
  };

  return (
    <>
      <li
        className="border rounded-md flex gap-4 p-2 cursor-pointer hover:bg-gray-50"
        onClick={() => userClickHandler(user)}
      >
        <div className="relative min-w-12 h-12 rounded-full ">
          <img
            src={user?.profile_image}
            alt={user?.first_name}
            className="h-full w-full rounded-full"
          />
          {isOnline && (
            <span className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full" />
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              {user?.first_name} {user?.last_name}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{user?.about_me}</p>
          </div>
        </div>
      </li>
    </>
  );
};

const AllUsersModal = ({ open, setOpen }) => {
  const { allUsersReq, data, error, isLoading } = useAllUsers();

  useEffect(() => {
    if (open) {
      allUsersReq("?chatUsers=true");
    }
  }, [open]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>failed to load</p>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <h1 className="font-semibold text-lg">All Users</h1>

        {data?.length > 0 ? (
          <ul className="space-y-3">
            {data?.map((user, i) => (
              <Card key={i} user={user} setOpen={setOpen} />
            ))}
          </ul>
        ) : (
          <p>No Users</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AllUsersModal;
