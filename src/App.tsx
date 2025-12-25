import type { JSX } from "react";
import { lazy, Suspense } from "react";

import LazyLoader from "@/components/ui/loader";
const HeroComponent = lazy(() => import("@/components/hero-component"));
const Navbar = lazy(() => import("@/components/navbar"));
const AboutMe = lazy(() => import("@/components/about-me"));
const Projects = lazy(() => import("@/components/projects"));

function App(): JSX.Element {
  return (
    <div>
      <Suspense fallback={<div><LazyLoader /></div>}>
        <Navbar />
      </Suspense>
      <Suspense fallback={<div><LazyLoader /></div>}>
        <HeroComponent />
      </Suspense>
      <Suspense fallback={<div><LazyLoader /></div>}>
        <AboutMe />
      </Suspense>
      <Suspense fallback={<div><LazyLoader /></div>}>
        <Projects />
      </Suspense>
    </div>
  );
}

export default App;
