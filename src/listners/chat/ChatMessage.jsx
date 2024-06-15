import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useChatMessageListner = (handler) => {
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener.private(`chat-message.${authUser.id}`).listen("ChatEvent", (e) => {
      handler(e);
    });

    return () => {
      listener.leave(`chat-message.${authUser.id}`);
    };
  }, [authUser?.token, authUser?.id, handler]);
};

export default useChatMessageListner;
