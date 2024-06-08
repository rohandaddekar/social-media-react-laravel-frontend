import { useEffect } from "react";
import useAllUsers from "@/api/users/All";
import { NavLink } from "react-router-dom";
import SuggestedUserCardSkeleton from "@/components/Users/SuggestedUserCardSkeleton";
import SuggestedUserCard from "@/pages/Home/partials/RightSection/partials/SuggestedUserCard";

const RightSection = () => {
  const { allUsersReq, data, error, isLoading } = useAllUsers();

  useEffect(() => {
    allUsersReq("?showSuggested=true");
  }, []);

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
