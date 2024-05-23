import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fileUploadReq = async (files) => {
    setIsLoading(true);
    const uploadUrl = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_URL;
    const uploadPreset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;

    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);

        return axios.post(uploadUrl, formData);
      });

      const responses = await Promise.all(uploadPromises);
      setData(responses);
      toast.success("All files uploaded successfully");
      console.log("responses", responses);
    } catch (error) {
      setError(error);
      toast.error("Failed to upload file");
      console.log("error in uploading file", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, fileUploadReq };
};

export default useFileUpload;
