import { Gift } from "lucide-react";
import { NoisyBg } from "@/components/ui/noisy-bg";

function AboutMe() {
  return (
    <NoisyBg bgColor="bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]">
      <div className="flex flex-col justify-center items-center fira-code-regular max-w-4xl mx-auto h-screen w-(--main-width)">
        <div className="flex flex-col justify-center items-center ">
          <p className="jetbrains-mono-regular text-xl text-left">
            Welcome to my portfolio, where I showcase some of my best work and
            share my story as a developer. always looking for ways to improve my
            craft.
          </p>
          <p className="text-xl text-left">
            An enthusiastic learner who is greatly interested in programming and
            Applied Artificial Intelligence. With a strong programming
            background, I started my journey since <b>7th grade</b> to solve
            real-world problems.
          </p>
        </div>
        <h2 className="flex flex-row gap-2">
          <Gift /> <span className="font-bold">1st January, 2010</span>
        </h2>
        <img
          src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg"
          alt="snake game"
        />
      </div>
    </NoisyBg>
  );
}

export default AboutMe;
