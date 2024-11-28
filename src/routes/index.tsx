import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from '../App.tsx'
import { Login } from "../pages/login/index.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);