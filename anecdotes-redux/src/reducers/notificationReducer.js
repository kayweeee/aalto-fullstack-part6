import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayMessage(state, action) {
      return (state = action.payload);
    },
    removeMessage(state) {
      state = "";
      return state;
    },
  },
});

export const { displayMessage, removeMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
