import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("authUser");
const initialState = storedUser
  ? JSON.parse(localStorage.getItem("authUser"))
  : null;

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(user));
      return user;
    },
    signOut: () => {
      localStorage.removeItem("authUser");
      return null;
    },
  },
});

export const { signIn, signOut } = authUserSlice.actions;

export default authUserSlice.reducer;
