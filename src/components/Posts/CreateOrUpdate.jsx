/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import FileUpload from "@/components/FileUpload";
import useCreatePost from "@/api/posts/Create";
import { Loader2 } from "lucide-react";

const CreateOrUpdatePost = ({ type, btnTitle }) => {
  const { createPostReq, data, error, setError, isLoading } = useCreatePost();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    images.forEach((image) => {
      formData.append("images[]", image);
    });

    createPostReq(formData);
    console.log("formData : ", { content, images });
  };

  useEffect(() => {
    if (data) {
      setOpen(false);
    }
  }, [data]);

  useEffect(() => {
    if (!open) {
      setImages([]);
      setContent("");
      setError("");
    }
  }, [open, setError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={submitHandler}
          className="grid gap-4 py-4 border-t pt-5"
        >
          <div className="space-y-1.5">
            <Textarea
              placeholder="write here..."
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={error?.errors?.content?.[0]}
            />
          </div>
          <div className="space-y-1.5">
            <FileUpload
              multiple
              name="images"
              accept="image/*"
              className="mb-2"
              setInputFiles={setImages}
            />
          </div>
          <div className="space-y-1.5">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {type === "create" ? "Create" : "Update"} Post
              {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdatePost;
