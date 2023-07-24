import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routerConfig } from "./routes/route.config.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routerConfig} />
  </React.StrictMode>
);
