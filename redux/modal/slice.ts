import { createSlice } from "@reduxjs/toolkit";

interface ModalInterface {
  showModal: boolean;
}

const slice = createSlice({
  name: "modal",
  initialState: {
    showModal: false,
  } as ModalInterface,

  reducers: {
    openModal: (state) => {
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
    },
  },
});

export default slice.reducer;

export const { openModal, closeModal } = slice.actions;
