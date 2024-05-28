import useAllUsers from "@/api/users/All";
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
      <h2 className="text-lg font-semibold border-b mb-3 pb-2">
        Suggested for you
      </h2>
      <div className="space-y-3">
        {isLoading ? (
          <p>loading...</p>
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
                      to={`/profile/${user?.id}`}
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
