import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import setAuthToken from "../setToken";
import { API_URL } from "../../constants";
import { BuildsInterface } from "../../interfaces";

export const loadBuilds = createAsyncThunk("builds/loadBuilds", async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    setAuthToken();
  }

  const fetchBuilds = await axios.get(`${API_URL}api/builds`);

  let builds: BuildsInterface[] = [];

  fetchBuilds.data.forEach((b: any) => {
    builds.push(b.build);
  });

  return builds;
});

export const createBuild = createAsyncThunk(
  "builds/createBuild",
  async (body) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      setAuthToken();
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const fetchBuilds = await axios.post(`${API_URL}api/builds`);

    let builds: BuildsInterface[] = [];

    fetchBuilds.data.forEach((b: any) => {
      builds.push(b.build);
    });

    return builds;
  }
);

export const deleteBuild = createAsyncThunk(
  "builds/deleteBuild",
  async (id) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      setAuthToken();
    }

    const res = await axios.delete(`${API_URL}api/builds/${id}`);

    let builds: BuildsInterface[] = [];

    res.data.forEach((b: any) => {
      builds.push(b.build);
    });

    return builds;
  }
);
