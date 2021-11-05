import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const signUp = createAsyncThunk("user/signUp", async (body: any) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const res = await axios.post(`${API_URL}api/user`, body, config);

  return res.data;
});

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (id) => {
    const res = await axios.delete(`${API_URL}api/user/${id}`);

    return res.data;
  }
);
