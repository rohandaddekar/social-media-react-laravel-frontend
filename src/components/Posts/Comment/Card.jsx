import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { useState } from "react";
import UpdateCommentModal from "@/components/Posts/Comment/Update";
import AlertModal from "@/components/AlertModal";

const CommentCard = () => {
  const authUser = useSelector((state) => state.authUser);

  const [openCommentUpdateModal, setOpenCommentUpdateModal] = useState(false);
  const [openCommentDeleteAlertModal, setOpenCommentDeleteAlertModal] =
    useState(false);

  return (
    <>
      <div className="px-5 mt-3">
        <div className="bg-gray-50 p-5 rounded-md">
          <div className="flex gap-3 items-center">
            <img
              src={
                authUser?.profile_image ||
                "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
              }
              alt={authUser?.first_name}
              className="w-12 h-12 rounded-full bg-white"
            />
            <div className="w-full flex bg-white rounded-3xl">
              <Input
                name="comment"
                placeholder="Write a comment..."
                className="h-12 rounded-3xl border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="h-12 rounded-3xl">Comment</Button>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex gap-3 border p-3 rounded-lg">
              <img
                src={
                  authUser?.profile_image ||
                  "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                }
                alt={authUser?.first_name}
                className="w-12 h-12 rounded-full bg-white"
              />
              <div className="w-full">
                <div className="flex justify-between">
                  <div>
                    <NavLink
                      to={`/profile/`}
                      className="text-md font-semibold hover:underline hover:text-blue-600 transition-all ease-in-out"
                    >
                      Alex Doe{" "}
                    </NavLink>
                    <p className="text-gray-500 text-xs">About me</p>
                  </div>
                  <div className="flex gap-3">
                    <p className="text-gray-500 text-xs mt-1">3 hrs ago</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-7">
                        <Ellipsis className="w-5 h-5 text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setOpenCommentUpdateModal(true)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => setOpenCommentDeleteAlertModal(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
                  distinctio asperiores. Quis, eos ducimus reiciendis voluptatem
                  voluptates ad temporibus velit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdateCommentModal
        type={"update"}
        open={openCommentUpdateModal}
        setOpen={setOpenCommentUpdateModal}
      />
      <AlertModal
        open={openCommentDeleteAlertModal}
        setOpen={setOpenCommentDeleteAlertModal}
      />
    </>
  );
};

export default CommentCard;
