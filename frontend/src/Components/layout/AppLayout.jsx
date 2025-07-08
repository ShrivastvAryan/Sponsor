import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import ScrollToTop from "../../ScrollToTop";

export const AppLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
