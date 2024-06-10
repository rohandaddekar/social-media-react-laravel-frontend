/* eslint-disable react/prop-types */

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserFollowers from "@/api/users/follow/Followers";
import useUserFollowings from "@/api/users/follow/Followings";
import { useEffect } from "react";
import useUserSentRequests from "@/api/users/follow/SentRequests";
import useUserReceivedRequests from "@/api/users/follow/ReceivedRequests";
import SuggestedUserCardSkeleton from "./SuggestedUserCardSkeleton";

const FollowerOrFollowingModal = ({ open, setOpen, type, userId }) => {
  const {
    data: dataUserFollowers,
    error: errorUserFollowers,
    isLoading: isLoadingUserFollowers,
    userFollowersReq,
  } = useUserFollowers();
  const {
    data: dataUserFollowings,
    error: errorUserFollowings,
    isLoading: isLoadingUserFollowings,
    userFollowingsReq,
  } = useUserFollowings();
  const {
    data: dataUserSentRequests,
    error: errorUserSentRequests,
    isLoading: isLoadingUserSentRequests,
    userSentRequestsReq,
  } = useUserSentRequests();
  const {
    data: dataUserReceivedRequests,
    error: errorUserReceivedRequests,
    isLoading: isLoadingUserReceivedRequests,
    userReceivedRequestsReq,
  } = useUserReceivedRequests();

  useEffect(() => {
    if (userId) {
      if (type === "follower") {
        userFollowersReq(userId);
      } else if (type === "following") {
        userFollowingsReq(userId);
      }
    }

    if (type === "sentRequest") {
      userSentRequestsReq();
    } else if (type === "recievedRequest") {
      userReceivedRequestsReq();
    }
  }, [userId, type]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <h1 className="font-semibold text-lg border-b pb-2">
            {type === "follower"
              ? "Followers"
              : type === "following"
              ? "Followings"
              : type === "sentRequest"
              ? "Sent Requests"
              : type === "receivedRequest"
              ? "Received Requests"
              : ""}{" "}
            -{" "}
            <b>
              {(type === "follower" && dataUserFollowers?.length) ||
                0 ||
                (type === "following" && dataUserFollowings?.length) ||
                0 ||
                (type === "sentRequest" && dataUserSentRequests?.length) ||
                0 ||
                (type === "receivedRequest" &&
                  dataUserReceivedRequests?.length) ||
                0}
            </b>
          </h1>

          {((type === "follower" && dataUserFollowers?.length > 0) ||
            (type === "following" && dataUserFollowings?.length > 0) ||
            (type === "sentRequest" && dataUserSentRequests?.length > 0) ||
            (type === "receivedRequest" &&
              dataUserReceivedRequests?.length > 0)) && (
            <Input placeholder="Search" />
          )}

          <ul className="space-y-2">
            {type === "follower" &&
              (isLoadingUserFollowers ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <li key={i}>
                    <SuggestedUserCardSkeleton />
                  </li>
                ))
              ) : errorUserFollowers ? (
                <li className="text-sm text-center text-gray-500">
                  failed to load
                </li>
              ) : dataUserFollowers?.length > 0 ? (
                dataUserFollowers?.map((data, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 border rounded-md p-3"
                  >
                    <div className="w-full flex items-center gap-4">
                      <img
                        src={data?.user?.profile_image}
                        alt={data?.user?.first_name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="w-full">
                        <NavLink
                          to={`/profiles/${data?.user?.id}`}
                          className={
                            "w-full text-md font-semibold hover:underline"
                          }
                          onClick={() => setOpen(false)}
                        >
                          {data?.user?.first_name} {data?.user?.last_name}
                        </NavLink>
                        <p className="text-xs text-gray-600">
                          {data?.user?.about_me}
                        </p>
                      </div>
                    </div>

                    <Button size="sm">Remove</Button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-center text-gray-500">
                  No followers
                </li>
              ))}

            {type === "following" &&
              (isLoadingUserFollowings ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <li key={i}>
                    <SuggestedUserCardSkeleton />
                  </li>
                ))
              ) : errorUserFollowings ? (
                <li className="text-sm text-center text-gray-500">
                  failed to load
                </li>
              ) : dataUserFollowings?.length > 0 ? (
                dataUserFollowings?.map((data, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 border rounded-md p-3"
                  >
                    <div className="w-full flex items-center gap-4">
                      <img
                        src={data?.user?.profile_image}
                        alt={data?.user?.first_name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="w-full">
                        <NavLink
                          to={`/profiles/${data?.user?.id}`}
                          className={
                            "w-full text-md font-semibold hover:underline"
                          }
                          onClick={() => setOpen(false)}
                        >
                          {data?.user?.first_name} {data?.user?.last_name}
                        </NavLink>
                        <p className="text-xs text-gray-600">
                          {data?.user?.about_me}
                        </p>
                      </div>
                    </div>

                    <Button size="sm">Unfollow</Button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-center text-gray-500">
                  No followings
                </li>
              ))}

            {type === "sentRequest" &&
              (isLoadingUserSentRequests ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <li key={i}>
                    <SuggestedUserCardSkeleton />
                  </li>
                ))
              ) : errorUserSentRequests ? (
                <li className="text-sm text-center text-gray-500">
                  failed to load
                </li>
              ) : dataUserSentRequests?.length > 0 ? (
                dataUserSentRequests?.map((data, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 border rounded-md p-3"
                  >
                    <div className="w-full flex items-center gap-4">
                      <img
                        src={data?.user?.profile_image}
                        alt={data?.user?.first_name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="w-full">
                        <NavLink
                          to={`/profiles/${data?.user?.id}`}
                          className={
                            "w-full text-md font-semibold hover:underline"
                          }
                          onClick={() => setOpen(false)}
                        >
                          {data?.user?.first_name} {data?.user?.last_name}
                        </NavLink>
                        <p className="text-xs text-gray-600">
                          {data?.user?.about_me}
                        </p>
                      </div>
                    </div>

                    <Button size="sm">Cancel</Button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-center text-gray-500">
                  No Requests
                </li>
              ))}

            {type === "receivedRequest" &&
              (isLoadingUserReceivedRequests ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <li key={i}>
                    <SuggestedUserCardSkeleton />
                  </li>
                ))
              ) : errorUserReceivedRequests ? (
                <li className="text-sm text-center text-gray-500">
                  failed to load
                </li>
              ) : dataUserReceivedRequests?.length > 0 ? (
                dataUserReceivedRequests?.map((data, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 border rounded-md p-3"
                  >
                    <div className="w-full flex items-center gap-4">
                      <img
                        src={data?.user?.profile_image}
                        alt={data?.user?.first_name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="w-full">
                        <NavLink
                          to={`/profiles/${data?.user?.id}`}
                          className={
                            "w-full text-md font-semibold hover:underline"
                          }
                          onClick={() => setOpen(false)}
                        >
                          {data?.user?.first_name} {data?.user?.last_name}
                        </NavLink>
                        <p className="text-xs text-gray-600">
                          {data?.user?.about_me}
                        </p>
                      </div>
                    </div>

                    <Button size="sm">Reject</Button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-center text-gray-500">
                  No Requests
                </li>
              ))}
          </ul>

          <ul className="space-y-2"></ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FollowerOrFollowingModal;
