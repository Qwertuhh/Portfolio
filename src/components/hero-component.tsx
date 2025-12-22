import { Typewriter } from "@/components/ui/typewriter";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import clsx from "clsx";
import Tooltip from "@/components/ui/tool-tip";
import { SocialLinks } from "@/components/social-links";

const profileIcons =
  "main-border-type cursor-pointer";
function HeroComponent() {
  return (
    <main className="flex flex-col justify-center items-center h-full">
      <div className="w-(--main-width) p-2">
        <DottedGlowBackground className="opacity-8" />
        <div className="flex flex-row gap-1 items-left">
          {/* <BounceTitleOfImage imageSrc="./profile-image/qwertuhh.svg" imageClassName={profileIcons}/> */}
          <Tooltip label="Qwertuhh" className="text-xl">
            
          <img
            src="./profile-image/qwertuhh.svg"
            alt="qwertuhh"
            className={clsx(profileIcons)}
          />
          </Tooltip>

          <Tooltip label="Arihant Jain" className="text-xl">
          <img
            src="./profile-image/arihant_jain.png"
            alt="arihant"
            className={clsx(profileIcons)}
            />
            </Tooltip>
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
        <SocialLinks/>
      </div>
    </main>
  );
}

export default HeroComponent;
