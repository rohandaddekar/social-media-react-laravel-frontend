import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useUserFollowStatusListner = (setData) => {
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener
      .private(`user-follow-status.${authUser.id}`)
      .listen("UserFollowStatusEvent", (e) => {
        console.log("user follow status event: ", e);

        const { sender_follow_status, receiver_follow_status } = e.followStatus;
        const followReq = e.followReq;

        if (followReq.sender_id === authUser.id) {
          setData((prev) => ({
            ...prev,
            follow_status: sender_follow_status,
          }));
        } else if (followReq.receiver_id === authUser.id) {
          setData((prev) => ({
            ...prev,
            follow_status: receiver_follow_status,
          }));
        }
      });

    return () => {
      listener.leave(`user-follow-status.${authUser.id}`);
    };
  }, []);
};

export default useUserFollowStatusListner;
