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

import { Volume2, VolumeX } from 'lucide-react';
import useAudio from '@/hooks/useAudio';

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

    /**
     * Handle volume change from slider input
     * @param event - Change event from range input
     */
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        changeVolume(newVolume);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-3">
                {/* Mute/Unmute Toggle Button */}
                <button
                    onClick={toggleMute}
                    className="text-white hover:text-white/80 transition-colors p-2 rounded-md hover:bg-white/10"
                    title={muted ? 'Unmute' : 'Mute'}
                    aria-label={muted ? 'Unmute audio' : 'Mute audio'}
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
                        className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        aria-label="Volume control"
                        aria-valuemin="0"
                        aria-valuemax="1"
                        aria-valuetext={`${Math.round(volume * 100)}%`}
                    />
                    <span className="text-white text-sm min-w-12 text-right">
                        {Math.round(volume * 100)}%
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AudioControl;
