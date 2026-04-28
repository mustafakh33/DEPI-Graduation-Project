import { configureStore } from "@reduxjs/toolkit";

// TODO: Import your feature slices here
// import authReducer from "../features/auth/store/authSlice";

export const store = configureStore({
  reducer: {
    // auth: authReducer,
    _placeholder: (state = null) => state,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
