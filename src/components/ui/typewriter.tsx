import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

type TypewriterProps = {
  children: React.ReactNode;
  speed?: number;
  overwrite?: boolean;
  loop?: boolean;
  pause?: number;
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
    {},
    displayText.split("").map((char: string, index: number) => {
      return (
        <motion.span
          key={`${currentChildIndex}-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: isDeleting ? 0 : index * speed,
          }}
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      );
    })
  );
}

export { Typewriter };
