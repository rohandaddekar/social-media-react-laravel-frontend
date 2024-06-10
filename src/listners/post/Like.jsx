import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePostLikeListner = (handler) => {
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener.private(`post-like`).listen("PostLikeEvent", (e) => {
      handler(e);
    });

    return () => {
      listener.leave(`post-like`);
    };
  }, []);
};

export default usePostLikeListner;
