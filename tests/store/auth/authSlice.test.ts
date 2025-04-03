import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { state, state1 } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("Pruebas en authSlice", () => {
    test("debe de regresar el estado por defecto", () => {

        const stateF = authSlice.getInitialState();
        expect(state).toEqual(stateF);
    }
    );

    test("debe de realizar el login", () => {

        const state1 = authSlice.reducer(state, onLogin(testUserCredentials));

        expect(state1).toEqual({
            status: "authenticated",
            user: testUserCredentials,
            errorMessage: undefined,
        });
        
    })

    test("debe de realizar el logout", () => {

        const state3 = authSlice.reducer(state1, onLogout("Credenciales no validas"));

        expect(state3).toEqual({
            status: "not-authenticated",
            user: { name: "", uid: "" },
            errorMessage: "Credenciales no validas",
        });
    }
    );

    test("debe de limpiar el errorMessage", () => {

        const errorMessage = "Credenciales no validas";
        const state = authSlice.reducer(state1, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearErrorMessage());

        expect(newState.errorMessage).toBe(undefined)

    })

})