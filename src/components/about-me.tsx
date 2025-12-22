import { Gift } from "lucide-react";
import ImageBg from "@/components/ui/image-bg";
import Tooltip from "@/components/ui/tool-tip";
import Experience from "@/assets/experience.svg";
import SkillSet from "@/components/skillset";

function AboutMe() {
  const experienceYear = new Date().getFullYear() - 2022;
  return (
    <ImageBg imageSrc="./noise.webp">
      <div className="main-div max-w-4xl mx-auto h-screen w-(--main-width)">
        <div className="main-div ">
          <p className="bricolage-grotesque-regular text-xl text-left">
            An enthusiastic learner who is greatly interested in programming and
            Applied Artificial Intelligence. With a strong programming
            background, I started my journey since <b>7th grade</b> to solve
            real-world problems.
          </p>
        </div>
        <img
          src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg"
          alt="snake game"
        />
        <div className="flex fira-code-regular flex-row space-around w-full justify-between my-4">
          <Tooltip
            label={`Birthday, ${new Date().getFullYear() - 2010} year's old`}
            className=""
          >
            <h2 className="flex flex-row gap-2 cursor-pointer">
              <Gift className="w-6 h-6" />{" "}
              <span className="font-bold text-xm item-centerm">
                1st January, 2010
              </span>
            </h2>
          </Tooltip>
          <Tooltip label={`${experienceYear}+ Experiece`} className="">
            <h2 className="flex flex-row gap-2 cursor-pointer">
              <img alt="experience svg" src={Experience} className="w-6 h-6" />
              <span className="font-bold text-xm item-center">
                {experienceYear}+
              </span>
            </h2>
          </Tooltip>
        </div>
        <SkillSet />
      </div>
    </ImageBg>
  );
}

export default AboutMe;
