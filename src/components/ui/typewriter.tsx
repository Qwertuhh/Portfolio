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

import clsx from "clsx";
import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

type TypewriterProps = {
  children: React.ReactNode;
  speed?: number;
  overwrite?: boolean;
  loop?: boolean;
  pause?: number;
  textClassName?: string;
};

type TextChildProps = {
  children: string;
  [key: string]: unknown; // Allow any other props
};

function Typewriter({
  children,
  speed = 0.05,
  overwrite = false,
  loop = false,
  pause = 2000,
  textClassName,
}: TypewriterProps) {
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const validChildren = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TextChildProps> =>
      React.isValidElement<TextChildProps>(child) &&
      typeof child.props.children === "string"
  );

  const currentText = validChildren[currentChildIndex]?.props.children || "";

  useEffect(() => {
    if (validChildren.length === 0) return;

    const timer = setTimeout(
      () => {
        if (!overwrite) {
          // Simple typewriter effect without overwrite
          if (charIndex < currentText.length) {
            setDisplayText(currentText.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else if (loop && currentChildIndex < validChildren.length - 1) {
            // Move to next child
            setCurrentChildIndex(currentChildIndex + 1);
            setCharIndex(0);
            setDisplayText("");
          }
        } else {
          // Overwrite effect
          if (!isDeleting) {
            // Typing
            if (charIndex < currentText.length) {
              setDisplayText(currentText.slice(0, charIndex + 1));
              setCharIndex(charIndex + 1);
            } else {
              // Pause before deleting
              setTimeout(() => setIsDeleting(true), pause);
            }
          } else {
            // Deleting
            if (charIndex > 0) {
              setDisplayText(currentText.slice(0, charIndex - 1));
              setCharIndex(charIndex - 1);
            } else {
              // Move to next child
              setIsDeleting(false);
              if (loop) {
                setCurrentChildIndex(
                  (currentChildIndex + 1) % validChildren.length
                );
              } else if (currentChildIndex < validChildren.length - 1) {
                setCurrentChildIndex(currentChildIndex + 1);
              }
            }
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timer);
  }, [
    charIndex,
    currentText,
    isDeleting,
    currentChildIndex,
    validChildren.length,
    overwrite,
    loop,
    speed,
    pause,
  ]);

  if (validChildren.length === 0) {
    return <>{children}</>;
  }

  const currentChild = validChildren[currentChildIndex];

  return React.cloneElement(
    currentChild,
    currentChild.props,
    displayText.split("").map((char: string, index: number) => {
      return (
        <motion.span
          key={`${currentChildIndex}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: isDeleting ? 0 : index * speed,
          }}
          className={clsx("inline-block", textClassName)}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      );
    })
  );
}

export { Typewriter };
