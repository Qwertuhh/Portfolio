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

import { useRef } from "react";
import gsap from "gsap";
import useSFX from "@/hooks/useSFX";

type Direction = "left" | "top" | "right" | "bottom";

interface HoverFlipTextProps {
  children: React.ReactNode;
  text: string;
  direction?: Direction;
  className?: string;
}

function HoverTextInSlide({
  children,
  text,
  direction = "left",
  className = "",
}: HoverFlipTextProps) {
  const originalRef = useRef<HTMLDivElement>(null);
  const flippedRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const typewriterClick = useSFX("typewriterClick", "slideText");

  // Split text into characters for animation
  const chars = text.split("");

  // Get animation properties based on direction
  const getDirectionAnimation = (dir: Direction) => {
    switch (dir) {
      case "left":
        return { x: -20, scale: 0.8 };
      case "top":
        return { y: -20, scale: 0.8 };
      case "right":
        return { x: 20, scale: 0.8 };
      case "bottom":
        return { y: 20, scale: 0.8 };
      default:
        return { y: 20, scale: 0.8 };
    }
  };

  const animationProps = getDirectionAnimation(direction);

  const handleMouseEnter = () => {
    if (!originalRef.current || !flippedRef.current) return;

    // Kill any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create new timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Animate original content out
    tl.to(originalRef.current, {
      rotateX: -90,
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
    })
      // Set flipped content initial state
      .set(flippedRef.current, { rotateX: 90, opacity: 0 })
      // Animate flipped content in
      .to(flippedRef.current, {
        rotateX: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      })
      // Animate characters with stagger
      .fromTo(
        charRefs.current,
        {
          opacity: 0,
          ...animationProps,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: {
            each: 0.05,
            onStart: () => typewriterClick(), // Play sound for each character
          },
          ease: "back.out(1.7)",
        },
        "-=0.1"
      );
  };

  const handleMouseLeave = () => {
    if (!originalRef.current || !flippedRef.current) return;

    // Kill any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create new timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Animate flipped content out
    tl.to(flippedRef.current, {
      rotateX: -90,
      opacity: 0,
      duration: 0.2,
      ease: "power2.inOut",
    })
      // Animate original content back in
      .to(originalRef.current, {
        rotateX: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      });
  };

  return (
    <div
      className={`relative inline-block cursor-pointer hover-flip-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Original content */}
      <div
        ref={originalRef}
        className="w-full h-full hover-flip-face preserve-3d backface-hidden"
      >
        {children}
      </div>

      {/* Flipped content */}
      <div
        ref={flippedRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center hover-flip-face opacity-0 preserve-3d backface-hidden"
      >
        <span className="text-inherit font-inherit inline-flex">
          {chars.map((char, index) => (
            <span
              key={index}
              ref={(el) => {
                charRefs.current[index] = el;
              }}
              className="inline-block char-initial"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

export default HoverTextInSlide;
