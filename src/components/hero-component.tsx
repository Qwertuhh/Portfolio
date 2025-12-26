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

import { lazy, Suspense } from "react";
import clsx from "clsx";
import { Typewriter } from "@/components/ui/typewriter";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import Tooltip from "@/components/ui/tool-tip";
const SocialLinks = lazy(() => import("@/components/social-links"));
import LazyLoader from "@/components/ui/loader";
import HoverScrambleText from "@/components/ui/hover-scramble-text";
import useSFX from "@/hooks/useSFX";

const profileIcons = "main-border-type cursor-pointer";
function HeroComponent() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      
      <div className="w-(--main-width) p-2">
        <DottedGlowBackground className="opacity-8" />
        <div className="flex flex-row gap-1 items-left">
          <Tooltip label="Qwertuhh" className="text-xl">
            <img
              src="./profile-image/qwertuhh.svg"
              alt="qwertuhh"
              className={clsx(profileIcons)}
              onMouseEnter={useSFX("hover", "Qwertuhh")}
            />
          </Tooltip>

          <Tooltip label="Arihant Jain" className="text-xl">
            <img
              src="./profile-image/arihant_jain.webp"
              alt="arihant"
              className={clsx(profileIcons)}
              onMouseEnter={useSFX("hover", "Arihant Jain")}
            />
          </Tooltip>
        </div>
        <div className="flex flex-col">
          <Typewriter speed={0.06} textClassName="text-2xl sm:text-6xl">
            <h1 className="funnel-display-regular backdrop-blur-lg border-0 border-solid border-transparent wrap-break-word">
              I'm Arihant Jain
            </h1>
          </Typewriter>
          <p className="rouge-script-regular text-2xl sm:text-xl w-fit ml-auto">
            a developer
          </p>
          <p className="muted funnel-display-regular text-lg sm:text-base">
            AKA Qwertuhh
          </p>
        </div>
        <div className="flex flex-col gap-4 my-12 text-justify">
          <HoverScrambleText
            text="Any sufficiently advanced technology is indistinguishable from magic"
            className="bricolage-grotesque-regular text-xl text-justify"
          >
            <p className="bricolage-grotesque-regular text-xl text-justify">
              An enthusiastic learner who is greatly interested in programming
              and Applied Artificial Intelligence. With a strong programming
              background.
            </p>
            {/* </HoverScrambleText> */}
          </HoverScrambleText>
        </div>
        <Suspense fallback={<LazyLoader />}>
          <SocialLinks />
        </Suspense>
      </div>
    </main>
  );
}

export default HeroComponent;
