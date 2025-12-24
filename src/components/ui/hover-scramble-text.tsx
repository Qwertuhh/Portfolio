import { useRef } from "react";
import gsap from "gsap";

const CHARS = "AK▙▚▞▝▀▖▜▛▟ioz";

type Props = {
  text: string;
  children: React.ReactNode;
  className?: string;
};

function HoverScrambleSwap({
  text,
  children,
  className = "",
}: Props) {
  const childrenRef = useRef<HTMLSpanElement | null>(null);
  const scrambleRef = useRef<HTMLSpanElement | null>(null);

  let frameId: number | null = null;

  const scrambleIn = () => {
    if (!childrenRef.current || !scrambleRef.current) return;

    gsap.killTweensOf(childrenRef.current);
    gsap.killTweensOf(scrambleRef.current);

    // Animate children out
    gsap.to(childrenRef.current, {
      opacity: 0,
      y: -6,
      duration: 0.2,
      ease: "power2.out",
    });

    // Animate scramble text in
    gsap.fromTo(
      scrambleRef.current,
      { opacity: 0, y: 6 },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        ease: "power2.out",
      }
    );

    let progress = 0;
    const length = text.length;

    // 🔥 Dynamic speed: long text scrambles faster
    const REVEAL_PER_FRAME = Math.max(1, Math.ceil(length / 12));

    if (frameId) cancelAnimationFrame(frameId);

    const animate = () => {
      if (!scrambleRef.current) return;

      progress += REVEAL_PER_FRAME;

      scrambleRef.current.textContent = text
        .split("")
        .map((char, i) =>
          i < progress ? char : CHARS[Math.floor(Math.random() * CHARS.length)]
        )
        .join("");

      if (progress < length) {
        frameId = requestAnimationFrame(animate);
      } else {
        scrambleRef.current.textContent = text;
      }
    };

    animate();
  };

  const scrambleOut = () => {
    if (!childrenRef.current || !scrambleRef.current) return;

    if (frameId) cancelAnimationFrame(frameId);

    // Animate scramble out
    gsap.to(scrambleRef.current, {
      opacity: 0,
      y: 6,
      duration: 0.18,
      ease: "power2.in",
    });

    // Animate children back in
    gsap.to(childrenRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.22,
      delay: 0.05,
      ease: "power2.out",
    });
  };

  return (
    <span
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={scrambleIn}
      onMouseLeave={scrambleOut}
    >
      {/* Original content */}
      <span ref={childrenRef} className="inline-block">
        {children}
      </span>

      {/* Scramble text */}
      <span
        ref={scrambleRef}
        className="absolute left-0 top-0 inline-block pointer-events-none opacity-0"
      >
        {text}
      </span>
    </span>
  );
}

export default HoverScrambleSwap;