/* eslint-disable react/prop-types */

const UserDetails = ({ selectedChatUser }) => {
  return (
    <>
      <div className="border rounded-md flex gap-4 bg-gray-100 p-2 m-2 mb-0">
        <img
          src={selectedChatUser?.profile_image}
          alt={selectedChatUser?.first_name}
          className="w-12 h-12 rounded-full"
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">
              {selectedChatUser?.first_name} {selectedChatUser?.last_name}
            </h2>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
