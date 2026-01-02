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

import { useState, useEffect, useCallback } from 'react';
import {
    getAllSounds,
    getSoundLabel,
    getSoundVolume,
    playSound,
    setSoundVolume,
    setMasterVolume,
    getMasterVolume,
    toggleMute,
    isMuted,
} from '../audio/sound';
import type { AudioConfig } from '../audio/soundManager';

export interface SoundInfo {
    id: string;
    config: AudioConfig;
    individualVolume: number;
}

export interface AudioControllerState {
    masterVolume: number;
    isMuted: boolean;
    sounds: SoundInfo[];
}

export interface AudioControllerActions {
    setMasterVolume: (volume: number) => void;
    toggleMute: () => void;
    setSoundVolume: (id: string, volume: number) => void;
    playSound: (id: string) => void;
    getSoundLabel: (id: string) => string;
    getSoundVolume: (id: string) => number;
    refreshSounds: () => void;
}

/**
 * Hook for managing audio with independent volume control and labels
 */
export const useAudioController = (): AudioControllerState &
    AudioControllerActions => {
    const [state, setState] = useState<AudioControllerState>({
        masterVolume: getMasterVolume(),
        isMuted: isMuted(),
        sounds: getAllSounds(),
    });

    const refreshSounds = useCallback(() => {
        setState((prev) => ({
            ...prev,
            sounds: getAllSounds(),
        }));
    }, []);

    const handleSetMasterVolume = useCallback((volume: number) => {
        setMasterVolume(volume);
        setState((prev) => ({ ...prev, masterVolume: volume }));
    }, []);

    const handleToggleMute = useCallback(() => {
        toggleMute();
        setState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    }, []);

    const handleSetSoundVolume = useCallback(
        (id: string, volume: number) => {
            setSoundVolume(
                id as keyof typeof import('../audio/sound').sounds,
                volume
            );
            refreshSounds();
        },
        [refreshSounds]
    );

    const handlePlaySound = useCallback((id: string) => {
        playSound(id as keyof typeof import('../audio/sound').sounds);
    }, []);

    const handleGetSoundLabel = useCallback((id: string): string => {
        return getSoundLabel(
            id as keyof typeof import('../audio/sound').sounds
        );
    }, []);

    const handleGetSoundVolume = useCallback((id: string): number => {
        return getSoundVolume(
            id as keyof typeof import('../audio/sound').sounds
        );
    }, []);

    // Update state when master volume changes externally
    useEffect(() => {
        const interval = setInterval(() => {
            const currentMasterVolume = getMasterVolume();
            const currentIsMuted = isMuted();

            setState((prev) => {
                if (
                    prev.masterVolume !== currentMasterVolume ||
                    prev.isMuted !== currentIsMuted
                ) {
                    return {
                        ...prev,
                        masterVolume: currentMasterVolume,
                        isMuted: currentIsMuted,
                    };
                }
                return prev;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return {
        ...state,
        setMasterVolume: handleSetMasterVolume,
        toggleMute: handleToggleMute,
        setSoundVolume: handleSetSoundVolume,
        playSound: handlePlaySound,
        getSoundLabel: handleGetSoundLabel,
        getSoundVolume: handleGetSoundVolume,
        refreshSounds,
    };
};
