/* eslint-disable react/prop-types */

import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";

const FileUpload = ({
  multiple = false,
  className,
  setInputFiles,
  uploadedImages,
  setUploadedImages,
  ...props
}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const onChangeHandler = (e) => {
    setFiles(e.target.files);
    setInputFiles(Array.from(e.target.files));
  };

  const removeImgHandler = (i) => {
    const images = Array.from(files).filter((_, index) => index !== i);

    setFiles(images);
    setInputFiles(images);
  };

  const removeUploadedImgHandler = (i) => {
    const images = uploadedImages.filter((_, index) => index !== i);

    setUploadedImages(images);
  };

  const uploadBtnHandler = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={onChangeHandler}
        multiple={multiple}
        className={`hidden ${className}`}
        {...props}
      />

      <div
        className="border-dashed border-2 border-gray-300 rounded-md p-4 cursor-pointer"
        onClick={uploadBtnHandler}
      >
        <p className="text-center text-sm text-gray-400">
          Click here to upload files
        </p>
      </div>

      {uploadedImages &&
        uploadedImages.map((image, i) => (
          <div key={i} className="relative group w-24 h-24 inline-block mr-3">
            <img
              src={image}
              alt={"post image"}
              className="border w-full h-full object-cover rounded-md"
            />
            <div
              className="absolute top-0 right-0 left-0 bottom-0 bg-gray-700/60 
                          rounded-md flex items-center justify-center text-white cursor-pointer
                          group-hover:opacity-100 opacity-0 transition-all ease-in-out"
              onClick={() => removeUploadedImgHandler(i)}
            >
              <Trash2 />
            </div>
          </div>
        ))}

      {files &&
        Array.from(files).map((file, i) => (
          <div key={i} className="relative group w-24 h-24 inline-block mr-3">
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="border w-full h-full object-cover rounded-md"
              />
            )}

            {file.type.startsWith("video/") && (
              <video
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="border w-full h-full object-cover rounded-md"
                autoPlay={false}
                muted={true}
                loop={false}
              />
            )}

            <div
              className="absolute top-0 right-0 left-0 bottom-0 bg-gray-700/60 
                          rounded-md flex items-center justify-center text-white cursor-pointer
                          group-hover:opacity-100 opacity-0 transition-all ease-in-out"
              onClick={() => removeImgHandler(i)}
            >
              <Trash2 />
            </div>
          </div>
        ))}
    </>
  );
};

export default FileUpload;
