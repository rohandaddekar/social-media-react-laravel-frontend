/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import useCreatePost from "@/api/posts/Create";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const UpdateCommentModal = ({ open, setOpen }) => {
  const { createPostReq, data, error, setError, isLoading } = useCreatePost();

  const [comment, setComment] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("formData : ", { comment });
  };

  useEffect(() => {
    if (data) {
      setOpen(false);
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      setComment("");
      setError("");
    }
  }, [open, setError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Comment</DialogTitle>
        </DialogHeader>
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
              error={error?.errors?.comment?.[0]}
            />
          </div>
          <div className="space-y-1.5">
            <Button type="submit" className="w-full" disabled={isLoading}>
              Update Comment
              {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCommentModal;
