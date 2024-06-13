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
import PostDetails from "@/pages/Post/Details";
import Profiles from "@/pages/Profiles";
import SingleProfile from "@/pages/Profiles/Single";
import Notifications from "@/pages/Notifications";
import Edit from "@/pages/Profiles/Edit";
import Chats from "@/pages/Chats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WithHeaderAndFooter />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/posts/:postId",
        element: <PostDetails />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
      {
        path: "/profiles/:userId",
        element: <SingleProfile />,
      },
      {
        path: "/profiles/edit",
        element: <Edit />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/chats",
        element: <Chats />,
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
