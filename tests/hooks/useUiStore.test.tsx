import { act, renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks";
import { uiSlice } from "../../src/store";
import { Provider } from "react-redux";
import React, { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";

const getMockStore = (initialState: any) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Pruebas en el hook useUiStore", () => {
  test("debe de regresar el estado inicial", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useUiStore(), { wrapper });

    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  test("OpenModal debe de colocar el isDateModalOpen en true", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useUiStore(), { wrapper });

    const { openDateModal, isDateModalOpen } = result.current;

    act(() => {
      openDateModal();
    });
    
    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test("CloseModal debe de colocar el isDateModalOpen en false", () => {

    const mockStore = getMockStore({
      isDateModalOpen: true,
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    const { result } = renderHook(() => useUiStore(), { wrapper });

    const { closeDateModal, isDateModalOpen } = result.current;

    act(() => {
      closeDateModal();
    });
    
    expect(result.current.isDateModalOpen).toBeFalsy();

  })

    test("ToggleModal debe de cambiar el estado del isDateModalOpen", () => {
        const mockStore = getMockStore({
        isDateModalOpen: true,
        });
    
        const wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={mockStore}>{children}</Provider>
        );
    
        const { result } = renderHook(() => useUiStore(), { wrapper });
    
    
        act(() => {
            result.current.toggleDateModal();
        });
        
        expect(result.current.isDateModalOpen).toBeFalsy();
    
        act(() => {
            result.current.toggleDateModal();
        });
        
        expect(result.current.isDateModalOpen).toBeTruthy();
    });
});
