/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useUserFollow from "@/api/users/Follow";
import useUserUnFollow from "@/api/users/UnFollow";
import { Loader2 } from "lucide-react";
import useUserAcceptFollow from "@/api/users/AcceptFollow";
import useUserRejectFollow from "@/api/users/RejectFollow";
import { useEffect } from "react";
import useUserRemoveFollow from "@/api/users/RemoveFollow";

const UserCard = ({ user, reFetch }) => {
  const {
    isLoading: isLoadingUserFollow,
    data: dataUserFollow,
    userFollowReq,
  } = useUserFollow();
  const {
    isLoading: isLoadingUserAcceptFollow,
    data: dataUserAcceptFollow,
    userAcceptFollowReq,
  } = useUserAcceptFollow();
  const {
    isLoading: isLoadingUserRejectFollow,
    data: dataUserRejectFollow,
    userRejectFollowReq,
  } = useUserRejectFollow();
  const {
    isLoading: isLoadingUserRemoveFollow,
    data: dataUserRemoveFollow,
    userRemoveFollowReq,
  } = useUserRemoveFollow();
  const {
    isLoading: isLoadingUserUnFollow,
    data: dataUserUnFollow,
    userUnFollowReq,
  } = useUserUnFollow();

  const followHandler = (id) => {
    userFollowReq(id);
    console.log("follow req");
  };

  const unFollowHandler = (id) => {
    userUnFollowReq(id);
    console.log("unfollow req");
  };

  const acceptFollowHandler = (id) => {
    userAcceptFollowReq(id);
    console.log("accept follow req");
  };

  const rejectFollowHandler = (id) => {
    userRejectFollowReq(id);

    console.log("reject follow req");
  };

  const removeFollowHandler = (id) => {
    userRemoveFollowReq(id);

    console.log("remove follow req");
  };

  // useEffect(() => {
  //   if (
  //     dataUserFollow ||
  //     dataUserUnFollow ||
  //     dataUserAcceptFollow ||
  //     dataUserRejectFollow ||
  //     dataUserRemoveFollow
  //   ) {
  //     reFetch();
  //   }
  // }, [
  //   dataUserFollow,
  //   dataUserUnFollow,
  //   dataUserAcceptFollow,
  //   dataUserRejectFollow,
  //   dataUserRemoveFollow,
  // ]);

  return (
    <>
      <div className="border rounded-lg">
        <div className="relative flex justify-center">
          <img
            src={user?.profile_banner_image}
            alt="Profile Banner"
            className="rounded-t-lg h-20 w-full object-cover"
          />
          <img
            src={user?.profile_image}
            alt="User Profile Image"
            className="absolute w-20 h-20 top-1/2 rounded-full border-[3px] border-white bg-white"
          />
        </div>

        <div className="mt-10 p-5 pt-1">
          <NavLink
            to={`/profiles/${user?.id}`}
            className="block text-center text-lg font-semibold hover:underline"
          >
            {user?.first_name + " " + user?.last_name}
          </NavLink>
          <p className="text-center text-gray-500 text-xs">{user?.about_me}</p>

          <div className="pt-5">
            <ul className="max-w-[220px] mx-auto flex items-center justify-between">
              <li className="text-sm text-gray-500 flex items-center justify-between mb-1">
                Followers: <b className="ml-2">14</b>
              </li>
              <li className="text-sm text-gray-500 flex items-center justify-between">
                Following: <b className="ml-2">28</b>
              </li>
            </ul>
          </div>

          {user?.follow_status === "none" && (
            <Button
              type="button"
              className="w-full mt-3"
              onClick={() => followHandler(user?.id)}
            >
              Follow
              {isLoadingUserFollow && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          )}

          {(user?.follow_status === "pending_sent" ||
            user?.follow_status === "follower") && (
            <Button
              type="button"
              className="w-full mt-3"
              onClick={() => unFollowHandler(user?.id)}
            >
              {user?.follow_status === "pending_sent"
                ? "Cancel Request"
                : "Unfollow"}
              {isLoadingUserUnFollow && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          )}

          {user?.follow_status === "following" && (
            <Button
              type="button"
              className="w-full mt-3"
              onClick={() => removeFollowHandler(user?.id)}
            >
              Remove
              {isLoadingUserUnFollow && (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          )}

          {user?.follow_status === "pending_received" && (
            <div className="flex gap-2">
              <Button
                type="button"
                className="w-full mt-3"
                onClick={() => acceptFollowHandler(user?.id)}
              >
                Accept
                {isLoadingUserAcceptFollow && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
              <Button
                type="button"
                className="w-full mt-3"
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
        </div>
      </div>
    </>
  );
};

export default UserCard;
