import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePostListner = (handler) => {
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener.private(`post`).listen("PostEvent", (e) => {
      handler(e);
    });

    return () => {
      listener.leave(`post`);
    };
  }, []);
};

export default usePostListner;
