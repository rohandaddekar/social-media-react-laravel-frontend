/* eslint-disable react/prop-types */

import useAllUsers from "@/api/users/All";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect } from "react";

const Card = ({ user, setSelectedChatUser, setOpen }) => {
  const userClickHandler = (user) => {
    setSelectedChatUser(user);
    setOpen(false);
  };

  return (
    <>
      <li
        className="border rounded-md flex gap-4 p-2 cursor-pointer hover:bg-gray-50"
        onClick={() => userClickHandler(user)}
      >
        <img
          src={user?.profile_image}
          alt={user?.first_name}
          className="w-12 h-12 rounded-full"
        />
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

const AllUsersModal = ({ open, setOpen, setSelectedChatUser }) => {
  const { allUsersReq, data, error, isLoading } = useAllUsers();

  useEffect(() => {
    if (open) {
      allUsersReq();
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
              <Card
                key={i}
                user={user}
                setSelectedChatUser={setSelectedChatUser}
                setOpen={setOpen}
              />
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
