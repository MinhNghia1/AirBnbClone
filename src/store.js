import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/AuthSlice/authSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default store;
