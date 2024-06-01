import useAllUsers from "@/api/users/All";
import UserCard from "@/components/Users/Card";
import { pvtEventListner } from "@/lib/laravelEcho.config";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profiles = () => {
  const authUser = useSelector((state) => state.authUser);
  const { allUsersReq, data, setData, error, isLoading, reFetchAllUsers } =
    useAllUsers();

  const updateFollowStatus = (userId, status) => {
    setData((prev) => {
      return prev.map((user) => {
        if (user.id === userId) {
          return { ...user, follow_status: status };
        } else {
          return user;
        }
      });
    });
  };

  useEffect(() => {
    allUsersReq();
  }, []);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener
      .private(`user-follow-status.${authUser.id}`)
      .listen("UserFollowStatusEvent", (e) => {
        console.log("user follow status event: ", e);

        const { sender_follow_status, receiver_follow_status } = e.followStatus;
        const followReq = e.followReq;

        if (followReq.sender_id === authUser.id) {
          updateFollowStatus(followReq.receiver_id, sender_follow_status);
        } else if (followReq.receiver_id === authUser.id) {
          updateFollowStatus(followReq.sender_id, receiver_follow_status);
        }
      });

    return () => {
      listener.leave(`user-follow-status.${authUser.id}`);
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
