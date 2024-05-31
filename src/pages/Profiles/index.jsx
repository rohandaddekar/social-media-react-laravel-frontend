import useAllUsers from "@/api/users/All";
import UserCard from "@/components/Users/Card";
import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profiles = () => {
  const authUser = useSelector((state) => state.authUser);
  const { allUsersReq, data, error, isLoading, reFetchAllUsers } =
    useAllUsers();

  useEffect(() => {
    allUsersReq();
  }, []);

  useEffect(() => {
    const listner = pvtEventListner(authUser?.token);
    listner
      .private(`user-follow-status.${authUser.id}`)
      .listen("UserFollowStatusEvent", (e) => {
        console.log("user follow status event: ", e);
      });

    return () => {
      listner.leave(`user-follow-status.${authUser.id}`);
    };
  }, []);

  return (
    <>
      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {isLoading ? (
            <p>loading...</p>
          ) : error ? (
            <p>failed to load</p>
          ) : data?.length > 0 ? (
            data?.map((user, i) => (
              <UserCard key={i} user={user} reFetch={reFetchAllUsers} />
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profiles;
