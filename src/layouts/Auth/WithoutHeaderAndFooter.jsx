import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthWithoutHeaderAndFooter = () => {
  const authUser = useSelector((state) => state.authUser);

  if (authUser) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthWithoutHeaderAndFooter;
