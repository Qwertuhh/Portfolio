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

import React from 'react';
import { useEnhancedAudioController } from '../hooks/useEnhancedAudioController';

/**
 * Example component demonstrating the audio controller with labels and independent volume control
 */
const AudioControllerExample: React.FC = () => {
    const {
        masterVolume,
        isMuted,
        sounds,
        setMasterVolume,
        toggleMute,
        setSoundVolume,
        playSound,
        getSoundVolume,
        resetToDefaults,
    } = useEnhancedAudioController();

    return (
        <div className="p-6 bg-gray-100 rounded-lg max-w-md mx-auto z-100">
            <h2 className="text-2xl font-bold mb-4">Audio Controller</h2>

            {/* Master Controls */}
            <div className="mb-6 p-4 bg-white rounded shadow">
                <h3 className="text-lg font-semibold mb-3">Master Controls</h3>

                <div className="mb-3">
                    <label
                        htmlFor="master-volume"
                        className="block text-sm font-medium mb-1"
                    >
                        Master Volume: {Math.round(masterVolume * 100)}%
                    </label>
                    <input
                        id="master-volume"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={masterVolume}
                        onChange={(e) =>
                            setMasterVolume(parseFloat(e.target.value))
                        }
                        className="w-full"
                    />
                </div>

                <button
                    onClick={toggleMute}
                    className={`px-4 py-2 rounded font-medium transition-colors mr-2 ${
                        isMuted
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                >
                    {isMuted ? 'Unmute' : 'Mute'}
                </button>
                <button
                    onClick={resetToDefaults}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded font-medium transition-colors"
                >
                    Reset
                </button>
            </div>

            {/* Individual Sound Controls */}
            <div className="space-y-3">
                <h3 className="text-lg font-semibold">Individual Sounds</h3>
                {sounds.map(
                    (sound: {
                        id: string;
                        config: { label: string; src: string[] };
                        individualVolume: number;
                    }) => (
                        <div
                            key={sound.id}
                            className="p-3 bg-white rounded shadow"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">
                                    {sound.config.label}
                                </h4>
                                <button
                                    onClick={() => playSound(sound.id)}
                                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                                >
                                    Play
                                </button>
                            </div>

                            <div className="text-xs text-gray-600 mb-2">
                                ID: {sound.id} | Sources:{' '}
                                {sound.config.src.length}
                            </div>

                            <div>
                                <label
                                    htmlFor={`volume-${sound.id}`}
                                    className="block text-sm font-medium mb-1"
                                >
                                    Volume:{' '}
                                    {Math.round(getSoundVolume(sound.id) * 100)}
                                    %
                                </label>
                                <input
                                    id={`volume-${sound.id}`}
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={getSoundVolume(sound.id)}
                                    onChange={(e) =>
                                        setSoundVolume(
                                            sound.id,
                                            parseFloat(e.target.value)
                                        )
                                    }
                                    className="w-full"
                                />
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Debug Info */}
            <div className="mt-6 p-3 bg-gray-800 text-white rounded text-xs">
                <h4 className="font-semibold mb-2">Debug Info</h4>
                <div>Total Sounds: {sounds.length}</div>
                <div>Master Volume: {masterVolume.toFixed(2)}</div>
                <div>Muted: {isMuted ? 'Yes' : 'No'}</div>
            </div>
        </div>
    );
};

export default AudioControllerExample;