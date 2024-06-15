import { createSlice } from "@reduxjs/toolkit";

const storedOnlineUsers = localStorage.getItem("onlineUsers");

const initialState = storedOnlineUsers
  ? JSON.parse(localStorage.getItem("onlineUsers"))
  : null;

export const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      const onlineUsers = action.payload;
      localStorage.setItem("onlineUsers", JSON.stringify(onlineUsers));
      return onlineUsers;
    },
    addOnlineUser: (state, action) => {
      const onlineUser = action.payload;
      localStorage.setItem(
        "onlineUsers",
        JSON.stringify([...state, onlineUser])
      );
      return [...state, onlineUser];
    },
    removeOnlineUser: (state, action) => {
      const onlineUser = action.payload;
      localStorage.setItem(
        "onlineUsers",
        JSON.stringify(state.filter((user) => user.id !== onlineUser.id))
      );
      return state.filter((user) => user.id !== onlineUser.id);
    },
    removeAllOnlineUsers: () => {
      localStorage.removeItem("onlineUsers");
      return null;
    },
  },
});

export const {
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  removeAllOnlineUsers,
} = onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;
