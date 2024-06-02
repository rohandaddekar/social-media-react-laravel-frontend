import useAllNotifications from "@/api/notifications/All";
import useDeleteAllNotification from "@/api/notifications/DeleteAll";
import useMarkAllNotificationAsRead from "@/api/notifications/MarkAllAsRead";
import NotificationCard from "@/components/Notification/Card";
import { Bell, CheckCheck, Loader2, Trash2 } from "lucide-react";
import { useEffect } from "react";

const Notifications = () => {
  const {
    data: dataAllNotifications,
    error: errorAllNotifications,
    isLoading: isLoadingAllNotifications,
    reFetch: reFetchAllNotifications,
    allNotificationsReq,
  } = useAllNotifications();
  const {
    markAllNotificationAsReadReq,
    isLoading: isLoadingMarkAll,
    data: dataMarkAll,
  } = useMarkAllNotificationAsRead();
  const {
    isLoading: isLoadingDeleteAll,
    data: dataDeleteAll,
    deleteAllNotificationReq,
  } = useDeleteAllNotification();

  useEffect(() => {
    allNotificationsReq();
  }, []);

  useEffect(() => {
    if (dataMarkAll || dataDeleteAll) {
      reFetchAllNotifications();
    }
  }, [dataMarkAll, dataDeleteAll]);

  return (
    <>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex items-center justify-between border rounded-md p-4 mb-5">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6" />
            <h1 className="text-xl font-semibold">
              Notifications - <span>{dataAllNotifications?.length}</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <p
              className="flex items-center gap-1 text-xs cursor-pointer hover:underline"
              onClick={() => markAllNotificationAsReadReq()}
            >
              <CheckCheck className="w-5 h-5" /> Mark All As Read
              {isLoadingMarkAll && <Loader2 className="w-5 h-5 animate-spin" />}
            </p>
            <p
              className="flex items-center gap-1 text-xs cursor-pointer hover:underline"
              onClick={() => deleteAllNotificationReq()}
            >
              <Trash2 className="w-4 h-4" /> Clear All
              {isLoadingDeleteAll && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}
            </p>
          </div>
        </div>

        <ul className="border">
          {isLoadingAllNotifications ? (
            <li className="text-sm p-5 text-center">loading...</li>
          ) : errorAllNotifications ? (
            <li className="text-sm p-5 text-center">failed to load</li>
          ) : dataAllNotifications?.length > 0 ? (
            dataAllNotifications?.map((notification, i) => (
              <NotificationCard
                key={i}
                notification={notification}
                reFetchAllNotifications={reFetchAllNotifications}
              />
            ))
          ) : (
            <li className="text-sm p-5 text-center">No notifications</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Notifications;
