import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const usePostCommentListner = (handler, data) => {
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener.private(`post-comment`).listen("PostCommentEvent", (e) => {
      console.log("post comment event: ", e);
      console.log("post comment event data: ", data);
      handler(e);
    });

    return () => {
      listener.leave(`post-comment`);
    };
  }, []);
};

export default usePostCommentListner;
