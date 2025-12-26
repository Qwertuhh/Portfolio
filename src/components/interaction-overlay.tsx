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

import { useState, useEffect } from "react";

interface InteractionOverlayProps {
  onInteraction: () => void;
}

export default function InteractionOverlay({
  onInteraction,
}: InteractionOverlayProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling when overlay is active
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const handleInteraction = () => {
    setIsVisible(false);
    onInteraction();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-0 bg-opacity-90 backdrop-blur-sm">
      <div className="text-center space-y-8 p-8 max-w-2xl mx-auto">
        <div className="space-y-4">
          <h1 className="funnel-display-bold text-4xl md:text-6xl font-bold text-neutral-900">
            Welcome to My Portfolio
          </h1>
          <p className="cascadia-code-regular text-lg md:text-xl text-neutral-900">
            Click anywhere to continue exploring
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
          <p className="font-mono text-sm text-gray-500">
            This site requires your interaction to proceed and enjoy the <span className="bold bg-neutral-400 text-neutral-50 rounded px-1">SFX</span>
          </p>
        </div>
      </div>

      {/* Invisible overlay that captures clicks anywhere */}
      <div
        className="absolute inset-0"
        onClick={handleInteraction}
        aria-label="Click to enter portfolio"
      />
    </div>
  );
}
