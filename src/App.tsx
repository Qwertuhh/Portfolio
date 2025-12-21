import type { JSX } from "react";
import HeroComponent from "@/components/hero-component";
import Navbar from "@/components/navbar";
import AboutMe from "@/components/about-me";
import Projects from "@/components/projects";

function App(): JSX.Element {
  return (
    <div className=" h-[calc(100vh-var(--navbar-height))]">
      <Navbar/>
      <HeroComponent />
      <AboutMe/>
      <Projects/>
    </div>
  );
}

export default App;
