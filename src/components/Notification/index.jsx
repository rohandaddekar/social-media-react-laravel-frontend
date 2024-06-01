/* eslint-disable react/prop-types */

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const Notification = ({ trigger, data, isLoading, error }) => {
  const navigate = useNavigate();
  console.log("notification data: ", data);

  const navigationHandler = (type, userId) => {
    switch (type) {
      case "user-follow":
        navigate(`/profiles/${userId}`);
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-md">
        <DropdownMenuLabel>
          Notifications : <b>{data?.length}</b>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ul className="p-2 space-y-2">
          {isLoading ? (
            <li className="text-sm">loading...</li>
          ) : error ? (
            <li className="text-sm">failed to load</li>
          ) : data?.length > 0 ? (
            data?.map((notification, i) => (
              <li
                key={i}
                className="text-sm border p-2 rounded-sm cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  navigationHandler(
                    notification?.type,
                    notification?.data?.user?.id
                  )
                }
              >
                {notification?.data?.message}
              </li>
            ))
          ) : (
            <li className="text-sm">No notifications</li>
          )}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
