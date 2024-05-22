import { createBrowserRouter } from "react-router-dom";

import WithHeaderAndFooter from "@/layouts/WithHeaderAndFooter";
import AuthWithoutHeaderAndFooter from "@/layouts/Auth/WithoutHeaderAndFooter";

import Home from "@/pages/Home";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Error404 from "@/pages/errors/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WithHeaderAndFooter />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthWithoutHeaderAndFooter />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);

export default router;
