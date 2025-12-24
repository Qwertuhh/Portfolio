import { Gift } from "lucide-react";
import Tooltip from "@/components/ui/tool-tip";
import Experience from "@/assets/experience.svg";
import SkillSet from "@/components/skillset";

function AboutMe() {
  const experienceYear = new Date().getFullYear() - 2022;
  return (
    <div
      id="about-me"
      className="bg-linear-to-b from-(--bg-primary) to-(--bg-secondary)"
    >
      <div className="main-div max-w-4xl mx-auto h-screen w-(--main-width)">
        <div className="main-div ">
          <p className="bricolage-grotesque-regular text-xl my-4 text-justify">
            I love solving problems. Programming feels like my superpower. I
            chose this path because it gives meaning to my life. I can&apos;t
            solve everyone&apos;s problems, but I always try my best—and that
            effort matters. Through my work, I find stability, purpose, and
            happiness. When I solve problems for others, I feel connected to
            them, and in that connection, I feel connected to life itself.
          </p>
        </div>
        <SkillSet />
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
      </div>
    </div>
  );
}

export default AboutMe;
