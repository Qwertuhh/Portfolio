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

import type { AudioConfig } from './audio';

// Zustand store types
export interface StoreState<T> {
    getState: () => T;
    setState: (partial: Partial<T> | ((prevState: T) => Partial<T>)) => void;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
    destroy: () => void;
}

// Persist middleware types
export interface PersistOptions<S> {
    name: string;
    storage?: Storage;
    version?: number;
    migrate?: (persistedState: unknown, version: number) => S | Promise<S>;
    onRehydrateStorage?: (state: S) => void;
}

// Store creation types
export interface StoreApi<T> {
    setState: (partial: Partial<T> | ((prevState: T) => Partial<T>)) => void;
    getState: () => T;
    subscribe: (listener: (state: T, prevState: T) => void) => () => void;
    destroy: () => void;
}

// Enhanced store types for audio
export interface AudioStoreSlice {
    masterVolume: number;
    isMuted: boolean;
    sounds: Array<{
        id: string;
        config: AudioConfig;
        individualVolume: number;
    }>;
}

// Store actions
export interface AudioStoreActions {
    setMasterVolume: (volume: number) => void;
    toggleMute: () => void;
    setMuted: (muted: boolean) => void;
    updateSound: (
        id: string,
        updates: Partial<{
            id: string;
            config: AudioConfig;
            individualVolume: number;
        }>
    ) => void;
    setSoundVolume: (id: string, volume: number) => void;
    updateSoundConfig: (id: string, config: AudioConfig) => void;
    addSound: (sound: {
        id: string;
        config: AudioConfig;
        individualVolume: number;
    }) => void;
    removeSound: (id: string) => void;
    resetToDefaults: () => void;
    loadFromConfig: (config: {
        masterVolume: number;
        sounds: Record<string, AudioConfig>;
    }) => void;
    getSound: (id: string) =>
        | {
              id: string;
              config: AudioConfig;
              individualVolume: number;
          }
        | undefined;
    getSoundVolume: (id: string) => number;
    getSoundConfig: (id: string) => AudioConfig | undefined;
}
