/* eslint-disable react/prop-types */

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserFollowers from "@/api/users/Followers";
import useUserFollowings from "@/api/users/Followings";
import { useEffect } from "react";

const FollowerOrFollowingModal = ({ open, setOpen, type, userId }) => {
  const {
    data: dataUserFollowers,
    error: errorUserFollowers,
    isLoading: isLoadingUserFollowers,
    userFollowersReq,
  } = useUserFollowers();
  const {
    data: dataUserFollowings,
    error: errorUserFollowings,
    isLoading: isLoadingUserFollowings,
    userFollowingsReq,
  } = useUserFollowings();

  useEffect(() => {
    if (userId) {
      if (type === "follower") {
        userFollowersReq(userId);
      } else {
        userFollowingsReq(userId);
      }
    }
  }, [userId, type]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <h1 className="font-semibold text-lg border-b pb-2">
            {type === "follower" ? "Followers" : "Followings"} -{" "}
            <b>
              {(type === "follower" && dataUserFollowers?.length) ||
                (type === "following" && dataUserFollowings?.length)}
            </b>
          </h1>

          {((type === "follower" && dataUserFollowers?.length > 0) ||
            (type === "following" && dataUserFollowings?.length > 0)) && (
            <Input placeholder="Search" />
          )}

          <ul className="space-y-2">
            {type === "follower" &&
              (isLoadingUserFollowers ? (
                <li className="text-sm text-center text-gray-500">
                  loading...
                </li>
              ) : errorUserFollowers ? (
                <li className="text-sm text-center text-gray-500">
                  failed to load
                </li>
              ) : dataUserFollowers?.length > 0 ? (
                dataUserFollowers?.map((_, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 border rounded-md p-3"
                  >
                    <div className="w-full flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="user"
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="w-full">
                        <NavLink
                          to={`/profiles/`}
                          className={
                            "w-full text-md font-semibold hover:underline"
                          }
                        >
                          John Doe
                        </NavLink>
                        <p className="text-xs text-gray-600">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit...
                        </p>
                      </div>
                    </div>

                    <Button size="sm">
                      {type === "follower" ? "Follow" : "Unfollow"}
                    </Button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-center text-gray-500">
                  No followers
                </li>
              ))}

            {type === "following" &&
              (isLoadingUserFollowings ? (
                <li className="text-sm text-center text-gray-500">
                  loading...
                </li>
              ) : errorUserFollowings ? (
                <li className="text-sm text-center text-gray-500">
                  failed to load
                </li>
              ) : dataUserFollowings?.length > 0 ? (
                dataUserFollowings?.map((_, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 border rounded-md p-3"
                  >
                    <div className="w-full flex items-center gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="user"
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="w-full">
                        <NavLink
                          to={`/profiles/`}
                          className={
                            "w-full text-md font-semibold hover:underline"
                          }
                        >
                          John Doe
                        </NavLink>
                        <p className="text-xs text-gray-600">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit...
                        </p>
                      </div>
                    </div>

                    <Button size="sm">
                      {type === "follower" ? "Follow" : "Unfollow"}
                    </Button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-center text-gray-500">
                  No followings
                </li>
              ))}
          </ul>

          <ul className="space-y-2"></ul>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FollowerOrFollowingModal;
