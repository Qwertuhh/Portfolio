/**
 * Copyright (c) 2025 Arihant Jain, Qwertuhh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Gift } from "lucide-react";
import Tooltip from "@/components/ui/tool-tip";
import Experience from "@/assets/experience.svg";
import SkillSet from "@/components/skillset";
import HoverScrambleSwap from "./ui/hover-scramble-text";
import useSFX from "@/hooks/useSFX";

function AboutMe() {
  const hoverBirthday = useSFX("hover", "birthday");
  const hoverExperience = useSFX("hover", "experience");

  const experienceYear = new Date().getFullYear() - 2022;
  return (
    <div
      id="about-me"
      className="bg-linear-to-b from-(--bg-primary) to-(--bg-secondary) min-h-screen"
    >
      <div className="main-div max-w-4xl mx-auto py-8 px-4 w-(--main-width)">
        <div className="main-div">
          <HoverScrambleSwap
            text="The satisfaction of solving a problem is the true reward of programming -__  Programs must be written for people to read, and only incidentally for machines to execute."
            className="bricolage-grotesque-regular text-xl text-justify"
          >
            <p className="bricolage-grotesque-regular text-xl my-4 text-justify">
              I love solving problems. Programming feels like my superpower. I
              chose this path because it gives meaning to my life. I can&apos;t
              solve everyone&apos;s problems, but I always try my best—and that
              effort matters. Through my work, I find stability, purpose, and
              happiness. When I solve problems for others, I feel connected to
              them, and in that connection, I feel connected to life itself.
            </p>
          </HoverScrambleSwap>
        </div>
        <SkillSet />
        <div className="flex fira-code-regular flex-row space-around w-full justify-between my-4">
          <Tooltip
            label={`Birthday, ${new Date().getFullYear() - 2010} year's old`}
          >
            <h2
              className="flex flex-row gap-2 cursor-pointer"
              onMouseEnter={hoverBirthday}
            >
              <Gift className="w-6 h-6" />{" "}
              <span className="font-bold text-xm item-centerm">
                1st January, 2010
              </span>
            </h2>
          </Tooltip>
          <Tooltip label={`${experienceYear}+ Experiece`}>
            <h2
              className="flex flex-row gap-2 cursor-pointer"
              onMouseEnter={hoverExperience}
            >
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
