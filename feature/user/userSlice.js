import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: typeof window !== "undefined" ? localStorage.getItem("token") : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.value =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
    },
    logout: (state) => {
      state.value =
        typeof window !== "undefined" ? localStorage.clear("token") : null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
