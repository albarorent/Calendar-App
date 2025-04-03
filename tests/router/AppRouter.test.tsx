import { AppRouter } from "../../src/router/AppRouter";
import React from "react";
import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { MemoryRouter } from "react-router-dom";
jest.mock("../../src/hooks/useAuthStore");

const mockCheckAuthToken = jest.fn();

describe("Pruebas en <AppRouter />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrar la pantalla de carga y llamar el checkAuthToken", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });
    render(<AppRouter />);
    expect(screen.getByText("Cargando...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("debe de mostrar el login si no está autenticado", () => {

    (useAuthStore as jest.Mock).mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });
    const { container } = render(<MemoryRouter><AppRouter /></MemoryRouter>);
    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  }
  );
});
