import useShowUser from "@/api/users/Show";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import PublishedPosts from "@/pages/Profiles/partials/PublishedPosts";
import ScheduledPosts from "@/pages/Profiles/partials/ScheduledPosts";
import FollowerOrFollowingModal from "@/components/Users/FollowerOrFollowingModal";
import { Loader2 } from "lucide-react";
import useUserFollow from "@/api/users/Follow";
import useUserAcceptFollow from "@/api/users/AcceptFollow";
import useUserRejectFollow from "@/api/users/RejectFollow";
import useUserRemoveFollow from "@/api/users/RemoveFollow";
import useUserUnFollow from "@/api/users/UnFollow";
import { pvtEventListner } from "@/lib/laravelEcho.config";

const SingleProfile = () => {
  const { userId } = useParams();
  const authUser = useSelector((state) => state.authUser);

  const { data, setData, error, isLoading, showUserReq } = useShowUser();
  const { isLoading: isLoadingUserFollow, userFollowReq } = useUserFollow();
  const { isLoading: isLoadingUserAcceptFollow, userAcceptFollowReq } =
    useUserAcceptFollow();
  const { isLoading: isLoadingUserRejectFollow, userRejectFollowReq } =
    useUserRejectFollow();
  const { isLoading: isLoadingUserRemoveFollow, userRemoveFollowReq } =
    useUserRemoveFollow();
  const { isLoading: isLoadingUserUnFollow, userUnFollowReq } =
    useUserUnFollow();

  const [selectedTab, setSelectedTab] = useState("published-posts");
  const [openFollowerOrFollowingModal, setOpenFollowerOrFollowingModal] =
    useState(false);
  const [followerOrFollowingModalType, setFollowerOrFollowingModalType] =
    useState(null);

  //

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

  console.log("data: ", data);
  //

  const renderPosts = () => {
    switch (selectedTab) {
      case "published-posts":
        return (
          <PublishedPosts userId={userId} setSelectedTab={setSelectedTab} />
        );

      case "scheduled-posts":
        return (
          <ScheduledPosts userId={userId} setSelectedTab={setSelectedTab} />
        );

      default:
        return (
          <PublishedPosts userId={userId} setSelectedTab={setSelectedTab} />
        );
    }
  };

  useEffect(() => {
    showUserReq(userId);
  }, [userId]);

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

  return (
    <>
      <div className="max-w-5xl mx-auto py-10 px-4">
        {isLoading ? (
          <p>loading...</p>
        ) : error ? (
          <p>failed to load</p>
        ) : (
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
                    }}
                  >
                    Followers: <b>16</b>
                  </p>
                  <p
                    className="border text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                      setOpenFollowerOrFollowingModal(true);
                      setFollowerOrFollowingModalType("following");
                    }}
                  >
                    Followings: <b>38</b>
                  </p>
                  {authUser?.id === +userId && (
                    <p className="border text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50">
                      Requests: <b>6</b>
                    </p>
                  )}
                </div>
              </div>

              {authUser?.id !== +userId && data?.follow_status === "none" && (
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => followHandler(data?.id)}
                >
                  Follow
                  {isLoadingUserFollow && (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              )}

              {authUser?.id !== +userId &&
                (data?.follow_status === "pending_sent" ||
                  data?.follow_status === "follower") && (
                  <div className="flex gap-2">
                    {data?.follow_status === "follower" && (
                      <Button variant="outline">Message</Button>
                    )}
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => unFollowHandler(data?.id)}
                    >
                      {data?.follow_status === "pending_sent"
                        ? "Cancel Request"
                        : "Unfollow"}
                      {isLoadingUserUnFollow && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </div>
                )}

              {authUser?.id !== +userId &&
                data?.follow_status === "following" && (
                  <div className="flex gap-2">
                    <Button variant="outline">Message</Button>
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => removeFollowHandler(data?.id)}
                    >
                      Remove
                      {isLoadingUserRemoveFollow && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </div>
                )}

              {authUser?.id !== +userId &&
                data?.follow_status === "pending_received" && (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => acceptFollowHandler(data?.id)}
                    >
                      Accept
                      {isLoadingUserAcceptFollow && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => rejectFollowHandler(data?.id)}
                      variant="outline"
                    >
                      Reject
                      {isLoadingUserRejectFollow && (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      )}
                    </Button>
                  </div>
                )}

              {authUser?.id === +userId && (
                <div className="flex items-center gap-4">
                  <Button className="w-32">Edit Profile</Button>
                </div>
              )}
            </div>
          </div>
        )}

        <ul className="flex items-center gap-3 bg-gray-100 p-1 mt-5 rounded-md">
          <li
            className={cn([
              "w-full p-1.5 rounded-md text-center text-sm font-semibold cursor-pointer",
              selectedTab === "published-posts" ? "bg-white" : "bg-gray-100",
            ])}
            onClick={() => setSelectedTab("published-posts")}
          >
            Posts
          </li>
          {authUser?.id === +userId && (
            <li
              className={cn([
                "w-full p-1.5 rounded-md text-center text-sm font-semibold cursor-pointer",
                selectedTab === "scheduled-posts" ? "bg-white" : "bg-gray-100",
              ])}
              onClick={() => setSelectedTab("scheduled-posts")}
            >
              Scheduled Posts
            </li>
          )}
        </ul>

        <div className="mt-3">{renderPosts()}</div>
      </div>

      <FollowerOrFollowingModal
        open={openFollowerOrFollowingModal}
        setOpen={setOpenFollowerOrFollowingModal}
        type={followerOrFollowingModalType}
      />
    </>
  );
};

export default SingleProfile;
