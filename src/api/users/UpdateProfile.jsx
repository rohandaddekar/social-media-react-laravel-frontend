import { useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const useUserUpdateProfile = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const userUpdateProfileReq = async (payload) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/users/update-profile`, payload, {
        ...authHeaders,
        headers: {
          ...authHeaders.headers,
          "Content-Type": "multipart/form-data",
        },
      });
      setData(res?.data?.data);
      navigate("/");
      toast({
        title: res?.data?.message || "Profile updated successfully",
      });
    } catch (error) {
      console.log("failed to user update profile: ", error);
      setError(error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    setData,
    error,
    isLoading,
    userUpdateProfileReq,
  };
};

export default useUserUpdateProfile;
