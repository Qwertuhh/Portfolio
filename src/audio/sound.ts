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

import { soundManager, type AudioConfig } from './soundManager';
import { Howl } from 'howler';

// Audio configuration with labels and independent volume control
const audioConfigs: Record<string, AudioConfig> = {
    click: {
        label: 'Click Sound',
        src: ['/sfx/click.ogg', '/sfx/click.mp3'],
        volume: 0.25,
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        pool: 5,
    },
    hover: {
        label: 'Hover Sound',
        src: ['/sfx/hovering.ogg', '/sfx/hovering.mp3'],
        volume: 0.5,
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        pool: 5,
    },
    hover2: {
        label: 'Hover Sound 2',
        src: ['/sfx/hovering2.ogg', '/sfx/hovering2.mp3'],
        volume: 0.25,
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        pool: 5,
    },
    scroll: {
        label: 'Scroll Sound',
        src: ['/sfx/scrolling.ogg'],
        volume: 0.25,
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        pool: 5,
    },
    hover3: {
        label: 'Typewriter Hover',
        src: [
            '/sfx/hard-typewriter-click.ogg',
            '/sfx/hard-typewriter-click.mp3',
        ],
        volume: 0.25,
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        pool: 5,
    },
    typewriterClick: {
        label: 'Typewriter Click',
        src: [
            '/sfx/soft-typewriter-click.ogg',
            '/sfx/soft-typewriter-click.mp3',
        ],
        volume: 0.25,
        loop: false,
        autoplay: false,
        preload: true,
        html5: false,
        pool: 5,
    },
};

// Create sound instances with the new manager
const sounds: Record<string, Howl> = {};

// Initialize all sounds
for (const [id, config] of Object.entries(audioConfigs)) {
    sounds[id] = soundManager.createSound(id, config);
}

// Helper functions for audio control
export const playSound = (id: keyof typeof sounds): void => {
    const sound = sounds[id];
    if (sound) {
        sound.play();
    }
};

export const setSoundVolume = (
    id: keyof typeof sounds,
    volume: number
): void => {
    soundManager.setIndividualVolume(id, volume);
};

export const getSoundVolume = (id: keyof typeof sounds): number => {
    return soundManager.getIndividualVolume(id);
};

export const getSoundLabel = (id: keyof typeof sounds): string => {
    return soundManager.getSoundLabel(id);
};

export const getSoundConfig = (
    id: keyof typeof sounds
): AudioConfig | undefined => {
    return soundManager.getSoundConfig(id);
};

export const getAllSounds = () => {
    return soundManager.getAllSounds();
};

// Master volume controls
export const setMasterVolume = (volume: number): void => {
    soundManager.setMasterVolume(volume);
};

export const getMasterVolume = (): number => {
    return soundManager.getMasterVolume();
};

export const toggleMute = (): void => {
    soundManager.toggleMute();
};

export const isMuted = (): boolean => {
    return soundManager.isMuted;
};

type SoundType = keyof typeof sounds;

// Export the sounds object for backward compatibility
export { sounds };
export type { SoundType, AudioConfig };
