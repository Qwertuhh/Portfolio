import type { JSX } from "react";
import HeroComponent from "@/components/hero-component";
import Content from "@/components/Content";

function App(): JSX.Element {
  
  return (
    <>
      <HeroComponent/>
      <Content/>
    </>
  );
}

export default App;
