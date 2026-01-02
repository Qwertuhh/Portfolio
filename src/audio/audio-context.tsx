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

import { useState } from 'react';
import { soundManager } from '@/audio';
import type { AudioContextType } from '@/types';
import { createContext } from 'react';

const AudioContext = createContext<AudioContextType | undefined>(undefined);

function AudioProvider({ children }: { children: React.ReactNode }) {
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const toggleMute = () => {
        soundManager.toggleMute();
        setMuted(soundManager.isMuted);
    };

    const changeVolume = (value: number) => {
        soundManager.setMasterVolume(value);
        setVolume(value);
    };

    return (
        <AudioContext.Provider
            value={{ muted, volume, toggleMute, changeVolume }}
        >
            {children}
        </AudioContext.Provider>
    );
}

export { AudioProvider, AudioContext };
