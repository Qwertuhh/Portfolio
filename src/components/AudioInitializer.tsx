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

import { useEffect } from 'react';
import { useAudioStore } from '../stores/audioStore';
import { AudioConfigManager } from '../audio/audioConfig';

/**
 * Component that initializes audio configuration from localStorage and JSON config
 * Should be rendered once at the app root level
 */
export const AudioInitializer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { loadFromConfig } = useAudioStore();

    useEffect(() => {
        // Initialize audio configuration on app load
        const initializeAudio = async () => {
            try {
                // Try to load from localStorage first (handled by Zustand persist)
                const storedState = localStorage.getItem('audio-store');

                if (storedState) {
                    console.log('Audio configuration loaded from localStorage');
                    return;
                }

                // If no stored state, load from JSON config file
                console.log('Loading default audio configuration from JSON');
                const response = await fetch('/src/audio/audioConfig.json');
                if (response.ok) {
                    const configText = await response.text();
                    const config =
                        AudioConfigManager.createConfigFromJSON(configText);
                    loadFromConfig(config);
                } else {
                    console.warn(
                        'Could not load audio config from JSON, using defaults'
                    );
                }
            } catch (error) {
                console.error(
                    'Failed to initialize audio configuration:',
                    error
                );
                // Fall back to defaults (already set by Zustand)
            }
        };

        initializeAudio();
    }, [loadFromConfig]);

    // Apply audio settings to SoundManager when they change
    useEffect(() => {
        const { masterVolume, isMuted } = useAudioStore.getState();

        // Apply to SoundManager
        if (typeof window !== 'undefined') {
            import('../audio/soundManager').then(({ soundManager }) => {
                soundManager.setMasterVolume(masterVolume);
                if (isMuted) {
                    soundManager.mute();
                } else {
                    soundManager.unmute();
                }
            });
        }
    }, []);

    return <>{children}</>;
};
