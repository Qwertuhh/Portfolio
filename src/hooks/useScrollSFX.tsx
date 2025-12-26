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

import { useEffect, useRef, useCallback } from "react";
import useSFX from "./useSFX";

const useScrollSFX = () => {
  const scrollSound = useSFX("scroll", "page-scroll");
  const lastScrollTime = useRef<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    const currentTime = Date.now();

    // Immediate sound trigger for scroll start
    if (!isScrolling.current) {
      isScrolling.current = true;
      scrollSound();
      lastScrollTime.current = currentTime;
      return;
    }

    // Throttle subsequent scroll sounds to play at most once every 50ms (reduced from 100ms)
    if (currentTime - lastScrollTime.current > 50) {
      scrollSound();
      lastScrollTime.current = currentTime;
    }

    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Set a timeout to detect when scrolling stops (reduced from 150ms to 100ms)
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
      lastScrollTime.current = 0;
    }, 100);
  }, [scrollSound]);

  useEffect(() => {
    const handleScrollEvent = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", handleScrollEvent, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);
};

export default useScrollSFX;
