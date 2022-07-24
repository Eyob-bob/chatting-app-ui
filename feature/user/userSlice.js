import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:
    typeof window !== "undefined"
      ? localStorage.getItem("token") || null
      : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.value = localStorage.getItem("token") || null;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
