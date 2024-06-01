import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserDropdownMenu from "@/components/Header/UserDropdownMenu";
import { useSelector } from "react-redux";
import CreateOrUpdateModal from "@/components/Posts/CreateOrUpdate";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import useCreatePost from "@/api/posts/Create";
import useAllNotifications from "@/api/notifications/All";
import Notification from "../Notification";

const Header = () => {
  const authUser = useSelector((state) => state.authUser);

  const {
    createPostReq,
    data: dataCreatePost,
    error: errorCreatePost,
    setError: setErrorCreatePost,
    isLoading: isLoadingCreatePost,
  } = useCreatePost();
  const {
    data: dataAllNotifications,
    error: errorAllNotifications,
    isLoading: isLoadingAllNotifications,
    allNotificationsReq,
    reFetch: reFetchAllNotifications,
  } = useAllNotifications();

  const [openPostCreateModal, setOpenPostCreateModal] = useState(false);

  useEffect(() => {
    allNotificationsReq();
  }, []);

  return (
    <>
      <header className="border-b sticky top-0 z-50 bg-white">
        <div className="container flex items-center justify-between py-4">
          <NavLink to="/">
            <img
              src="/images/logo-with-name.svg"
              alt="LOGO"
              className="max-w-52"
            />
          </NavLink>

          <div className="flex items-center gap-5">
            <ul className="flex items-center gap-5">
              <li className="hover:underline transition-all ease-in-out">
                <NavLink to="/">Home</NavLink>
              </li>
              {!authUser ? (
                <li>
                  <Button asChild>
                    <NavLink to="/sign-in">Sign In</NavLink>
                  </Button>
                </li>
              ) : (
                <Notification
                  trigger={
                    <li className="cursor-pointer relative">
                      <Bell className="w-7 h-7" />
                      <span className="absolute border-2 border-gray-300 -top-2 -right-2 text-xs text-white rounded-full w-6 h-6 flex items-center justify-center bg-green-800">
                        {dataAllNotifications?.length > 10
                          ? "9+"
                          : dataAllNotifications?.length}
                      </span>
                    </li>
                  }
                  data={dataAllNotifications}
                  isLoading={isLoadingAllNotifications}
                  error={errorAllNotifications}
                />
              )}
            </ul>

            {authUser && (
              <>
                <Button
                  type="button"
                  onClick={() => setOpenPostCreateModal(true)}
                >
                  Create Post
                </Button>
                <UserDropdownMenu />
              </>
            )}
          </div>
        </div>
      </header>

      <CreateOrUpdateModal
        type={"create"}
        open={openPostCreateModal}
        setOpen={setOpenPostCreateModal}
        submitReq={createPostReq}
        submitData={dataCreatePost}
        submitError={errorCreatePost}
        submitSetError={setErrorCreatePost}
        submitIsLoading={isLoadingCreatePost}
      />
    </>
  );
};

export default Header;
