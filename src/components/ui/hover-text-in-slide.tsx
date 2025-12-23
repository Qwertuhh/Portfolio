import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Direction = "left" | "top" | "right" | "bottom";

interface HoverFlipTextProps {
  children: React.ReactNode;
  flipText: string;
  direction?: Direction;
  className?: string;
}

function HoverTextInSlide({
  children,
  flipText,
  direction = "left",
  className = "",
}: HoverFlipTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Split text into characters for animation
  const chars = flipText.split("");

  // Get animation properties based on direction
  const getDirectionAnimation = (dir: Direction) => {
    switch (dir) {
      case "left":
        return {
          initial: { opacity: 0, x: -20, scale: 0.8 },
          animate: { opacity: 1, x: 0, scale: 1 },
        };
      case "top":
        return {
          initial: { opacity: 0, y: -20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
        };
      case "right":
        return {
          initial: { opacity: 0, x: 20, scale: 0.8 },
          animate: { opacity: 1, x: 0, scale: 1 },
        };
      case "bottom":
        return {
          initial: { opacity: 0, y: 20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
        };
      default:
        return {
          initial: { opacity: 0, y: 20, scale: 0.8 },
          animate: { opacity: 1, y: 0, scale: 1 },
        };
    }
  };

  const animationProps = getDirectionAnimation(direction);

  return (
    <div
      className={`relative inline-block cursor-pointer hover-flip-container ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="original"
            initial={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full hover-flip-face"
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="flipped"
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full flex items-center justify-center hover-flip-face"
          >
            <span className="text-inherit font-inherit inline-flex">
              {chars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={animationProps.initial}
                  animate={animationProps.animate}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.68, -0.55, 0.265, 1.55], // Bounce easing
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HoverTextInSlide;
