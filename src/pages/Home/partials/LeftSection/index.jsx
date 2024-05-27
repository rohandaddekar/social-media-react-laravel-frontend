/* eslint-disable react/prop-types */

const LeftSection = ({ authUser }) => {
  return (
    <>
      <div className="relative flex justify-center">
        <img
          src={authUser?.profile_banner_image}
          alt="Profile Banner"
          className="rounded-t-lg h-20 w-full object-cover"
        />
        <img
          src={authUser?.profile_image}
          alt="User Profile Image"
          className="absolute w-20 h-20 top-1/2 rounded-full border-[3px] border-white bg-white"
        />
      </div>

      <div className="mt-10 p-5 pt-1">
        <div className="border-b pb-5">
          <h2 className="text-center text-lg font-semibold">
            {authUser?.first_name + " " + authUser?.last_name}
          </h2>
          <p className="text-center text-gray-500 text-xs">
            {authUser?.about_me}
          </p>
        </div>

        <div className="pt-5">
          <ul>
            <li className="text-sm text-gray-500 flex items-center justify-between mb-1">
              Followers: <b>14</b>
            </li>
            <li className="text-sm text-gray-500 flex items-center justify-between">
              Following: <b>28</b>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LeftSection;
