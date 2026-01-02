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

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
    AudioConfig,
    SoundState,
    AudioStoreState,
    AudioStoreActions,
} from '../types';
import { AudioConfigSchema } from '../types';

const defaultSounds: SoundState[] = [
    {
        id: 'click',
        config: {
            label: 'Click Sound',
            src: ['/sfx/click.ogg', '/sfx/click.mp3'],
            volume: 0.25,
            loop: false,
            autoplay: false,
            preload: true,
            html5: false,
            pool: 5,
        },
        individualVolume: 0.25,
    },
    {
        id: 'hover',
        config: {
            label: 'Hover Sound',
            src: ['/sfx/hovering.ogg', '/sfx/hovering.mp3'],
            volume: 0.5,
            loop: false,
            autoplay: false,
            preload: true,
            html5: false,
            pool: 5,
        },
        individualVolume: 0.5,
    },
    {
        id: 'hover2',
        config: {
            label: 'Hover Sound 2',
            src: ['/sfx/hovering2.ogg', '/sfx/hovering2.mp3'],
            volume: 0.25,
            loop: false,
            autoplay: false,
            preload: true,
            html5: false,
            pool: 5,
        },
        individualVolume: 0.25,
    },
    {
        id: 'scroll',
        config: {
            label: 'Scroll Sound',
            src: ['/sfx/scrolling.ogg'],
            volume: 0.25,
            loop: false,
            autoplay: false,
            preload: true,
            html5: false,
            pool: 5,
        },
        individualVolume: 0.25,
    },
    {
        id: 'hover3',
        config: {
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
        individualVolume: 0.25,
    },
    {
        id: 'typewriterClick',
        config: {
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
        individualVolume: 0.25,
    },
];

export const useAudioStore = create<AudioStoreState & AudioStoreActions>()(
    persist(
        (set, get) => ({
            // Initial state
            masterVolume: 0.5,
            isMuted: false,
            sounds: defaultSounds,

            // Master volume controls
            setMasterVolume: (volume: number) => {
                const clampedVolume = Math.max(0, Math.min(1, volume));
                set({ masterVolume: clampedVolume });
            },

            toggleMute: () => {
                set((state) => ({ isMuted: !state.isMuted }));
            },

            setMuted: (muted: boolean) => {
                set({ isMuted: muted });
            },

            // Sound management
            updateSound: (id: string, updates: Partial<SoundState>) => {
                set((state) => ({
                    sounds: state.sounds.map((sound) =>
                        sound.id === id ? { ...sound, ...updates } : sound
                    ),
                }));
            },

            setSoundVolume: (id: string, volume: number) => {
                const clampedVolume = Math.max(0, Math.min(1, volume));
                get().updateSound(id, { individualVolume: clampedVolume });
            },

            updateSoundConfig: (id: string, config: AudioConfig) => {
                const validatedConfig = AudioConfigSchema.parse(config);
                get().updateSound(id, { config: validatedConfig });
            },

            addSound: (sound: SoundState) => {
                set((state) => ({
                    sounds: [
                        ...state.sounds.filter((s) => s.id !== sound.id),
                        sound,
                    ],
                }));
            },

            removeSound: (id: string) => {
                set((state) => ({
                    sounds: state.sounds.filter((sound) => sound.id !== id),
                }));
            },

            // Bulk operations
            resetToDefaults: () => {
                set({
                    masterVolume: 0.5,
                    isMuted: false,
                    sounds: defaultSounds,
                });
            },

            loadFromConfig: (config: {
                masterVolume: number;
                sounds: Record<string, AudioConfig>;
            }) => {
                const soundStates: SoundState[] = Object.entries(
                    config.sounds
                ).map(([id, audioConfig]) => ({
                    id,
                    config: AudioConfigSchema.parse(audioConfig),
                    individualVolume: audioConfig.volume,
                }));

                set({
                    masterVolume: config.masterVolume,
                    sounds: soundStates,
                });
            },

            // Getters
            getSound: (id: string) => {
                return get().sounds.find((sound) => sound.id === id);
            },

            getSoundVolume: (id: string) => {
                const sound = get().getSound(id);
                return sound?.individualVolume ?? 0;
            },

            getSoundConfig: (id: string) => {
                const sound = get().getSound(id);
                return sound?.config;
            },
        }),
        {
            name: 'audio-store',
            storage: createJSONStorage(() => localStorage),
            version: 1,
            onRehydrateStorage: () => (state) => {
                console.log('Audio store hydrated:', state);
            },
        }
    )
);
