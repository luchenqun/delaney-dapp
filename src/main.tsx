import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { calculateFontSize } from "./utils/rem";

const App = () => {
  useEffect(() => {
    calculateFontSize();

    window.addEventListener("resize", calculateFontSize);
  }, []);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
