/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const UserCard = ({ user }) => {
  return (
    <>
      <div className="border rounded-lg">
        <div className="relative flex justify-center">
          <img
            src={user?.profile_banner_image}
            alt="Profile Banner"
            className="rounded-t-lg h-20 w-full object-cover"
          />
          <img
            src={user?.profile_image}
            alt="User Profile Image"
            className="absolute w-20 h-20 top-1/2 rounded-full border-[3px] border-white bg-white"
          />
        </div>

        <div className="mt-10 p-5 pt-1">
          <NavLink
            to={`/profiles/${user?.id}`}
            className="block text-center text-lg font-semibold hover:underline"
          >
            {user?.first_name + " " + user?.last_name}
          </NavLink>
          <p className="text-center text-gray-500 text-xs">{user?.about_me}</p>

          <div className="pt-5">
            <ul className="max-w-[220px] mx-auto flex items-center justify-between">
              <li className="text-sm text-gray-500 flex items-center justify-between mb-1">
                Followers: <b className="ml-2">14</b>
              </li>
              <li className="text-sm text-gray-500 flex items-center justify-between">
                Following: <b className="ml-2">28</b>
              </li>
            </ul>
          </div>

          <Button className="w-full mt-3">Follow</Button>
        </div>
      </div>
    </>
  );
};

export default UserCard;