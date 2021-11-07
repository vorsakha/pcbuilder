import { createSlice } from "@reduxjs/toolkit";
import { BuildsInterface } from "../../interfaces";
import { loadBuilds, createBuild, deleteBuild } from "./thunk";

interface BuildsTypes {
  builds: BuildsInterface[] | null;
  loading: boolean;
  alert: {
    type: string | null;
    msg: string | null;
  };
}

const slice = createSlice({
  name: "builds",
  initialState: {
    builds: null,
    loading: false,
    alert: {
      type: null,
      msg: null,
    },
  } as BuildsTypes,

  reducers: {
    clearBuilds: (state) => {
      state.loading = false;
      state.builds = null;
    },
    clearBuildsAlert: (state) => {
      state.alert = {
        type: null,
        msg: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadBuilds.fulfilled, (state, action) => {
        state.builds = action.payload;
        state.loading = false;
      })
      .addCase(loadBuilds.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadBuilds.rejected, (state) => {
        state.loading = false;
        state.alert = {
          type: "DANGER",
          msg: "Failed loading builds.",
        };
      })
      .addCase(createBuild.fulfilled, (state) => {
        state.loading = false;
        state.alert = {
          type: "SUCCESS",
          msg: "Build saved.",
        };
      })
      .addCase(createBuild.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBuild.rejected, (state) => {
        state.loading = false;
        state.alert = {
          type: "DANGER",
          msg: "Failed creating build.",
        };
      })
      .addCase(deleteBuild.fulfilled, (state, action) => {
        state.builds = action.payload;
        state.loading = false;
        state.alert = {
          type: "SUCCESS",
          msg: "Build deleted.",
        };
      })
      .addCase(deleteBuild.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBuild.rejected, (state) => {
        state.loading = false;
        state.alert = {
          type: "DANGER",
          msg: "Failed deleting build.",
        };
      });
  },
});

export default slice.reducer;

export const { clearBuilds, clearBuildsAlert } = slice.actions;
