/* eslint-disable react/prop-types */

import useMarkAllNotificationAsRead from "@/api/notifications/MarkAllAsRead";
import useMarkNotificationAsRead from "@/api/notifications/MarkAsRead";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";

const Notification = ({ trigger, data, isLoading, error }) => {
  const navigate = useNavigate();
  const { markNotificationAsReadReq } = useMarkNotificationAsRead();
  const { markAllNotificationAsReadReq } = useMarkAllNotificationAsRead();

  console.log("notification data: ", data);

  const navigationHandler = (type, userId, id, is_read) => {
    switch (type) {
      case "user-follow":
        is_read === 0 && markNotificationAsReadReq(id);
        navigate(`/profiles/${userId}`);
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-md p-0">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between px-2 py-1">
            <p
              className="flex items-center gap-2"
              onClick={() => markAllNotificationAsReadReq()}
            >
              Notifications : <b className="mt-0.5">{data?.length}</b>
            </p>
            <NavLink to={"/notifications"} className={"text-xs text-end"}>
              View all
            </NavLink>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-0" />
        <ul className="">
          {isLoading ? (
            <li className="text-sm">loading...</li>
          ) : error ? (
            <li className="text-sm">failed to load</li>
          ) : data?.length > 0 ? (
            data?.slice(0, 5)?.map((notification, i) => (
              <li
                key={i}
                className={`text-sm p-3 cursor-pointer flex gap-3 border-b ${
                  notification?.is_read === 0 ? "bg-gray-100" : "bg-white"
                }`}
                onClick={() =>
                  navigationHandler(
                    notification?.type,
                    notification?.data?.user?.id,
                    notification?.id,
                    notification?.is_read
                  )
                }
              >
                <img
                  src={notification?.data?.user?.profile_image}
                  alt={notification?.data?.user?.first_name}
                  className="w-10 h-10 rounded-full bg-white"
                />
                <div className="w-full">
                  <p className="text-sm">{notification?.data?.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {moment(notification?.created_at).fromNow()}
                  </p>
                </div>
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
