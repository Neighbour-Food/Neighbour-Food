import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import accordionReducer from "./accordion/accordionSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    accordion: accordionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;