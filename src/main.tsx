import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CalendarApp } from "./CalendarApp";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CalendarApp />
    </BrowserRouter>
  </React.StrictMode>
);
