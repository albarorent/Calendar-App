import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import { EventCalendar } from "../../interfaces/CalendarInterface";

const tempEvent: EventCalendar = {
  _id: 123145464,
  title: "Cumpleaños",
  notes: "Hay que comprar pastel",
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: "#347CF7",
  user: {
    _id: 123,
    name: "Alvaro",
  },
};

interface InitialState {
  events: EventCalendar[];
  activeEvent: EventCalendar | null;
}

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: <InitialState>{
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, action: PayloadAction<EventCalendar | null>) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent?._id
        );
        state.activeEvent = null;
      }
    },
  },
});
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
