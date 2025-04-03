import { calendarSlice, onLoadEvents, onSetActiveEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe("Pruebas en el slice de calendarSlice", () => {

    test("debe de regresar el estado inicial", () => {

        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);

    })

    test("onSetActiveEvent debe activar el evento", () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
     

    }
    )

    test("onAddNewEvent debe agregar un nuevo evento", () => {


        const newEvent = {
            id: "3",
            title: "Cumpleaños de Fernando",
            notes: "Comprar el pastel",
            start: new Date("2023-10-12 13:00:00"),
            end: new Date("2023-10-12 15:00:00"),
        }

        const state = calendarSlice.reducer(calendarWithEventsState, calendarSlice.actions.onAddNewEvent(newEvent));
        // expect(state.events).toEqual([...events, newEvent]);
        expect(state.events).toContain(newEvent);
    }
    )

    test("onDeleteEvent debe eliminar el evento activo", () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, calendarSlice.actions.onDeleteEvent());
        
        expect(state.events).not.toContain(events[0]);
        expect(state.activeEvent).toBe(null);
    }
    )

    test("onLoadEvents debe cargar los eventos", () => {

        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);
    }
    )

    test("onLogoutCalendar debe limpiar el estado", () => {
        const state = calendarSlice.reducer(calendarWithEventsState, calendarSlice.actions.onLogoutCalendar());
        
        expect(state).toEqual(initialState);
    }
    )

})