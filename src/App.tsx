import type { JSX } from "react";
import { lazy, Suspense, useState } from "react";

import LazyLoader from "@/components/ui/loader";
import InteractionOverlay from "@/components/interaction-overlay";
const HeroComponent = lazy(() => import("@/components/hero-component"));
const Navbar = lazy(() => import("@/components/navbar"));
const AboutMe = lazy(() => import("@/components/about-me"));
const Projects = lazy(() => import("@/components/projects"));

function App(): JSX.Element {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleInteraction = () => {
    setHasInteracted(true);
  };

  return (
    <div>
      <InteractionOverlay onInteraction={handleInteraction} />

      {hasInteracted && (
        <>
          <Suspense fallback={<LazyLoader />}>
            <Navbar />
          </Suspense>
          <Suspense fallback={<LazyLoader />}>
            <HeroComponent />
          </Suspense>
          <Suspense fallback={<LazyLoader />}>
            <AboutMe />
          </Suspense>
          <Suspense fallback={<LazyLoader />}>
            <Projects />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;
