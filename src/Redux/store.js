import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobSlice"
import applyReducer from "./applySlice"
import authReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    apply: applyReducer,
    auth: authReducer
  },
});
