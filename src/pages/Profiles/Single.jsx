import useShowUser from "@/api/users/Show";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import PublishedPosts from "@/pages/Profiles/partials/PublishedPosts";
import ScheduledPosts from "@/pages/Profiles/partials/ScheduledPosts";
import FollowerOrFollowingModal from "@/components/Users/FollowerOrFollowingModal";

const SingleProfile = () => {
  const { userId } = useParams();
  const authUser = useSelector((state) => state.authUser);

  const { data, error, isLoading, showUserReq } = useShowUser();

  const [selectedTab, setSelectedTab] = useState("published-posts");
  const [openFollowerOrFollowingModal, setOpenFollowerOrFollowingModal] =
    useState(false);
  const [followerOrFollowingModalType, setFollowerOrFollowingModalType] =
    useState(null);

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

  return (
    <>
      <div className="max-w-5xl mx-auto py-10">
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

              {authUser?.id !== +userId ? (
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="w-32">
                    Message
                  </Button>
                  <Button className="w-32">Follow</Button>
                </div>
              ) : (
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
