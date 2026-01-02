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
import { AudioInitializer } from './AudioInitializer';
import { AudioControllerExample } from './AudioControllerExample';

/**
 * Example of how to integrate the AudioInitializer with your app
 * Wrap your entire app with AudioInitializer to ensure audio config is loaded
 */
export const AudioAppExample: React.FC = () => {
    return (
        <AudioInitializer>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Enhanced Audio System Demo
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <AudioControllerExample />

                        <div className="bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-4">
                                Features
                            </h2>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Persistent audio settings in localStorage
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Independent volume control per sound
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    JSON-based configuration with Zod validation
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Zustand state management
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Automatic initialization on app load
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Master mute/unmute functionality
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                    Reset to defaults option
                                </li>
                            </ul>

                            <div className="mt-6 p-4 bg-blue-50 rounded">
                                <h3 className="font-medium mb-2">
                                    Usage Instructions:
                                </h3>
                                <ol className="text-sm space-y-1 list-decimal list-inside">
                                    <li>
                                        Adjust master volume to control all
                                        sounds
                                    </li>
                                    <li>
                                        Use mute/unmute to silence all audio
                                    </li>
                                    <li>
                                        Adjust individual sound volumes
                                        independently
                                    </li>
                                    <li>Click Play buttons to test sounds</li>
                                    <li>Reset restores default settings</li>
                                    <li>
                                        Settings persist automatically in
                                        localStorage
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AudioInitializer>
    );
};
