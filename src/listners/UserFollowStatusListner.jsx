import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useUserFollowStatusListner = (handler) => {
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener
      .private(`user-follow-status.${authUser.id}`)
      .listen("UserFollowStatusEvent", (e) => {
        console.log("user follow status event: ", e);

        handler(e);
      });

    return () => {
      listener.leave(`user-follow-status.${authUser.id}`);
    };
  }, []);
};

export default useUserFollowStatusListner;
