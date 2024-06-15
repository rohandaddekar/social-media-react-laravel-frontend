/* eslint-disable react/prop-types */

import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserCard = ({ user, setSelectedChatUser, selectedChatUser }) => {
  const onlineUsers = useSelector((state) => state.onlineUsers);

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    onlineUsers.forEach((onlineUser) => {
      if (onlineUser?.id === user?.user?.id) {
        setIsOnline((prev) => !prev);
      }
    });
  }, [onlineUsers, user]);

  return (
    <>
      <li
        className={`border rounded-md flex gap-2 p-2 cursor-pointer hover:bg-gray-50 ${
          selectedChatUser?.id === user?.user?.id ? "bg-gray-50" : "bg-white"
        }`}
        onClick={() => setSelectedChatUser(user?.user)}
      >
        <div className="relative min-w-12 h-12 rounded-full ">
          <img
            src={user?.user?.profile_image}
            alt={user?.user?.first_name}
            className="h-full w-full rounded-full"
          />
          {isOnline && (
            <span className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full" />
          )}
        </div>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              {user?.user?.first_name} {user?.user?.last_name}
            </h2>
            <p className="text-xs text-gray-500">
              {moment(user?.last_message?.created_at).format("h:mm A")}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              {user?.last_message?.message}
            </p>
            <p className="bg-gray-600 rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">
              3
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default UserCard;
