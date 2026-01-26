import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./jobSlice"
import applyReducer from "./applySlice"

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    apply:applyReducer
  },
});
