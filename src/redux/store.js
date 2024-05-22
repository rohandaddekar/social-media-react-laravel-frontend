import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "@/redux/slices/user";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});

export default store;
