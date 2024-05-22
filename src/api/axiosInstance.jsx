import axios from "axios";

const useAxios = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default useAxios;
