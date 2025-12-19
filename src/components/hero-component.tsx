import { Typewriter } from "@/components/ui/typewriter";
import { DottedGlowBackground } from "./ui/dotted-glow-background";

function HeroComponent() {
  return (
    <main className="flex flex-row justify-center items-center h-screen">
      <DottedGlowBackground className="opacity-8" />
      <Typewriter speed={0.06}>
        <h1 className="text-8xl funnel-display-regular backdrop-blur-lg border-0 border-solid border-transparent">
          Hello World
        </h1>
      </Typewriter>
    </main>
  );
}

export default HeroComponent;
