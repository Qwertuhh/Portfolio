"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

const scrambleChars =
  "▙ ▚ ▞ a k i e d z e k ▝ ▀ ▖ ▜ ▛ ▟ ▙ ▚ ▞ ▝ ▀ ▖ a k i e d z e k";

function HoverScrambleText({
  children,
  text,
  textClassName = "",
}: {
  children: React.ReactNode;
  text: string;
  textClassName?: string;
}) {
  const textRef = useRef(null);
  const originalText = text || "";

  const handleMouseEnter = () => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      duration: 0.5,
      scrambleText: {
        text: text || originalText,
        chars: scrambleChars,
        revealDelay: 0.1,
        speed: 0.1,
      },
    });
  };

  const handleMouseLeave = () => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      duration: 0.3,
      scrambleText: {
        text: originalText,
        chars: scrambleChars,
        revealDelay: 0,
        speed: 0.2,
      },
    });
  };

  return (
    <div
      className="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={textRef} className={`${textClassName}`}>
        {children}
      </div>
    </div>
  );
}

export default HoverScrambleText;
