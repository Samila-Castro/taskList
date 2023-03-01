import { createSlice, configureStore } from "@reduxjs/toolkit";
import projectSlicer from "./projectSlicer";

const store = configureStore({
  reducer: {
    projects: projectSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
