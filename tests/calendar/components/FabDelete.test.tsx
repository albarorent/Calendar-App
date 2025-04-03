import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FadDelete";
import { useCalendarStore } from "../../../src/hooks";

jest.mock("../../../src/hooks");

const mockStartDeletingEvent = jest.fn();

describe("Pruebas en <FabDelete />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrar el componente correctamente", () => {
    (useCalendarStore as jest.Mock).mockReturnValue({
      hasEventSelected: false,
    });

    render(<FabDelete />);
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
  });
});

test("debe de mostrar el boton si hay un evento activo", () => {
  (useCalendarStore as jest.Mock).mockReturnValue({
    hasEventSelected: true,
  });

  render(<FabDelete />);

  const btn = screen.getByLabelText("btn-delete");

  expect(btn.style.display).toBe("");
});

test("debe de llamar startDeletingEvent si hay un evento activo", () => {
  (useCalendarStore as jest.Mock).mockReturnValue({
    hasEventSelected: true,
    startDeletingEvent: mockStartDeletingEvent,
  });

  render(<FabDelete />);

  const btn = screen.getByLabelText("btn-delete");
  fireEvent.click(btn);

  expect(mockStartDeletingEvent).toHaveBeenCalled();
});
