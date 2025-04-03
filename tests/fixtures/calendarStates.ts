export const events = [
    {
        _id: 1,
        title: "Cumpleaños de Fernando",
        notes: "Comprar el pastel",
        start: new Date("2023-10-12 13:00:00"),
        end: new Date("2023-10-12 15:00:00"),
      

    },
    {
        _id: 2,
        title: "Cumpleaños de Alvaro",
        notes: "Comprar el pastel",
        start: new Date("2023-10-12 13:00:00"),
        end: new Date("2023-10-12 15:00:00"),
     

    },
]

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] },
}