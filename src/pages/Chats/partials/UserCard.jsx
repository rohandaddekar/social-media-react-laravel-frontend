const UserCard = () => {
  return (
    <>
      <li className="border rounded-md flex gap-2 p-2 cursor-pointer hover:bg-gray-50">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&s"
          alt=""
          className="w-12 h-12 rounded-full"
        />
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">John Doe</h2>
            <p className="text-xs text-gray-500">10:30 AM</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Lorem ipsum dolor sitew...</p>
            <p className="bg-gray-600 rounded-full text-white text-xs w-5 h-5 flex items-center justify-center">
              3
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default UserCard;
