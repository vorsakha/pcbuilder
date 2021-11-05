import { createSlice } from "@reduxjs/toolkit";
import { loadUser, logUser } from "./thunk";

interface AuthTypes {
  token: string | null;
  user: string | null;
  admin: boolean | null;
  loggedIn: boolean;
  loading: boolean;
  alert: {
    type: string | null;
    msg: string | null;
  };
}

const checkTokenAvailability = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(`token`);
  } else {
    return null;
  }
};

const slice = createSlice({
  name: "auth",
  initialState: {
    token: checkTokenAvailability(),
    user: null,
    admin: null,
    loggedIn: false,
    loading: false,
    alert: {
      type: null,
      msg: null,
    },
  } as AuthTypes,

  reducers: {
    logOut: (state) => {
      state.loggedIn = false;
      state.loading = false;
      state.token = null;
      localStorage !== undefined && localStorage.removeItem("token");
      state.user = null;
      state.admin = null;
      state.alert = {
        type: null,
        msg: null,
      };
    },
    clearAuthAlert: (state) => {
      state.alert = {
        type: null,
        msg: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logUser.fulfilled, (state, action) => {
        localStorage !== undefined &&
          localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.admin = action.payload.admin;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(logUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logUser.rejected, (state) => {
        state.loggedIn = false;
        state.loading = false;
        state.user = null;
        state.alert = {
          type: "DANGER",
          msg: "Invalid Credentials",
        };
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.admin = action.payload.admin;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loggedIn = false;
        state.loading = false;
      });
  },
});

export default slice.reducer;

export const { logOut, clearAuthAlert } = slice.actions;
