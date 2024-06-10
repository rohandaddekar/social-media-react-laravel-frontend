import { useEffect } from "react";
import useAllUsers from "@/api/users/All";
import { NavLink } from "react-router-dom";
import SuggestedUserCardSkeleton from "@/components/Users/SuggestedUserCardSkeleton";
import SuggestedUserCard from "@/pages/Home/partials/RightSection/partials/SuggestedUserCard";
import useUserFollowStatusListner from "@/listners/UserFollowStatusListner";

const RightSection = () => {
  const { allUsersReq, data, setData, error, isLoading } = useAllUsers();

  useEffect(() => {
    allUsersReq("?showSuggested=true");
  }, []);

  const userFollowStatusListnerHandler = (e) => {
    const { sender_follow_status, receiver_follow_status } = e.followStatus;
    const followReq = e.followReq;

    setData((prev) => {
      return prev.map((user) => {
        if (user.id === followReq.sender_id) {
          return {
            ...user,
            follow_status: receiver_follow_status,
          };
        } else if (user.id === followReq.receiver_id) {
          return {
            ...user,
            follow_status: sender_follow_status,
          };
        } else {
          return user;
        }
      });
    });
  };
  useUserFollowStatusListner(userFollowStatusListnerHandler);

  return (
    <>
      <div className="border-b mb-3 pb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Suggested for you</h2>
        <NavLink to={"/profiles"} className={"text-sm underline"}>
          View all
        </NavLink>
      </div>
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <SuggestedUserCardSkeleton />
            </div>
          ))
        ) : error ? (
          <p>failed to load</p>
        ) : (
          data?.map((user, i) => <SuggestedUserCard key={i} user={user} />)
        )}
      </div>
    </>
  );
};

export default RightSection;
