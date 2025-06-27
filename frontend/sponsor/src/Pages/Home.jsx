import { NavLink } from "react-router-dom";
import { HeroSection } from "../Components/Ui/HeroSection";
import { About } from "./About";

export const Home = () => {
  return (
    <>
      <HeroSection />
      <About />
    </>
  );
};
