import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "../setToken";
import { API_URL } from "../../constants";
import { LoginTypes } from "../../interfaces";

export const loadUser = createAsyncThunk("auth/loadUser", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    setAuthToken();
  }

  const res = await axios.get(`${API_URL}api/user/load`);

  return res.data;
});

export const logUser = createAsyncThunk(
  "auth/logUser",
  async (body: LoginTypes) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`${API_URL}api/user/auth`, body, config);

    return res.data;
  }
);
