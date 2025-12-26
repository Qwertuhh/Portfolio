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

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import disc from '@/assets/cursor/disc.svg';
import discWithMusicNote from '@/assets/cursor/disc-with-music-note.svg';

/**
 * CustomCursor
 *
 * @description
 * A custom cursor component that provides a unique and engaging user experience.
 *
 * @features
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

    /**
     * State for cursor follow and interaction detection
     *
     * @description
     * This state is used to track the cursor's position and detect
     * when the cursor is hovering over interactive elements.
     */
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

    /**
     * Disc Rotation Animation Setup
     *
     * @effect
     * Creates persistent rotation animation for optimal performance.
     * Single tween instance reused throughout component lifecycle.
     *
     * @animation
     * - Rotation: 360 degrees over 3 seconds
     * - Easing: Linear for consistent angular velocity
     * - Repeat: Infinite (-1)
     * - Initial State: Paused (controlled by hover state)
     * - Transform Origin: Center (50%, 50%)
     *
     * @performance
     * - Single GSAP instance minimizes memory allocation
     * - Play/pause control prevents unnecessary animation
     * - Proper cleanup prevents zombie animations
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

        // Cleanup rotation tween on component unmount
        return () => {
            rotationTween.current?.kill();
        };
    }, []);

    /**
     * Hover & Click State Management
     *
     * @effect
     * Manages visual feedback for user interactions.
     * Coordinates rotation animation and scaling based on interaction states.
     *
     * @states
     * - Normal: Static disc, scale 1.0
     * - Hover: Rotating disc, scale 1.2
     * - Click: Music note disc, scale 1.15 (normal) or 1.35 (hover)
     *
     * @transitions
     * - Hover Enter: Start rotation, scale to 1.2 (0.2s duration)
     * - Hover Exit: Stop rotation, scale to 1.0 (0.2s duration)
     * - Click Down: Pause rotation, scale based on hover state (0.1s duration)
     * - Click Up: Resume rotation if hovering, scale accordingly (0.2s duration)
     */
    useEffect(() => {
        if (isPointer) {
            // Start rotation animation for hover state
            rotationTween.current?.play();

            // Apply hover scale (considering current click state)
            gsap.to(cursorRef.current, {
                scale: isClicking ? 1.35 : 1.2,
                duration: 0.2,
                ease: 'power2.out',
            });
        } else {
            // Stop rotation animation for normal state
            rotationTween.current?.pause();

            // Reset to normal scale (considering current click state)
            gsap.to(cursorRef.current, {
                scale: isClicking ? 1.15 : 1,
                duration: 0.2,
                ease: 'power2.out',
            });
        }
    }, [isPointer, isClicking]);

    /**
     * Component Render
     *
     * @render
     * Renders the custom cursor with dynamic icon swapping.
     * Uses React refs for direct DOM manipulation with GSAP.
     *
     * @structure
     * - Outer div: Fixed positioning container with transform
     * - Inner img: SVG icon with dynamic source based on interaction state
     *
     * @visual-states
     * - Default: Static disc icon (rotation paused, scale 1.0)
     * - Hover: Rotating disc icon (360°/3s, scale 1.2)
     * - Click: Music note disc icon (rotation paused, scale 1.15-1.35)
     *
     * @performance-optimizations
     * - Fixed dimensions (40x40px) prevent layout thrashing
     * - Draggable={false} prevents native browser drag behavior
     * - Transform-based positioning for GPU acceleration
     * - Pointer-events: none (via CSS) prevents interference
     *
     * @accessibility
     * - Alt text provides screen reader support
     * - Semantic structure maintains accessibility tree
     * - High contrast icons ensure visibility
     */
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
