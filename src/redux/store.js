import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import themeSlice from "./reducers//themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
