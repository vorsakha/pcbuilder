import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants";

export const signUp = createAsyncThunk("user/signUp", async (body: any) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post(`${API_URL}api/user`, body, config);

    return res.data;
  } catch (error: any) {
    console.error(error.message);

    return;
  }
});

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async (id) => {
    try {
      const res = await axios.delete(`${API_URL}api/user/${id}`);

      return res.data;
    } catch (error: any) {
      console.error(error.message);

      return;
    }
  }
);
