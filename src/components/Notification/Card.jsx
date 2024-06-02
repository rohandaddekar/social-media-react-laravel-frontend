/* eslint-disable react/prop-types */

import useDeleteNotification from "@/api/notifications/Delete";
import useMarkNotificationAsRead from "@/api/notifications/MarkAsRead";
import { Loader2, Trash2 } from "lucide-react";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotificationCard = ({ notification, reFetchAllNotifications }) => {
  const navigate = useNavigate();
  const { markNotificationAsReadReq } = useMarkNotificationAsRead();

  const {
    deleteNotificationReq,
    isLoading: isLoadingDelete,
    data: dataDelete,
  } = useDeleteNotification();

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

  useEffect(() => {
    if (dataDelete) {
      reFetchAllNotifications();
    }
  }, [dataDelete]);

  return (
    <>
      <li
        className={`text-sm p-5 flex gap-3 items-center justify-between border-b hover:bg-gray-100 ${
          notification?.is_read === 0 ? "bg-gray-100" : "bg-white"
        }`}
      >
        <div
          className="w-full cursor-pointer flex gap-3"
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
        </div>

        <button
          type="button"
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer bg-red-100 hover:bg-red-200"
          disabled={isLoadingDelete}
          onClick={() => deleteNotificationReq(notification?.id)}
        >
          {isLoadingDelete ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4 text-destructive" />
          )}
        </button>
      </li>
    </>
  );
};

export default NotificationCard;
