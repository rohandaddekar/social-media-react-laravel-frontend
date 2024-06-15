import { useEffect } from "react";
import { useSelector } from "react-redux";

const useChatUserIsOnline = (setIsOnline, userId) => {
  const onlineUsers = useSelector((state) => state.onlineUsers);

  useEffect(() => {
    setIsOnline(onlineUsers.some((onlineUser) => onlineUser.id === userId));
  }, [setIsOnline, onlineUsers, userId]);
};

export default useChatUserIsOnline;
