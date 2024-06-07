/* eslint-disable react/prop-types */

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
import { Edit, Ellipsis, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateCommentModal from "@/components/Posts/Comment/Update";
import AlertModal from "@/components/AlertModal";
import useCreatePostComment from "@/api/posts/comments/Create";
import moment from "moment";
import useDeletePostComment from "@/api/posts/comments/Delete";

const CommentCard = ({ comments, postId, setReFetch }) => {
  const authUser = useSelector((state) => state.authUser);
  const {
    data: dataDelete,
    deletePostCommentReq,
    isLoading: isLoadingDelete,
  } = useDeletePostComment();
  const { createPostCommentReq, data, isLoading } = useCreatePostComment();

  const [showMore, setShowMore] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [filteredComments, setFilteredComments] = useState(
    comments?.length > 2 ? comments?.slice(0, 2) : comments
  );
  const [openCommentUpdateModal, setOpenCommentUpdateModal] = useState(false);
  const [openCommentDeleteAlertModal, setOpenCommentDeleteAlertModal] =
    useState(false);
  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    createPostCommentReq({ comment }, postId);
  };

  useEffect(() => {
    if (data || dataDelete) {
      setComment("");
      setReFetch(true);
    }
  }, [data, dataDelete]);

  return (
    <>
      <div className="px-5 mt-3">
        <div className="bg-gray-50 p-5 rounded-md">
          <div className="flex gap-3 items-center mb-5">
            <img
              src={
                authUser?.profile_image ||
                "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
              }
              alt={authUser?.first_name}
              className="w-12 h-12 rounded-full bg-white"
            />

            <form
              onSubmit={submitHandler}
              className="w-full flex bg-white rounded-3xl"
            >
              <Input
                name="comment"
                value={comment}
                placeholder="Write a comment..."
                className="h-12 rounded-3xl border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="h-12 rounded-3xl" disabled={isLoading}>
                Comment
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
            </form>
          </div>

          {filteredComments?.length > 0 ? (
            filteredComments?.map((comment, i) => (
              <div key={i} className="mt-2">
                <div className="flex gap-3 border p-3 rounded-lg">
                  <img
                    src={
                      comment?.user?.profile_image ||
                      "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                    }
                    alt={comment?.user?.first_name}
                    className="w-12 h-12 rounded-full bg-white"
                  />
                  <div className="w-full">
                    <div className="flex justify-between">
                      <div>
                        <NavLink
                          to={`/profile/${comment?.user?.id}`}
                          className="text-md font-semibold hover:underline hover:text-blue-600 transition-all ease-in-out"
                        >
                          {comment?.user?.first_name} {comment?.user?.last_name}{" "}
                        </NavLink>
                        <p className="text-gray-500 text-xs">
                          {comment?.user?.about_me
                            ? comment?.user?.about_me?.length > 80
                              ? comment?.user?.about_me.slice(0, 80) + "..."
                              : comment?.user?.about_me
                            : `About me`}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <p className="text-gray-500 text-xs mt-1">
                          {moment(comment?.created_at).fromNow() ===
                          moment(comment?.updated_at).fromNow()
                            ? moment(comment?.created_at).fromNow()
                            : moment(comment?.updated_at).fromNow() +
                              " (updated)"}
                        </p>
                        {authUser?.id === comment?.user_id && (
                          <DropdownMenu>
                            <DropdownMenuTrigger className="h-7">
                              <Ellipsis className="w-5 h-5 text-gray-500" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  setOpenCommentUpdateModal(true);
                                  setSelectedComment(comment?.id);
                                }}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  setOpenCommentDeleteAlertModal(true);
                                  setSelectedComment(comment?.id);
                                }}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-400 mt-3">
              no comments yet
            </p>
          )}

          {comments?.length > 2 &&
            (showMore ? (
              <span
                className="block text-end text-gray-600 text-xs cursor-pointer mt-2"
                onClick={() => {
                  setShowMore(false);
                  setFilteredComments(comments?.slice(0, 2));
                }}
              >
                show less
              </span>
            ) : (
              <span
                className="block text-end text-gray-600 text-xs cursor-pointer mt-2"
                onClick={() => {
                  setShowMore(true);
                  setFilteredComments(comments);
                }}
              >
                (showing 2 of {comments?.length}) show more
              </span>
            ))}
        </div>
      </div>

      <UpdateCommentModal
        id={selectedComment}
        setReFetch={setReFetch}
        open={openCommentUpdateModal}
        setOpen={setOpenCommentUpdateModal}
      />
      <AlertModal
        open={openCommentDeleteAlertModal}
        setOpen={setOpenCommentDeleteAlertModal}
        isLoading={isLoadingDelete}
        deleteHandler={() => deletePostCommentReq(selectedComment)}
      />
    </>
  );
};

export default CommentCard;
