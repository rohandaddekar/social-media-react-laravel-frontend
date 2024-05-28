/* eslint-disable react/prop-types */

import { Dialog, DialogContent } from "@/components/ui/dialog";
import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import { Button } from "../ui/button";

const CreateStoryModal = ({ open, setOpen }) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploadedMedia, setUploadedMedia] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("mediaFiles: ", mediaFiles);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <h1 className="font-semibold text-lg">Add New Story</h1>

        <form
          onSubmit={submitHandler}
          className="grid gap-4 py-4 border-t pt-5"
        >
          <div className="space-y-2">
            <FileUpload
              multiple
              name="stories"
              accept="image/*,video/*"
              className="mb-2"
              setInputFiles={setMediaFiles}
              uploadedImages={uploadedMedia}
              setUploadedImages={setUploadedMedia}
            />
          </div>
          <div className="space-y-2">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStoryModal;
