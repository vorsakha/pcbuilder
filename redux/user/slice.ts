import { createSlice } from "@reduxjs/toolkit";
import { deleteAccount, signUp } from "./thunk";

interface UserTypes {
  loading: boolean;
  alert: {
    type: string | null;
    msg: string | null;
  };
}

const slice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    alert: {
      type: null,
      msg: null,
    },
  } as UserTypes,

  reducers: {
    clearUserAlert: (state) => {
      state.alert = {
        type: null,
        msg: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
        state.alert = {
          type: "SUCCESS",
          msg: "Account created.",
        };
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
        state.alert = {
          type: "DANGER",
          msg: `Failed creating account.`,
        };
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = {
          type: "SUCCESS",
          msg: action.payload.msg,
        };
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.loading = false;
        state.alert = {
          type: "DANGER",
          msg: `Failed deleting account.`,
        };
      });
  },
});

export default slice.reducer;

export const { clearUserAlert } = slice.actions;
