/**
 * Copyright (c) 2025 Arihant Jain, Qwertuhh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of Software, and to permit persons to whom Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import useAudio from '@/hooks/useAudio';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * AudioControl Component
 *
 * Provides volume and mute controls for the application's audio system.
 * Features a slider for volume adjustment and a toggle button for mute/unmute.
 *
 * @component
 * @returns {JSX.Element} Audio control interface with volume slider and mute toggle
 */
function AudioControl() {
    const { muted, volume, toggleMute, changeVolume } = useAudio();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const collapsedRef = useRef<HTMLButtonElement>(null);
    const expandedRef = useRef<HTMLDivElement>(null);
    const collapseTween = useRef<gsap.core.Tween | null>(null);

    /**
     * Handle volume change from slider input
     * @param event - Change event from range input
     */
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        changeVolume(newVolume);
    };

    // Keyboard shortcut: Ctrl+Alt+A to toggle collapse state
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.altKey && event.key === 'a') {
                event.preventDefault();
                setIsCollapsed((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // GSAP animation for collapse/expand
    useEffect(() => {
        if (isCollapsed) {
            // Collapse animation
            if (expandedRef.current) {
                collapseTween.current = gsap.to(expandedRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        // Animation complete, component will re-render in collapsed state
                    },
                });
            }
        } else {
            // Expand animation
            if (collapsedRef.current) {
                gsap.fromTo(
                    collapsedRef.current,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    }
                );
            }
            if (expandedRef.current) {
                gsap.fromTo(
                    expandedRef.current,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                    }
                );
            }
        }

        return () => {
            collapseTween.current?.kill();
        };
    }, [isCollapsed]);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="fixed bottom-4 right-4 z-50">
                    {/* Collapsed State - Small Button */}
                    {isCollapsed && (
                        <button
                            ref={collapsedRef}
                            onClick={() => setIsCollapsed(false)}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-2 text-black transition-all rotate-90"
                            title="Expand Audio Controls"
                            aria-label="Expand audio controls"
                        >
                            <ChevronUp className="w-6 h-6 text-black" />
                        </button>
                    )}

                    {/* Expanded State - Full Controls */}
                    {!isCollapsed && (
                        <div
                            ref={expandedRef}
                            className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border-2 border-black text-black"
                        >
                            <div className="flex items-center gap-3">
                                {/* Mute/Unmute Toggle Button */}
                                <button
                                    onClick={toggleMute}
                                    className="text-black hover:text-black/80 transition-colors p-1 rounded-md hover:bg-black/10"
                                    title={muted ? 'Unmute' : 'Mute'}
                                    aria-label={
                                        muted ? 'Unmute audio' : 'Mute audio'
                                    }
                                >
                                    {muted ? (
                                        <VolumeX className="w-5 h-5" />
                                    ) : (
                                        <Volume2 className="w-5 h-5" />
                                    )}
                                </button>

                                {/* Volume Slider */}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        className="w-24 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer slider"
                                        aria-label="Volume control"
                                        aria-valuemin={0}
                                        aria-valuemax={1}
                                        aria-valuetext={`${Math.round(
                                            volume * 100
                                        )}%`}
                                    />
                                    <span className="doto-bold text-2xl min-w-12 text-right">
                                        {Math.round(volume * 100)}%
                                    </span>
                                </div>

                                {/* Collapse Button */}
                                <button
                                    onClick={() => setIsCollapsed(true)}
                                    className="text-black hover:text-black/80 transition-colors p-1 rounded-md hover:bg-black/10 rotate-90"
                                    title="Collapse Audio Controls"
                                    aria-label="Collapse audio controls"
                                >
                                    <ChevronDown className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p className="funnel-display-bold">Audio Controls</p>
                <p>

                Press <span className="bg-gray-400 p-px px-[2px] mx-px text-black rounded cascadia-code-regular">Ctrl+Alt+A</span> to toggle audio controls
                </p>
            </TooltipContent>
        </Tooltip>
    );
}

export default AudioControl;
