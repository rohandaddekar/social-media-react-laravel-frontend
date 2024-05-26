import { useSelector } from "react-redux";

const useAuthHeaders = () => {
  const authUser = useSelector((state) => state?.authUser);

  return {
    headers: {
      Authorization: `Bearer ${authUser?.token}`,
    },
  };
};

export default useAuthHeaders;
