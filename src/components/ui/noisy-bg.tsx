import React from "react";
import clsx from "clsx";

interface NoisyBgProps {
  children: React.ReactNode;
  bgColor?: string;
  dark?: boolean;
  className?: string;
  imageClassName?: string;
}

/**
 * A noisy background component with configurable opacity and dark/light mode
 */
function NoisyBg({
  children,
  bgColor = "var(--bg-secondary)",
  dark = false,
  className = "",
  imageClassName,
}: NoisyBgProps) {
  const noiseImage = dark ? "/dark-noise.webp" : "/light-noise.webp";

  return (
    <div className={clsx("relative", className, bgColor)}>
      {/* Noise overlay behind content */}
      <img
        alt="noisy background"
        className={clsx(
          "absolute z-0",
          imageClassName
        )}
        src={noiseImage}
      />

      {/* Content on top of noise */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export { NoisyBg };
