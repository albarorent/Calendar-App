import { EventCalendar } from "../interfaces/CalendarInterface";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);

  const dispatch = useAppDispatch();
  const setActiveEvent = (calendarEvent: EventCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: EventCalendar) => {
    if (calendarEvent._id) {
      //Actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Métodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
