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

import { z } from 'zod';

// Audio configuration schema
export const AudioConfigSchema = z.object({
    label: z.string().min(1, 'Label is required'),
    src: z.array(z.string()).min(1, 'At least one source file is required'),
    volume: z
        .number()
        .min(0, 'Volume must be at least 0')
        .max(1, 'Volume must be at most 1')
        .default(0.5),
    loop: z.boolean().default(false),
    autoplay: z.boolean().default(false),
    preload: z.boolean().default(true),
    html5: z.boolean().default(false),
    pool: z.number().min(1, 'Pool must be at least 1').default(5),
});

export type AudioConfig = z.infer<typeof AudioConfigSchema>;

// Complete audio configuration schema for the entire application
export const AudioConfigurationSchema = z.object({
    masterVolume: z.number().min(0).max(1).default(0.5),
    sounds: z.record(z.string(), AudioConfigSchema),
});

export type AudioConfiguration = z.infer<typeof AudioConfigurationSchema>;

// Sound state for store
export interface SoundState {
    id: string;
    config: AudioConfig;
    individualVolume: number;
}

// Audio store state interface
export interface AudioStoreState {
    // Master settings
    masterVolume: number;
    isMuted: boolean;

    // Individual sound settings
    sounds: SoundState[];

    // Actions
    setMasterVolume: (volume: number) => void;
    toggleMute: () => void;
    setMuted: (muted: boolean) => void;

    // Sound management
    updateSound: (id: string, updates: Partial<SoundState>) => void;
    setSoundVolume: (id: string, volume: number) => void;
    updateSoundConfig: (id: string, config: AudioConfig) => void;
    addSound: (sound: SoundState) => void;
    removeSound: (id: string) => void;

    // Bulk operations
    resetToDefaults: () => void;
    loadFromConfig: (config: {
        masterVolume: number;
        sounds: Record<string, AudioConfig>;
    }) => void;

    // Getters
    getSound: (id: string) => SoundState | undefined;
    getSoundVolume: (id: string) => number;
    getSoundConfig: (id: string) => AudioConfig | undefined;
}

// Sound info for components
export interface SoundInfo {
    id: string;
    config: AudioConfig;
    individualVolume: number;
}

// Audio controller state interface
export interface AudioControllerState {
    masterVolume: number;
    isMuted: boolean;
    sounds: SoundInfo[];
}

// Audio controller actions interface
export interface AudioControllerActions {
    setMasterVolume: (volume: number) => void;
    toggleMute: () => void;
    setSoundVolume: (id: string, volume: number) => void;
    playSound: (id: string) => void;
    getSoundLabel: (id: string) => string;
    getSoundVolume: (id: string) => number;
    refreshSounds: () => void;
}
