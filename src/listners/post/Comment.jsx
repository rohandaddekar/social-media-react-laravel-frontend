import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePostCommentListner = (handler) => {
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener.private(`post-comment`).listen("PostCommentEvent", (e) => {
      handler(e);
    });

    return () => {
      listener.leave(`post-comment`);
    };
  }, []);
};

export default usePostCommentListner;
