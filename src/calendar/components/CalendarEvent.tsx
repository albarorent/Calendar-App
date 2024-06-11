import { memo } from "react";
import { eventCalendar } from "../../interfaces/CalendarInterface";

export const CalendarEvent = memo(({ event }: { event: eventCalendar }) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
});
