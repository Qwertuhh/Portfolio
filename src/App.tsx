import type { JSX } from "react";
import HeroComponent from "@/components/hero-component";
import Navbar from "@/components/navbar";
import AboutMe from "@/components/about-me";
import Projects from "@/components/projects";
import LenisSmoothScroll from "@/components/ui/lenis-smooth-scroll";

function App(): JSX.Element {
  return (
    <div>
      <LenisSmoothScroll />
      <Navbar />
      <HeroComponent />
      <AboutMe />
      <Projects />
    </div>
  );
}

export default App;
