import useAllUsers from "@/api/users/All";
import SuggestedUserCardSkeleton from "@/components/Users/SuggestedUserCardSkeleton";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const RightSection = () => {
  const { allUsersReq, data, error, isLoading } = useAllUsers();

  useEffect(() => {
    allUsersReq();
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
          data?.slice(0, 5)?.map((user, i) => (
            <div className="flex gap-3 border p-3 rounded-lg" key={i}>
              <img
                src={user?.profile_image}
                alt={user?.first_name}
                className="w-12 h-12 rounded-full bg-white"
              />
              <div className="w-full">
                <div className="flex gap-2 justify-between">
                  <div>
                    <NavLink
                      to={`/profiles/${user?.id}`}
                      className="text-md font-semibold hover:underline hover:text-blue-600 transition-all ease-in-out"
                    >
                      {user?.first_name} {user?.last_name}
                    </NavLink>
                    <p className="text-gray-500 text-xs">{user?.about_me}</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-7">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default RightSection;
