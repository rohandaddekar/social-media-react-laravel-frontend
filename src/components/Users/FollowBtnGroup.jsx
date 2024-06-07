/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import useUserAcceptFollow from "@/api/users/AcceptFollow";
import useUserFollow from "@/api/users/Follow";
import useUserRejectFollow from "@/api/users/RejectFollow";
import useUserRemoveFollow from "@/api/users/RemoveFollow";
import useUserUnFollow from "@/api/users/UnFollow";
import { useSelector } from "react-redux";

const FollowBtnGroup = ({ userId, follow_status }) => {
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
      {authUser?.id !== +userId && follow_status === "none" && (
        <Button
          type="button"
          className="w-full"
          onClick={() => followHandler(userId)}
        >
          Follow
          {isLoadingUserFollow && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          )}
        </Button>
      )}

      {authUser?.id !== +userId &&
        (follow_status === "pending_sent" || follow_status === "follower") && (
          <div className="flex gap-2">
            {follow_status === "follower" && (
              <Button variant="outline">Message</Button>
            )}
            <Button
              type="button"
              className="w-full"
              onClick={() => unFollowHandler(userId)}
            >
              {follow_status === "pending_sent" ? "Cancel Request" : "Unfollow"}
              {isLoadingUserUnFollow && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        )}

      {authUser?.id !== +userId && follow_status === "following" && (
        <div className="flex gap-2">
          <Button variant="outline">Message</Button>
          <Button
            type="button"
            className="w-full"
            onClick={() => removeFollowHandler(userId)}
          >
            Remove
            {isLoadingUserRemoveFollow && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      )}

      {authUser?.id !== +userId && follow_status === "pending_received" && (
        <div className="flex gap-2">
          <Button
            type="button"
            className="w-full"
            onClick={() => acceptFollowHandler(userId)}
          >
            Accept
            {isLoadingUserAcceptFollow && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
          <Button
            type="button"
            className="w-full"
            onClick={() => rejectFollowHandler(userId)}
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
