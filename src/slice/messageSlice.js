import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "toast",
  initialState: {
    show: false,
    message: "test",
    bg: "primary",
  },
  reducers: {
    showToast: (state, action) => {
      state.show = true;
      state.message = action.payload.message;
      state.bg = action.payload.bg || "primary";
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
});
export default messageSlice.reducer;
export const { showToast, hideToast } = messageSlice.actions;
