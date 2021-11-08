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

  try {
    const fetchBuilds = await axios.get(`${API_URL}api/builds`);

    let builds: BuildsInterface[] = [];

    fetchBuilds.data.forEach((b: any) => {
      b.build.length !== 0 &&
        builds.push({
          name: b.name,
          build: b.build,
          id: b._id,
        });
    });

    return builds;
  } catch (error: any) {
    console.error(error.message);

    return null;
  }
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

    try {
      const fetchBuilds = await axios.post(
        `${API_URL}api/builds`,
        body,
        config
      );

      let builds: BuildsInterface[] = [];

      fetchBuilds.data.forEach((b: any) => {
        builds.push({
          name: b.name,
          build: b.build,
          id: b._id,
        });
      });

      return builds;
    } catch (error: any) {
      console.error(error.message);

      return null;
    }
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

    try {
      const res = await axios.delete(`${API_URL}api/builds/${id}`);

      let builds: BuildsInterface[] = [];

      res.data.builds.forEach((b: any) => {
        builds.push({
          name: b.name,
          build: b.build,
          id: b._id,
        });
      });

      return builds;
    } catch (error: any) {
      console.error(error.message);

      return null;
    }
  }
);
