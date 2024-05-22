import { useSelector } from "react-redux";

const useAuthHeaders = () => {
  const { token } = useSelector((state) => state.authUser);

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export default useAuthHeaders;
