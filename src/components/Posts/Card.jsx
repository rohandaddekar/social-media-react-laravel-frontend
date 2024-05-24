/* eslint-disable react/prop-types */

import { cn } from "@/lib/utils";
import { MessageCircleMore, Send, ThumbsUp } from "lucide-react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import CommentCard from "@/components/Posts/Comment/Card";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Ellipsis, Trash2 } from "lucide-react";
import CreateOrUpdatePostModal from "@/components/Posts/CreateOrUpdate";
import AlertModal from "@/components/AlertModal";
import ShareModal from "@/components/Posts/Share";

const renderImages = (images) => {
  if (images?.length === 0) {
    return null;
  }

  if (images?.length === 1) {
    return (
      <img
        src={images[0]}
        alt="Post Image"
        className="w-full h-[400px] object-cover"
      />
    );
  }

  if (images?.length === 2) {
    return (
      <div className="flex -mx-[1%]">
        <img
          src={images[0]}
          alt="Post Image"
          className="w-[48%] h-[400px] mx-[1%] object-cover"
        />
        <img
          src={images[1]}
          alt="Post Image"
          className="w-[48%] h-[400px] mx-[1%] object-cover"
        />
      </div>
    );
  }

  if (images?.length === 3) {
    return (
      <div className="flex -mx-[1%]">
        <img
          src={images[0]}
          alt="post image 1"
          className="w-[48%] mx-[1%] h-auto"
        />
        <div className="flex flex-col w-[48%] mx-[1%] gap-3">
          <img
            src={images[1]}
            alt="post image 2"
            className="w-full h-[48%] object-cover"
          />
          <img
            src={images[2]}
            alt="post image 3"
            className="w-full h-[48%] object-cover"
          />
        </div>
      </div>
    );
  }

  if (images?.length > 3) {
    return (
      <div className="flex -mx-[1%] mt-3">
        <img
          src={images[0]}
          alt="post image 1"
          className="w-[48%] mx-[1%] h-auto"
        />
        <div className="flex flex-col w-[48%] mx-[1%] gap-3">
          <img src={images[1]} alt="post image 2" className="w-full h-[48%]" />
          <div className="relative w-full h-[48%]">
            <img src={images[2]} alt="post image 3" className="w-full h-full" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <span className="text-white text-3xl font-semibold">
                +{images.length - 3}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const PostCard = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [openPostUpdateModal, setOpenPostUpdateModal] = useState(false);
  const [openPostDeleteAlertModal, setOpenPostDeleteAlertModal] =
    useState(false);
  const [openPostShareModal, setOpenPostShareModal] = useState(false);

  return (
    <>
      <div className="py-5 border rounded-lg">
        <div className="px-5 flex gap-3">
          <img
            src={
              post?.user?.profile_image ||
              "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
            }
            alt={post?.user?.first_name}
            className="w-16 h-16 rounded-full bg-white"
          />
          <div className="w-full flex justify-between">
            <div>
              <NavLink
                to={`/profile/${post?.user?.id}`}
                className="text-md font-semibold hover:underline hover:text-blue-600 transition-all ease-in-out"
              >
                {post?.user?.first_name} {post?.user?.last_name}
              </NavLink>
              <p className="text-gray-500 text-xs">
                {post?.user?.about_me
                  ? post?.user?.about_me?.length > 80
                    ? post?.user?.about_me.slice(0, 80) + "..."
                    : post?.user?.about_me
                  : `About me`}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {moment(post?.created_at, "YYYYMMDD").fromNow()}
              </p>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis className="w-5 h-5 text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setOpenPostUpdateModal(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setOpenPostDeleteAlertModal(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="px-5 mt-3">
          {post?.content?.length > 200 ? (
            <>
              <p>
                {post?.content.slice(0, 200) + "... "}
                <span className="text-end text-gray-600 text-xs cursor-pointer">
                  show more
                </span>
              </p>
            </>
          ) : (
            <p>{post?.content}</p>
          )}
        </div>

        <NavLink
          to={`/posts/${post?.id}`}
          className="block mt-3 cursor-pointer hover:opacity-80 transition-all ease-in-out"
        >
          {renderImages(post?.images)}
        </NavLink>

        <div className="px-5 mt-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">
              {post?.likes?.length > 100 ? "100+" : post?.likes?.length} likes
            </p>
            <p className="text-sm text-gray-400">
              {post?.comments?.length > 100 ? "100+" : post?.comments?.length}{" "}
              comments
            </p>
          </div>
          <div className="border-t grid grid-cols-3 gap-x-5 pt-4">
            <p
              className={cn([
                "flex items-center justify-center gap-1 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md py-2 px-3 transition-all ease-in-out",
                post?.is_liked ? "text-blue-600" : "text-gray-500",
              ])}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Like
            </p>
            <p
              className="flex items-center justify-center gap-1 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md py-2 px-3 transition-all ease-in-out"
              onClick={() => setShowComment(!showComment)}
            >
              <MessageCircleMore className="w-4 h-4 mr-1" />
              Comment
            </p>
            <p
              className="flex items-center justify-center gap-1 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md py-2 px-3 transition-all ease-in-out"
              onClick={() => setOpenPostShareModal(true)}
            >
              <Send className="w-4 h-4 mr-1" />
              Share
            </p>
          </div>
        </div>

        {showComment && <CommentCard />}
      </div>

      <CreateOrUpdatePostModal
        type={"update"}
        open={openPostUpdateModal}
        setOpen={setOpenPostUpdateModal}
      />
      <AlertModal
        open={openPostDeleteAlertModal}
        setOpen={setOpenPostDeleteAlertModal}
      />
      <ShareModal open={openPostShareModal} setOpen={setOpenPostShareModal} />
    </>
  );
};

export default PostCard;
