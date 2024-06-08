/* eslint-disable react/prop-types */

import useMeUser from "@/api/users/Me";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import LeftSideSkeleton from "@/pages/Home/partials/LeftSection/partials/Skeleton";

const LeftSection = () => {
  const { data, error, isLoading, meUserReq } = useMeUser();

  useEffect(() => {
    meUserReq();
  }, []);

  if (isLoading) return <LeftSideSkeleton />;

  if (error) return <p className="p-5 text-red-400">failed to load</p>;

  return (
    <>
      <div className="relative flex justify-center">
        <img
          src={data?.profile_banner_image}
          alt="Profile Banner"
          className="rounded-t-lg h-20 w-full object-cover"
        />
        <img
          src={data?.profile_image}
          alt="User Profile Image"
          className="absolute w-20 h-20 top-1/2 rounded-full border-[3px] border-white bg-white"
        />
      </div>

      <div className="mt-10 p-5 pt-1">
        <div className="border-b pb-5">
          <NavLink
            to={`/profiles/${data?.id}`}
            className="block text-center text-lg font-semibold hover:underline"
          >
            {data?.first_name + " " + data?.last_name}
          </NavLink>
          <p className="text-center text-gray-500 text-xs">{data?.about_me}</p>
        </div>

        <div className="pt-5">
          <ul>
            <li className="text-sm text-gray-500 flex items-center justify-between mb-1">
              Followers: <b>{data?.followers}</b>
            </li>
            <li className="text-sm text-gray-500 flex items-center justify-between">
              Following: <b>{data?.followings}</b>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftSection;
