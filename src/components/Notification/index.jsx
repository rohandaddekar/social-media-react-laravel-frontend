/* eslint-disable react/prop-types */

import useAllNotifications from "@/api/notifications/All";
import useMarkNotificationAsRead from "@/api/notifications/MarkAsRead";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { pvtEventListner } from "@/lib/laravelEcho.config";
import { Bell } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Notification = () => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const {
    data: dataAllNotifications,
    setData: setDataAllNotifications,
    error: errorAllNotifications,
    isLoading: isLoadingAllNotifications,
    allNotificationsReq,
  } = useAllNotifications();
  const { markNotificationAsReadReq } = useMarkNotificationAsRead();

  useEffect(() => {
    allNotificationsReq();
  }, []);

  useEffect(() => {
    const listener = pvtEventListner(authUser?.token);
    listener
      .private(`notification.${authUser.id}`)
      .listen("NotificationEvent", (e) => {
        console.log("notification event: ", e);
        if (authUser?.id === e.notification.user_id) {
          setDataAllNotifications((prev) => {
            return [...prev, e.notification];
          });
          toast({
            title: e.notification.data.message,
          });
        }
      });

    return () => {
      listener.leave(`user-follow-status.${authUser.id}`);
    };
  }, []);

  const getNotificationCount = () => {
    const isNotReadNotifications = dataAllNotifications?.filter(
      (notification) => {
        return notification.is_read === 0;
      }
    );

    return isNotReadNotifications?.length;
  };

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
      <DropdownMenuTrigger asChild>
        <li className="cursor-pointer relative">
          <Bell className="w-7 h-7" />
          <span className="absolute border-2 border-gray-300 -top-2 -right-2 text-xs text-white rounded-full w-6 h-6 flex items-center justify-center bg-green-800">
            {getNotificationCount() > 10 ? "9+" : getNotificationCount()}
          </span>
        </li>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-md p-0">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between px-2 py-1">
            <p className="flex items-center gap-2">
              Notifications :{" "}
              <b className="mt-0.5">{dataAllNotifications?.length}</b>
            </p>
            <NavLink to={"/notifications"} className={"text-xs text-end"}>
              View all
            </NavLink>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-0" />
        <ul className="">
          {isLoadingAllNotifications ? (
            <li className="text-sm">loading...</li>
          ) : errorAllNotifications ? (
            <li className="text-sm">failed to load</li>
          ) : dataAllNotifications?.length > 0 ? (
            dataAllNotifications?.slice(0, 5)?.map((notification, i) => (
              <li
                key={i}
                className={`text-sm p-3 cursor-pointer flex gap-3 border-b hover:bg-gray-100 ${
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
