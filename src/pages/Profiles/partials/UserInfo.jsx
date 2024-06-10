/* eslint-disable react/prop-types */

import useShowUser from "@/api/users/Show";
import FollowBtnGroup from "@/components/Users/FollowBtnGroup";
import FollowerOrFollowingModal from "@/components/Users/FollowerOrFollowingModal";
import { Button } from "@/components/ui/button";
import useUserFollowStatusListner from "@/listners/UserFollowStatusListner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserInfoSkeleton from "@/pages/Profiles/partials/UserInfoSkeleton";

const UserInfo = ({ userId }) => {
  const authUser = useSelector((state) => state.authUser);

  const { data, setData, error, isLoading, showUserReq } = useShowUser();

  const [selectedUserId, setSelectedUserId] = useState("");
  const [openFollowerOrFollowingModal, setOpenFollowerOrFollowingModal] =
    useState(false);
  const [followerOrFollowingModalType, setFollowerOrFollowingModalType] =
    useState(null);

  const userFollowStatusListnerHandler = (e) => {
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
  };
  useUserFollowStatusListner(userFollowStatusListnerHandler);

  useEffect(() => {
    showUserReq(userId);
  }, [userId]);

  if (isLoading) {
    return <UserInfoSkeleton />;
  }

  if (error) {
    return <p>failed to load</p>;
  }

  return (
    <>
      <div className="border rounded-lg pb-8">
        <div className="relative">
          <img
            src={data?.profile_banner_image}
            alt="Profile Banner"
            className="rounded-t-lg h-32 w-full object-cover"
          />
          <img
            src={data?.profile_image}
            alt="User Profile Image"
            className="absolute w-32 h-32 -bottom-20 left-10 rounded-full border-4 border-white bg-white"
          />
        </div>

        <div className="ml-36 mt-5 px-10 flex items-start justify-between">
          <div>
            <h1 className="block text-xl font-semibold">
              {data?.first_name + " " + data?.last_name}
            </h1>
            <p className="text-gray-500 text-sm mt-1">{data?.about_me}</p>

            <div className="flex items-center gap-4 mt-2">
              <p
                className="border text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setOpenFollowerOrFollowingModal(true);
                  setFollowerOrFollowingModalType("follower");
                  setSelectedUserId(data?.id);
                }}
              >
                Followers: <b>{data?.followers || 0}</b>
              </p>
              <p
                className="border text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setOpenFollowerOrFollowingModal(true);
                  setFollowerOrFollowingModalType("following");
                  setSelectedUserId(data?.id);
                }}
              >
                Followings: <b>{data?.followings || 0}</b>
              </p>
              {authUser?.id === +userId && (
                <>
                  <p
                    className="border text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setOpenFollowerOrFollowingModal(true);
                      setFollowerOrFollowingModalType("sentRequest");
                    }}
                  >
                    Sent Requests: <b>{data?.sent_requests || 0}</b>
                  </p>
                  <p
                    className="border text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setOpenFollowerOrFollowingModal(true);
                      setFollowerOrFollowingModalType("receivedRequest");
                    }}
                  >
                    Received Requests: <b>{data?.received_requests || 0}</b>
                  </p>
                </>
              )}
            </div>
          </div>

          <FollowBtnGroup userId={userId} follow_status={data?.follow_status} />

          {authUser?.id === +userId && (
            <div className="flex items-center gap-4">
              <Button className="w-32">Edit Profile</Button>
            </div>
          )}
        </div>
      </div>

      <FollowerOrFollowingModal
        open={openFollowerOrFollowingModal}
        setOpen={setOpenFollowerOrFollowingModal}
        type={followerOrFollowingModalType}
        userId={selectedUserId}
      />
    </>
  );
};

export default UserInfo;
