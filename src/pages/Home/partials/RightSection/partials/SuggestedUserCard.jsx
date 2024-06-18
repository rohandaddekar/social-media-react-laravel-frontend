/* eslint-disable react/prop-types */

import FollowBtnGroup from "@/components/Users/FollowBtnGroup";
import { NavLink } from "react-router-dom";

const SuggestedUserCard = ({ user }) => {
  return (
    <>
      <div className="flex gap-3 border p-3 rounded-lg">
        <img
          src={user?.profile_image}
          alt={user?.first_name}
          className="w-12 h-12 rounded-full bg-white"
        />
        <div className="w-full">
          <div className="flex gap-2 justify-between">
            <div className="w-full">
              <NavLink
                to={`/profiles/${user?.id}`}
                className="text-md font-semibold hover:underline hover:text-blue-600 transition-all ease-in-out"
              >
                {user?.first_name} {user?.last_name}
              </NavLink>
              <p className="text-gray-500 text-xs">{user?.about_me}</p>
            </div>

            <FollowBtnGroup
              user={user}
              follow_status={user?.follow_status}
              btnSize="sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuggestedUserCard;
