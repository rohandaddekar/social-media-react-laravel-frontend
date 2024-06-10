import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useNotificationListner = (handler) => {
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener
      .private(`notification.${authUser.id}`)
      .listen("NotificationEvent", (e) => {
        handler(e);
      });

    return () => {
      listener.leave(`user-follow-status.${authUser.id}`);
    };
  }, []);
};

export default useNotificationListner;
