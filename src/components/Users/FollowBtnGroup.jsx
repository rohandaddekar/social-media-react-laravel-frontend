/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useUserAcceptFollow from "@/api/users/follow/AcceptFollow";
import useUserFollow from "@/api/users/follow/Follow";
import useUserRejectFollow from "@/api/users/follow/RejectFollow";
import useUserRemoveFollow from "@/api/users/follow/RemoveFollow";
import useUserUnFollow from "@/api/users/follow/UnFollow";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setChatUser } from "@/redux/slices/chatUser";

const MessageBtn = ({ user, btnSize }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clickHandler = () => {
    navigate("/chats");
    dispatch(
      setChatUser({
        id: user?.id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        profile_image: user?.profile_image,
        email: user?.email,
        about_me: user?.about_me,
      })
    );
  };

  return (
    <>
      <Button
        size={btnSize}
        variant="outline"
        className="w-full"
        onClick={clickHandler}
      >
        Message
      </Button>
    </>
  );
};

const FollowBtnGroup = ({ user, follow_status, btnSize = "default" }) => {
  const authUser = useSelector((state) => state.authUser);

  const { isLoading: isLoadingUserFollow, userFollowReq } = useUserFollow();
  const { isLoading: isLoadingUserAcceptFollow, userAcceptFollowReq } =
    useUserAcceptFollow();
  const { isLoading: isLoadingUserRejectFollow, userRejectFollowReq } =
    useUserRejectFollow();
  const { isLoading: isLoadingUserRemoveFollow, userRemoveFollowReq } =
    useUserRemoveFollow();
  const { isLoading: isLoadingUserUnFollow, userUnFollowReq } =
    useUserUnFollow();

  const followHandler = (id) => userFollowReq(id);
  const unFollowHandler = (id) => userUnFollowReq(id);
  const acceptFollowHandler = (id) => userAcceptFollowReq(id);
  const rejectFollowHandler = (id) => userRejectFollowReq(id);
  const removeFollowHandler = (id) => userRemoveFollowReq(id);

  return (
    <>
      {authUser?.id !== +user?.id && follow_status === "none" && (
        <Button
          size={btnSize}
          type="button"
          className="w-full"
          onClick={() => followHandler(user?.id)}
        >
          Follow
          {isLoadingUserFollow && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      )}

      {authUser?.id !== +user?.id &&
        (follow_status === "pending_sent" || follow_status === "follower") && (
          <div className="flex gap-2">
            {follow_status === "follower" && (
              <MessageBtn user={user} btnSize={btnSize} />
            )}
            <Button
              size={btnSize}
              type="button"
              className="w-full"
              onClick={() => unFollowHandler(user?.id)}
            >
              {follow_status === "pending_sent" ? "Cancel Request" : "Unfollow"}
              {isLoadingUserUnFollow && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        )}

      {authUser?.id !== +user?.id && follow_status === "following" && (
        <div className="flex gap-2">
          <MessageBtn user={user} btnSize={btnSize} />
          <Button
            size={btnSize}
            type="button"
            className="w-full"
            onClick={() => removeFollowHandler(user?.id)}
          >
            Remove
            {isLoadingUserRemoveFollow && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      )}

      {authUser?.id !== +user?.id && follow_status === "pending_received" && (
        <div className="flex gap-2">
          <Button
            size={btnSize}
            type="button"
            className="w-full"
            onClick={() => acceptFollowHandler(user?.id)}
          >
            Accept
            {isLoadingUserAcceptFollow && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
          <Button
            size={btnSize}
            type="button"
            className="w-full"
            onClick={() => rejectFollowHandler(user?.id)}
            variant="outline"
          >
            Reject
            {isLoadingUserRejectFollow && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default FollowBtnGroup;
