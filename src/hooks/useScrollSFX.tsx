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
