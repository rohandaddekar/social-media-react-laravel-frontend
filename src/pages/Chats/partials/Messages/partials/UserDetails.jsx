/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserDetails = ({ selectedChatUser }) => {
  const onlineUsers = useSelector((state) => state.onlineUsers);

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    onlineUsers.forEach((onlineUser) => {
      if (onlineUser?.id === selectedChatUser?.id) {
        setIsOnline((prev) => !prev);
      }
    });
  }, [onlineUsers, selectedChatUser]);

  return (
    <>
      <div className="border rounded-md flex gap-4 bg-gray-100 p-2 m-2 mb-0">
        <img
          src={selectedChatUser?.profile_image}
          alt={selectedChatUser?.first_name}
          className="w-12 h-12 rounded-full"
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              {selectedChatUser?.first_name} {selectedChatUser?.last_name}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-sm font-semibold ${
                isOnline ? "text-green-500" : "text-gray-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
