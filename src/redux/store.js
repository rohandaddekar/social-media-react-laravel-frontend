import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "@/redux/slices/user";
import onlineUsersReducer from "@/redux/slices/onlineUsers";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    onlineUsers: onlineUsersReducer,
  },
});

export default store;
