import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import disc from '@/assets/cursor/disc.svg';
import discWithMusicNote from '@/assets/cursor/disc-with-music-note.svg';

/**
 * CustomCursor
 *
 * - Works with cursor: none
 * - Rotates & scales on interactive elements
 * - Click state swaps disc icon
 * - High-performance GSAP animation
 */
function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const discRef = useRef<HTMLImageElement | null>(null);
    const rotationTween = useRef<gsap.core.Tween | null>(null);

    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    /* ----------------------------------
     Cursor follow + interaction detect
  ----------------------------------- */
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: 'power3.out',
            });

            const target = e.target as HTMLElement | null;

            const isInteractive = !!target?.closest(
                `
        a,
        button,
        input,
        textarea,
        select,
        label,
        summary,
        details,
        [role="button"],
        [role="link"],
        [onclick],
        [data-cursor="pointer"],
        .cursor-pointer
        `
            );

            setIsPointer(isInteractive);
        };

        const handleDown = () => {
            setIsClicking(true);

            gsap.to(cursorRef.current, {
                scale: isPointer ? 1.35 : 1.15,
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        const handleUp = () => {
            setIsClicking(false);

            gsap.to(cursorRef.current, {
                scale: isPointer ? 1.2 : 1,
                duration: 0.2,
                ease: 'power2.out',
            });
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [isPointer]);

    /* ----------------------------------
     Disc rotation (create once)
  ----------------------------------- */
    useEffect(() => {
        rotationTween.current = gsap.to(discRef.current, {
            rotation: 360,
            duration: 3,
            repeat: -1,
            ease: 'linear',
            paused: true,
            transformOrigin: '50% 50%',
        });

        return () => {
            rotationTween.current?.kill();
        };
    }, []);

    /* ----------------------------------
     Hover / click behavior
  ----------------------------------- */
    useEffect(() => {
        if (isPointer) {
            rotationTween.current?.play();

            gsap.to(cursorRef.current, {
                scale: isClicking ? 1.35 : 1.2,
                duration: 0.2,
                ease: 'power2.out',
            });
        } else {
            rotationTween.current?.pause();

            gsap.to(cursorRef.current, {
                scale: isClicking ? 1.15 : 1,
                duration: 0.2,
                ease: 'power2.out',
            });
        }
    }, [isPointer, isClicking]);

    /* ----------------------------------
     Render
  ----------------------------------- */
    return (
        <div ref={cursorRef} className="custom-cursor">
            <img
                ref={discRef}
                src={isClicking ? discWithMusicNote : disc}
                alt="Custom cursor disc"
                width={40}
                height={40}
                draggable={false}
            />
        </div>
    );
}

export default CustomCursor;
