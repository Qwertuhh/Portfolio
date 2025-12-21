import { Typewriter } from "@/components/ui/typewriter";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import clsx from "clsx";

const profileIcons =
  "w-16 rounded-[50px] p-1 border-2 border-solid border-black";
function HeroComponent() {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <div className="w-[var(--main-width)] p-2">
        {/* <DottedGlowBackground className="opacity-8" /> */}
        <div className="flex flex-row gap-1 items-left">
          <img
            src="./profile-image/qwertuhh.svg"
            alt="qwertuhh"
            className={clsx(profileIcons)}
          />
          <img
            src="./profile-image/arihant_jain.png"
            alt="arihant"
            className={clsx(profileIcons)}
          />
        </div>
        <div className="flex flex-col">
          <Typewriter speed={0.06}>
            <h1 className="text-6xl funnel-display-regular backdrop-blur-lg border-0 border-solid border-transparent">
              I'm Arihant Jain
            </h1>
          </Typewriter>
          <p className="muted funnel-display-regular">AKA Qwertuhh</p>
        </div>
        <div className="flex flex-col gap-4 my-12 text-justify">
          <p className="bricolage-grotesque-regular text-xl text-justify">
            An enthusiastic learner who is greatly interested in programming and
            Applied Artificial Intelligence. With a strong programming
            background.
          </p>
        </div>
      </div>
    </main>
  );
}

export default HeroComponent;
