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
        // console.log("Initial users:", users);
        dispatch(setOnlineUsers(users));
      })
      .joining((user) => {
        // console.log("User joining channel:", user);
        dispatch(addOnlineUser(user));
      })
      .leaving((user) => {
        // console.log("User leaving channel:", user);
        dispatch(removeOnlineUser(user));
      })
      .listenForWhisper("typing", (e) => {
        console.log("Typing whisper received:", e);
        // Handle whispers (custom events within channel)
      })
      .listen(".ChatOnlineStatusEvent", (e) => {
        console.log("Received event:", e);
        // handler(e);
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
