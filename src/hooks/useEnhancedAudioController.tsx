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

import { useEffect, useCallback } from 'react';
import { soundManager } from '../audio/soundManager';
import { useAudioStore } from '../stores/audioStore';
import type { AudioConfig } from '../types';

/**
 * Enhanced audio controller hook that integrates Zustand store with SoundManager
 * Provides state management with localStorage persistence
 */
export const useEnhancedAudioController = () => {
    const {
        masterVolume,
        isMuted,
        sounds,
        setMasterVolume: setStoreMasterVolume,
        toggleMute: toggleStoreMute,
        setMuted: setStoreMuted,
        setSoundVolume: setStoreSoundVolume,
        updateSoundConfig: updateStoreSoundConfig,
        getSound: getStoreSound,
        getSoundVolume: getStoreSoundVolume,
        getSoundConfig: getStoreSoundConfig,
    } = useAudioStore();

    // Sync store state with SoundManager
    useEffect(() => {
        // Apply master volume to SoundManager
        soundManager.setMasterVolume(masterVolume);
    }, [masterVolume]);

    useEffect(() => {
        // Apply mute state to SoundManager
        if (isMuted) {
            soundManager.mute();
        } else {
            soundManager.unmute();
        }
    }, [isMuted]);

    // Initialize sounds from store on mount
    useEffect(() => {
        sounds.forEach((soundState) => {
            // Create or update sound in SoundManager
            try {
                soundManager.createSound(soundState.id, soundState.config);
                soundManager.setIndividualVolume(
                    soundState.id,
                    soundState.individualVolume
                );
            } catch (error) {
                console.warn(
                    `Failed to initialize sound ${soundState.id}:`,
                    error
                );
            }
        });
    }, [sounds]);

    // Wrapper functions that update both store and SoundManager
    const setMasterVolume = useCallback(
        (volume: number) => {
            setStoreMasterVolume(volume);
            soundManager.setMasterVolume(volume);
        },
        [setStoreMasterVolume]
    );

    const toggleMute = useCallback(() => {
        toggleStoreMute();
        if (isMuted) {
            soundManager.unmute();
        } else {
            soundManager.mute();
        }
    }, [toggleStoreMute, isMuted]);

    const setMuted = useCallback(
        (muted: boolean) => {
            setStoreMuted(muted);
            if (muted) {
                soundManager.mute();
            } else {
                soundManager.unmute();
            }
        },
        [setStoreMuted]
    );

    const setSoundVolume = useCallback(
        (id: string, volume: number) => {
            setStoreSoundVolume(id, volume);
            soundManager.setIndividualVolume(id, volume);
        },
        [setStoreSoundVolume]
    );

    const updateSoundConfig = useCallback(
        (id: string, config: AudioConfig) => {
            updateStoreSoundConfig(id, config);
            soundManager.createSound(id, config);
        },
        [updateStoreSoundConfig]
    );

    const playSound = useCallback(
        (id: string) => {
            const sound = getStoreSound(id);
            if (sound) {
                try {
                    const howl = soundManager.createSound(id, sound.config);
                    howl.volume(
                        isMuted ? 0 : sound.individualVolume * masterVolume
                    );
                    howl.play();
                } catch (error) {
                    console.error(`Failed to play sound ${id}:`, error);
                }
            }
        },
        [getStoreSound, isMuted, masterVolume]
    );

    const getSoundLabel = useCallback(
        (id: string): string => {
            const sound = getStoreSound(id);
            return sound?.config.label || '';
        },
        [getStoreSound]
    );

    const getSoundVolume = useCallback(
        (id: string): number => {
            return getStoreSoundVolume(id);
        },
        [getStoreSoundVolume]
    );

    const getSoundConfig = useCallback(
        (id: string): AudioConfig | undefined => {
            return getStoreSoundConfig(id);
        },
        [getStoreSoundConfig]
    );

    const getAllSounds = useCallback(() => {
        return sounds.map(({ id, config, individualVolume }) => ({
            id,
            config,
            individualVolume,
        }));
    }, [sounds]);

    // Reset to defaults
    const resetToDefaults = useCallback(() => {
        const { resetToDefaults: storeReset } = useAudioStore.getState();
        storeReset();
    }, []);

    return {
        // State
        masterVolume,
        isMuted,
        sounds: sounds.map(({ id, config, individualVolume }) => ({
            id,
            config,
            individualVolume,
        })),

        // Master controls
        setMasterVolume,
        toggleMute,
        setMuted,

        // Sound controls
        setSoundVolume,
        updateSoundConfig,
        playSound,
        getSoundLabel,
        getSoundVolume,
        getSoundConfig,
        getAllSounds,

        // Utilities
        resetToDefaults,
    };
};

export type EnhancedAudioController = ReturnType<
    typeof useEnhancedAudioController
>;
