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

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(displayMessage(message));
    setTimeout(() => dispatch(removeMessage()), time);
  };
};

export default notificationSlice.reducer;
