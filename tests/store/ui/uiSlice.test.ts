import { uiSlice } from "../../../src/store/ui/uiSlice";
describe("Pruebas en uiSlice", () => {

    test("debe de regresar el estado por defecto", () => {
        const state = uiSlice.getInitialState();
        console.log(state);
        
     expect(state).toEqual({
            isDateModalOpen: false,
     } )
    }
    );

    test("debe de cambiar el isDateModalOpen", () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, uiSlice.actions.onOpenDateModal());
        console.log(state);
        expect(state.isDateModalOpen).toBeTruthy();
        state = uiSlice.reducer(state, uiSlice.actions.onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();

    }
    );

})