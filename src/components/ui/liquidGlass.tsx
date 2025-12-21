import React from "react";
import clsx from "clsx";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
}

function LiquidGlass({ children, className = "" }: LiquidGlassProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-2xl",

        // Core glass look
        "bg-white/10 backdrop-blur-xl backdrop-saturate-150",

        // Subtle border like Apple UI
        "border border-white/20",

        // Soft shadow for floating depth
        "shadow-[0_8px_30px_rgba(0,0,0,0.12)]",

        // Light reflection overlay
        "before:absolute before:inset-0 before:pointer-events-none",
        "before:bg-linear-to-br before:from-white/25 before:via-white/5 before:to-transparent",

        // Inner glow
        "after:absolute after:inset-0 after:pointer-events-none",
        "after:rounded-2xl after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]",

        className
      )}
    >
      {children}
    </div>
  );
}

export { LiquidGlass };
