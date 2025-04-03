import React, { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { authSlice } from "../../src/store";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { state, state2 } from "../fixtures/authStates";
import { testUserCredentials, testUserCredentials2 } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en el hook useAuthStore", () => {
  test("debe de regresar el estado inicial", () => {
    const mockStore = getMockStore({
      ...state,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useAuthStore(), { wrapper });

    expect(result.current).toEqual({
      status: "checking",
      user: { name: "", uid: "" },
      errorMessage: undefined,
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startLogin debe de realizar el login correctamente", async () => {
    localStorage.clear();
    const mockStore = getMockStore({
      ...state2,
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });

    await act(async () => {
      await result.current.startLogin(
        testUserCredentials.email,
        testUserCredentials.password
      );
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: "Alvaro",
        uid: "667cf2f0b79cf69453b153ae",
      },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin debe de fallar la autenticacion", async () => {
    localStorage.clear();
    const mockStore = getMockStore({
      ...state2,
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStore}>{children}</Provider>
        );

    const { result } = renderHook(() => useAuthStore(), { wrapper });
    await act(async () => {
        await result.current.startLogin(
            testUserCredentials.email,
            "123456712"
        );
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
        errorMessage: "Password incorrecto",
        status: "not-authenticated",
        user: {
            name: "",
            uid: "",
        },
    });
    expect(localStorage.getItem("token")).toBe(null);
    expect(localStorage.getItem("token-init-date")).toBe(null);

   

  })

  test("startRegister debe de crear un usuario", async () => {
    localStorage.clear();
    const mockStore = getMockStore({
      ...state2,
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useAuthStore(), { wrapper });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue(
        Promise.resolve({
            data: {
                ok: true,
                uid: "67e9ac4e006c9ef59ad7d7f2",
                name: "Prueba",
                token: "ABC-123",
            },
        })
    );

    await act(async () => {
      await result.current.startRegister(
        testUserCredentials2.email,
        testUserCredentials2.password,
        testUserCredentials2.name
      );
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: {
        name: "Prueba",
        uid: "67e9ac4e006c9ef59ad7d7f2",
      },
    });

    spy.mockRestore();

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  }
  );

  test("startRegister debe de fallar la creacion", async () => {

    localStorage.clear();
    const mockStore = getMockStore({
      ...state2,
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useAuthStore(), { wrapper });

    

    await act(async () => {
      await result.current.startRegister(
        testUserCredentials.email,
        testUserCredentials.password,
        testUserCredentials.name
      );
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Un usuario ya existe con ese correo",
      status: "not-authenticated",
      user: {
        name: "",
        uid: "",
      },
    });


 

  })

  test("checkAuthToken debe de fallar si no hay token", async () => {

    localStorage.clear();
    const mockStore = getMockStore({
      ...state2,
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useAuthStore(), { wrapper });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Token no encontrado",
      status: "not-authenticated",
      user: {
        name: "",
        uid: "",
      },
    });
  })

  test("checkAuthToken debe de autenticar el usuario si hay token", async () => {
   const { data } = await calendarApi.post("/auth/login", {
        email: testUserCredentials.email,
        password: testUserCredentials.password,
      });     
    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({
      ...state2,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    const { result } = renderHook(() => useAuthStore(), { wrapper });
    await act(async () => {
        await result.current.checkAuthToken();
        })
    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
        errorMessage: undefined,
        status: "authenticated",
        user: {
            name: "Alvaro",
            uid: "667cf2f0b79cf69453b153ae",
        },
    });
    
  })

});
