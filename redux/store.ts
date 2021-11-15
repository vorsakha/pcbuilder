import { configureStore, combineReducers } from "@reduxjs/toolkit";

import alert from "./alert/slice";
import auth from "./auth/slice";
import builds from "./builds/slice";
import user from "./user/slice";
import modal from "./modal/slice";

const reducer = combineReducers({
  alert,
  auth,
  builds,
  user,
  modal,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
