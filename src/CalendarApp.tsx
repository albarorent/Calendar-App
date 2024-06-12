import { Toaster } from "sonner";
import { AppRouter } from "./router";

export const CalendarApp = () => {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
};
