import { Gift } from "lucide-react";
import ImageBg from "@/components/ui/image-bg";

function AboutMe() {
  return (
    <ImageBg imageSrc="./noise.webp">
      <div className="main-div fira-code-regular max-w-4xl mx-auto h-screen w-(--main-width)">
        <div className="main-div ">
          <p className="bricolage-grotesque-regular text-xl text-left">
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
    </ImageBg>
  );
}

export default AboutMe;
