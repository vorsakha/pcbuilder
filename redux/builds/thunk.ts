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
    b.build.length !== 0 &&
      builds.push({
        build: b.build,
        id: b._id,
      });
  });

  return builds;
});

export const createBuild = createAsyncThunk(
  "builds/createBuild",
  async (body: BuildsInterface) => {
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

    const fetchBuilds = await axios.post(`${API_URL}api/builds`, body, config);

    let builds: BuildsInterface[] = [];

    fetchBuilds.data.forEach((b: any) => {
      builds.push({
        build: b.build,
        id: b._id,
      });
    });

    return builds;
  }
);

export const deleteBuild = createAsyncThunk(
  "builds/deleteBuild",
  async (id: string) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      setAuthToken();
    }

    const res = await axios.delete(`${API_URL}api/builds/${id}`);

    let builds: BuildsInterface[] = [];

    res.data.forEach((b: any) => {
      builds.push({
        build: b.build,
        id: b._id,
      });
    });

    return builds;
  }
);
