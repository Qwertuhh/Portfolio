import type { JSX } from "react";
import HeroComponent from "@/components/hero-component";
import Content from "@/components/Content";
import Navbar from "@/components/navbar";

function App(): JSX.Element {
  return (
    <div className=" h-[calc(100vh-var(--navbar-height))]">
      <Navbar />
      <HeroComponent />
    </div>
  );
}

export default App;
