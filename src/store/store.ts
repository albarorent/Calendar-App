import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

export const store = configureStore({
    reducer: {
      calendar:calendarSlice.reducer,
      ui: uiSlice.reducer,
    },
  });
  
  // Define RootState and AppDispatch types
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;