import { toast } from "sonner";
import { calendarApi } from "../api";
import { convertEventsToDayEvents } from "../helpers";
import {
  EventCalendar,
  GetCalendarCreateEvent,
  GetCalendarEvents,
} from "../interfaces/CalendarInterface";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const setActiveEvent = (calendarEvent: EventCalendar) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: EventCalendar) => {
    try {
      if (calendarEvent._id) {
        //Actualizando
        await calendarApi.put<GetCalendarCreateEvent>(
          `/events/${calendarEvent._id}`,
          calendarEvent
        );
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //Creando
      const { data } = await calendarApi.post<GetCalendarCreateEvent>(
        "/events",
        calendarEvent
      );
      console.log(data);

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event._id, user }));
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Error al guardar el evento");
    }
  };

  const startDeletingEvent = async () => {
    //DELETE /events/{id}
   try {
    if (!activeEvent) {
      toast.error("No hay evento activo para eliminar");
      return;
    }
    const res = await calendarApi.delete(`/events/${activeEvent._id}`);

    dispatch(onDeleteEvent());
    toast.success(res.data.msg);
   } catch (error:any) {
    toast.error(error.response?.data?.msg || "Error al eliminar el evento");
   }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get<GetCalendarEvents>("/events");
      const events = convertEventsToDayEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //* Métodos
    setActiveEvent,
    startLoadingEvents,
    startSavingEvent,
    startDeletingEvent,
  };
};
