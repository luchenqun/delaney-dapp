import { Outlet } from "react-router-dom";
import { Footer } from "./footer";

export const IndexLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};
