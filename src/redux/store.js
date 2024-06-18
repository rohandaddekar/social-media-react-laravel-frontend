import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "@/redux/slices/user";
import onlineUsersReducer from "@/redux/slices/onlineUsers";
import chatUserReducer from "@/redux/slices/chatUser";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    onlineUsers: onlineUsersReducer,
    chatUser: chatUserReducer,
  },
});

export default store;
