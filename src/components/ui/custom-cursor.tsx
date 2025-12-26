import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import disc from '@/assets/cursor/disc.svg';
import discWithMusicNote from '@/assets/cursor/disc-with-music-note.svg';

/**
 * CustomCursor - High-performance animated cursor component
 *
 * Features:
 * - Smooth cursor following with GSAP animations
 * - Dynamic pointer detection for any element with cursor: pointer
 * - Rotating disc animation on hover
 * - Scale animations for hover and click states
 * - Optimized performance with single tween instance
 * - TypeScript support with proper type definitions
 *
 * @component
 * @example
 * ```tsx
 * <CustomCursor />
 * ```
 *
 * @author Portfolio Team
 * @since 1.0.0
 * @version 2.0.0
 */
function CustomCursor() {
    // Refs for DOM elements and GSAP animations
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const discRef = useRef<HTMLImageElement | null>(null);
    const rotationTween = useRef<gsap.core.Tween | null>(null);

    // State management for cursor interactions
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    /**
     * Initialize cursor movement and pointer detection
     *
     * This effect handles:
     * - Smooth cursor following using GSAP
     * - Real-time pointer detection via computed styles
     * - Event listener cleanup on unmount
     */
    useEffect(() => {
        /** Smooth cursor following animation */
        const moveCursor = (e: MouseEvent) => {
            // Animate cursor position with easing
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: 'power3.out',
            });

            // 🔥 Universal pointer detection for ANY element
            // Detects elements with cursor: pointer CSS property
            const target = e.target as HTMLElement;
            const isPointerEl =
                target && window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isPointerEl);
        };

        // Attach global mouse move listener
        window.addEventListener('mousemove', moveCursor);

        /**
         * Handle mouse down events
         *
         * Actions:
         * - Set clicking state for icon swap
         * - Pause rotation animation
         * - Reset disc rotation to 0 degrees
         * - Apply click scale animation
         */
        const handleDown = () => {
            setIsClicking(true);

            // Pause rotation and reset when clicking
            if (rotationTween.current) {
                rotationTween.current.pause();
            }
            gsap.set(discRef.current, { rotation: 0 });

            gsap.to(cursorRef.current, {
                scale: isPointer ? 1.35 : 1.15,
                duration: 0.1,
                ease: 'power2.out',
            });
        };

        /**
         * Handle mouse up events
         *
         * Actions:
         * - Clear clicking state
         * - Resume rotation if still on pointer element
         * - Apply release scale animation
         */
        const handleUp = () => {
            setIsClicking(false);

            // Resume rotation if we're still on a pointer element
            if (isPointer && rotationTween.current) {
                rotationTween.current.play();
            }

            gsap.to(cursorRef.current, {
                scale: isPointer ? 1.2 : 1,
                duration: 0.2,
                ease: 'power2.out',
            });
        };

        // Attach click event listeners
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);

        /**
         * Cleanup event listeners on component unmount
         * Prevents memory leaks and performance issues
         */
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [isPointer]);

    /**
     * Create and manage disc rotation animation
     *
     * Performance optimization: Creates rotation tween once
     * and reuses it throughout component lifecycle
     *
     * Animation specs:
     * - 360° rotation over 3 seconds
     * - Linear easing for consistent speed
     * - Infinite repeat
     * - Initially paused
     * - Centered transform origin
     */
    useEffect(() => {
        rotationTween.current = gsap.to(discRef.current, {
            rotation: 360,
            duration: 3,
            repeat: -1,
            ease: 'linear',
            paused: true,
            transformOrigin: '50% 50%',
        });

        /** Cleanup: Kill rotation tween on unmount */
        return () => {
            rotationTween.current?.kill();
        };
    }, []);

    /**
     * Handle pointer hover state changes
     *
     * Manages:
     * - Rotation animation play/pause states
     * - Scale transitions between normal and hover states
     * - Coordination with click state for proper scaling
     *
     * Scale values:
     * - Normal: 1.0
     * - Hover: 1.2
     * - Click + Hover: 1.35
     * - Click only: 1.15
     */
    useEffect(() => {
        if (isPointer) {
            // Start rotation animation
            rotationTween.current?.play();

            // Apply hover scale (considering click state)
            gsap.to(cursorRef.current, {
                scale: isClicking ? 1.35 : 1.2,
                duration: 0.2,
                ease: 'power2.out',
            });
        } else {
            // Stop rotation animation
            rotationTween.current?.pause();

            // Reset to normal scale (considering click state)
            gsap.to(cursorRef.current, {
                scale: isClicking ? 1.15 : 1,
                duration: 0.2,
                ease: 'power2.out',
            });
        }
    }, [isPointer, isClicking]);

    /**
     * Render custom cursor component
     *
     * Visual states:
     * - Default: Static disc icon
     * - Hover: Rotating disc with scale
     * - Click: Music note disc with scale
     *
     * Performance considerations:
     * - Draggable disabled to prevent native cursor behavior
     * - Fixed dimensions for consistent sizing
     * - Alt text for accessibility
     */
    return (
        <div ref={cursorRef} className="custom-cursor">
            <img
                ref={discRef}
                src={isClicking ? discWithMusicNote : disc}
                alt="disc cursor"
                width={40}
                height={40}
                draggable={false}
            />
        </div>
    );
}

export default CustomCursor;
