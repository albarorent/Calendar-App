import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";


const tempEvent = {
    title: "Cumpleaños",
    notes: "Hay que comprar",
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: "#347CF7",
    user: {
      _id: 123,
      name: "Alvaro",
    },
  }

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [
        tempEvent
    ],
    activeEvent:null
  },
  reducers: {
    increment: (state) => {
    },
  
  },
});
export const { increment } = calendarSlice.actions;
