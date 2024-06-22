import { CSSProperties, useState } from "react";
import { Calendar, EventPropGetter, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from "../";
import { getMessageES, localizer } from "../../helpers";
import { eventCalendar } from "../../interfaces/CalendarInterface";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const [lastView, _setLastView] = useState<View | undefined>(
    (localStorage.getItem("lastView") as View) || undefined
  );
  const { openDateModal } = useUiStore();
  const { events } = useCalendarStore();

  const eventStyleGetter: EventPropGetter<eventCalendar> = (
    event
    // start,
    // end,
    // isSelected
  ) => {
    const style: CSSProperties = {
      backgroundColor: event.bgColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return { style };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event: eventCalendar) => {
    console.log({ doubleClick: event });
  };

  const onViewChanged = (view: View) => {
    localStorage.setItem("lastView", view);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessageES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
    </>
  );
};
