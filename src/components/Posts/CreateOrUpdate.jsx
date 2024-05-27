/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import FileUpload from "@/components/FileUpload";
import { Loader2 } from "lucide-react";
import DatePicker from "@/components/DatePicker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateOrUpdatePostModal = ({
  type,
  open,
  setOpen,
  postId,
  submitReq,
  submitData,
  submitError,
  submitSetError,
  submitIsLoading,
  showReq,
  showData,
  showError,
  showIsLoading,
  setReFetch,
}) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [publishOn, setPublishOn] = useState();
  const [minTime, setMinTime] = useState(new Date());
  const [uploadedImages, setUploadedImages] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    if (date.toDateString() === new Date().toDateString()) {
      setMinTime(new Date());
    } else {
      setMinTime(new Date(0, 0, 0, 0, 0));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("content", content);
    images?.forEach((image) => {
      formData.append("images[]", image);
    });
    if (publishOn === "later") {
      formData.append("publish_at", startDate.toISOString());
    }

    if (type === "update") {
      uploadedImages?.forEach((image) => {
        formData.append("old_images[]", image);
      });
    }

    if (type === "create") {
      submitReq(formData);
    } else if (type === "update") {
      submitReq(formData, postId);
    }
  };

  useEffect(() => {
    if (type === "update" && postId) {
      showReq(postId);
    }
  }, [postId, open]);

  useEffect(() => {
    if (type === "update" && postId && showData) {
      setContent(showData?.content);
      setUploadedImages(showData?.images);
    }
  }, [showData, type, postId]);

  useEffect(() => {
    if (submitData) {
      if (type === "update") {
        setReFetch(true);
        setOpen(false);
      }

      setOpen(false);
    }
  }, [submitData]);

  useEffect(() => {
    if (!open) {
      setImages([]);
      setContent("");
      submitSetError("");
    }
  }, [open, submitSetError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create New" : "Update"} Post
          </DialogTitle>
        </DialogHeader>
        {type === "update" && showIsLoading ? (
          <p className="text-center mt-5 text-gray-400">loading...</p>
        ) : showError ? (
          <p className="text-center mt-5 text-red-400">failed to load</p>
        ) : (
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
                error={submitError?.errors?.content?.[0]}
              />
            </div>
            <div className="space-y-1.5">
              <FileUpload
                multiple
                name="images"
                accept="image/*"
                className="mb-2"
                setInputFiles={setImages}
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
              />
            </div>
            <div>
              <Label className="text-sm font-normal mb-2">Publish On</Label>

              <Select value={publishOn} onValueChange={setPublishOn}>
                <SelectTrigger className="w-full mb-2">
                  <SelectValue placeholder="Now" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="now">Now</SelectItem>
                  <SelectItem value="later">Later</SelectItem>
                </SelectContent>
              </Select>

              {publishOn === "later" && (
                <DatePicker
                  startDate={startDate}
                  minTime={minTime}
                  handleDateChange={handleDateChange}
                />
              )}
            </div>
            <div className="space-y-1.5">
              <Button
                type="submit"
                className="w-full"
                disabled={submitIsLoading}
              >
                {type === "create" ? "Create" : "Update"} Post
                {submitIsLoading && (
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

export default CreateOrUpdatePostModal;
