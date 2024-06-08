/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import useShowPostComment from "@/api/posts/comments/Show";
import useUpdatePostComment from "@/api/posts/comments/Update";

const UpdateCommentModal = ({ open, setOpen, id }) => {
  const {
    data: dataShowComment,
    error: errorShowComment,
    isLoading: isLoadingShowComment,
    showPostCommentReq,
  } = useShowPostComment();
  const {
    data: dataUpdateComment,
    error: errorUpdateComment,
    isLoading: isLoadingUpdateComment,
    updatePostCommentReq,
  } = useUpdatePostComment();

  const [comment, setComment] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    updatePostCommentReq({ comment }, id);
  };

  useEffect(() => {
    if (id) {
      showPostCommentReq(id);
    }
  }, [id]);

  useEffect(() => {
    if (dataShowComment) {
      setComment(dataShowComment?.comment);
    }
  }, [dataShowComment]);

  useEffect(() => {
    if (dataUpdateComment) {
      setOpen(false);
    }
  }, [dataUpdateComment, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Comment</DialogTitle>
        </DialogHeader>
        {isLoadingShowComment ? (
          <p className="text-center text-sm mt-5 text-gray-600">loading...</p>
        ) : errorShowComment ? (
          <p className="text-center text-sm mt-5 text-gray-600">
            failed to fetch
          </p>
        ) : (
          <form
            onSubmit={submitHandler}
            className="grid gap-4 py-4 border-t pt-5"
          >
            <div className="space-y-1.5">
              <Input
                placeholder="write here..."
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                error={errorUpdateComment?.errors?.comment?.[0]}
              />
            </div>
            <div className="space-y-1.5">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoadingUpdateComment}
              >
                Update Comment
                {isLoadingUpdateComment && (
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCommentModal;
