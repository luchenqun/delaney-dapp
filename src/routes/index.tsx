import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login/index.tsx";
import { Home } from "../pages/index/home.tsx";
import { IndexLayout } from "../components/layout/index.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <IndexLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  }
]);