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
