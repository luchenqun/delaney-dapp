import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/index.tsx";
import { Home } from "../pages/index/home.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);