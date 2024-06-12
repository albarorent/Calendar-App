import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./";

export const store = configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
  });
  
  // Define RootState and AppDispatch types
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;