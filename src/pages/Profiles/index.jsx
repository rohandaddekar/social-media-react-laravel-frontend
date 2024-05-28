import useAllUsers from "@/api/users/All";
import UserCard from "@/components/Users/Card";
import { useEffect } from "react";

const Profiles = () => {
  const { allUsersReq, data, error, isLoading } = useAllUsers();

  useEffect(() => {
    allUsersReq();
  }, []);

  return (
    <>
      <div className="container py-10">
        <div className="grid grid-cols-4 gap-5">
          {isLoading ? (
            <p>loading...</p>
          ) : error ? (
            <p>failed to load</p>
          ) : data?.length > 0 ? (
            data?.map((user, i) => <UserCard key={i} user={user} />)
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profiles;
