import { createSlice } from "@reduxjs/toolkit";

interface AlertInterface {
  show: boolean;
  type: string | null;
  msg: string | null;
}

const slice = createSlice({
  name: "alert",
  initialState: {
    show: false,
    type: null,
    msg: null,
  } as AlertInterface,

  reducers: {
    clearAlert: (state) => {
      state.show = false;
      state.type = null;
      state.msg = null;
    },
    generateAlert: (state, action) => {
      state.show = true;
      state.type = action.payload.type;
      state.msg = action.payload.msg;
    },
  },
});

export default slice.reducer;

export const { generateAlert, clearAlert } = slice.actions;
