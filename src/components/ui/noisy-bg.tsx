import React from "react";
import clsx from "clsx";

interface NoisyBgProps {
  opacity?: number;
  dark?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A noisy background component with configurable opacity and dark/light mode
 */
function NoisyBg({
  opacity = 0.03,
  dark = false,
  className = "",
  children,
}: NoisyBgProps) {
  const noiseImage = dark ? "/dark-noise.webp" : "/light-noise.webp";

  return (
    <div className={`relative ${className}`}>
      {/* Base background or content */}
      {children}

      {/* Noise overlay */}
      <img
        alt="noisy background"
        className={clsx(
          "absolute inset-0 pointer-events-none mix-blend-overlay bg-noise",
          opacity
        )}
        src={noiseImage}
      />
    </div>
  );
}

export { NoisyBg };
