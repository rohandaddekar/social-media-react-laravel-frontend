import { useCallback, useState } from "react";
import useAxios from "@/api/axiosInstance";
import useAuthHeaders from "@/api/authHeaders";
import toast from "react-hot-toast";

const useShowPostComment = () => {
  const axios = useAxios();
  const authHeaders = useAuthHeaders();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const showPostCommentReq = useCallback(
    async (id) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/posts/comments/${id}`, authHeaders);
        setData(res?.data?.data);
      } catch (error) {
        console.log("failed to fetch post comment: ", error);
        toast.error(
          error?.response?.data?.message || "Failed to fetch comment"
        );
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [axios, authHeaders]
  );

  const reFetchPostComment = useCallback(
    async (id) => {
      await showPostCommentReq(id);
    },
    [showPostCommentReq]
  );

  return { data, error, isLoading, showPostCommentReq, reFetchPostComment };
};

export default useShowPostComment;
