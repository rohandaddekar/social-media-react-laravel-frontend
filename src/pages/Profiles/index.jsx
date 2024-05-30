import useAllUsers from "@/api/users/All";
import UserCard from "@/components/Users/Card";
import { useEffect } from "react";

const Profiles = () => {
  const { allUsersReq, data, error, isLoading, reFetchAllUsers } =
    useAllUsers();

  useEffect(() => {
    allUsersReq();
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
