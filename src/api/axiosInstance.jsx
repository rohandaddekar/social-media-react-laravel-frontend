import axios from "axios";
import { signOut } from "@/redux/slices/user";
import { useDispatch } from "react-redux";

const useAxios = () => {
  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      if (err.response && err.response.status === 401) {
        dispatch(signOut());
      }

      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxios;
