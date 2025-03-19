import { parseISO } from "date-fns";
import { Event } from "../interfaces/CalendarInterface";

export const convertEventsToDayEvents = (events: Event[]) => {
  return events.map((event) => ({
    ...event,
    start: parseISO(event.start),
    end: parseISO(event.end),
  }));
};
