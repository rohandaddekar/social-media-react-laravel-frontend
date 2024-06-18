import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const chatUserSlice = createSlice({
  name: "chatUser",
  initialState,
  reducers: {
    setChatUser(state, action) {
      return action.payload;
    },
    removeChatUser() {
      return null;
    },
  },
});

export const { setChatUser, removeChatUser } = chatUserSlice.actions;

export default chatUserSlice.reducer;
