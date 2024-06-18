import { pvtEventListner } from "@/lib/laravelEcho.config";
import {
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
} from "@/redux/slices/onlineUsers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useChatOnlineStatus = () => {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser?.token) return;

    const listener = pvtEventListner(authUser.token);

    listener
      .join(`chat-online-status`)
      .here((users) => {
        dispatch(setOnlineUsers(users));
      })
      .joining((user) => {
        dispatch(addOnlineUser(user));
      })
      .leaving((user) => {
        dispatch(removeOnlineUser(user));
      })
      .listenForWhisper("typing", (e) => {
        console.log("typing event: ", e);
      })
      .error((error) => {
        console.error("Echo error:", error);
        // Handle error scenarios
      });

    return () => {
      listener.leave(`chat-online-status`);
    };
  }, [authUser?.token, dispatch]);
};

export default useChatOnlineStatus;
