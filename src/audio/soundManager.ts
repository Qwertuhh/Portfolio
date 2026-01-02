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

import { Howler, Howl, type HowlOptions } from 'howler';
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

// Sound instance with independent volume control
interface SoundInstance {
    howl: Howl;
    config: AudioConfig;
    individualVolume: number;
}

class SoundManager {
    private muted: boolean;
    private masterVolume: number;
    private soundInstances: Map<string, SoundInstance>;

    constructor() {
        this.muted = false;
        this.masterVolume = 0.5;
        this.soundInstances = new Map();

        Howler.volume(this.masterVolume);
    }

    get isMuted(): boolean {
        return this.muted;
    }

    setMasterVolume(value: number): void {
        this.masterVolume = Math.max(0, Math.min(1, value));
        Howler.volume(this.muted ? 0 : this.masterVolume);
        this.updateAllSoundVolumes();
    }

    getMasterVolume(): number {
        return this.masterVolume;
    }

    mute(): void {
        this.muted = true;
        Howler.mute(true);
    }

    unmute(): void {
        this.muted = false;
        Howler.mute(false);
        Howler.volume(this.masterVolume);
    }

    toggleMute(): void {
        if (this.muted) {
            this.unmute();
        } else {
            this.mute();
        }
    }

    createSound(id: string, config: AudioConfig): Howl {
        // Validate config
        const validatedConfig = AudioConfigSchema.parse(config);

        const howl = new Howl({
            src: validatedConfig.src,
            volume: validatedConfig.volume,
            loop: validatedConfig.loop,
            autoplay: validatedConfig.autoplay,
            preload: validatedConfig.preload,
            html5: validatedConfig.html5,
            pool: validatedConfig.pool,
        });

        // Store sound instance with independent volume control
        this.soundInstances.set(id, {
            howl,
            config: validatedConfig,
            individualVolume: validatedConfig.volume,
        });

        return howl;
    }

    setIndividualVolume(id: string, volume: number): void {
        const soundInstance = this.soundInstances.get(id);
        if (soundInstance) {
            soundInstance.individualVolume = Math.max(0, Math.min(1, volume));
            const finalVolume = this.muted
                ? 0
                : soundInstance.individualVolume * this.masterVolume;
            soundInstance.howl.volume(finalVolume);
        }
    }

    getIndividualVolume(id: string): number {
        const soundInstance = this.soundInstances.get(id);
        return soundInstance ? soundInstance.individualVolume : 0;
    }

    getSoundLabel(id: string): string {
        const soundInstance = this.soundInstances.get(id);
        return soundInstance ? soundInstance.config.label : '';
    }

    getSoundConfig(id: string): AudioConfig | undefined {
        const soundInstance = this.soundInstances.get(id);
        return soundInstance?.config;
    }

    getAllSounds(): Array<{
        id: string;
        config: AudioConfig;
        individualVolume: number;
    }> {
        const result: Array<{
            id: string;
            config: AudioConfig;
            individualVolume: number;
        }> = [];
        for (const [id, instance] of this.soundInstances) {
            result.push({
                id,
                config: instance.config,
                individualVolume: instance.individualVolume,
            });
        }
        return result;
    }

    // Legacy method for backward compatibility
    createSoundFromSources(
        src: string[],
        options: Partial<HowlOptions> = {}
    ): Howl {
        return new Howl({
            src,
            volume: options.volume ?? 1,
            preload: true,
            html5: false,
            pool: 5,
            ...options,
        });
    }

    // Update all sound volumes when master volume changes
    private updateAllSoundVolumes(): void {
        for (const instance of this.soundInstances.values()) {
            const finalVolume = this.muted
                ? 0
                : instance.individualVolume * this.masterVolume;
            instance.howl.volume(finalVolume);
        }
    }
}

export const soundManager = new SoundManager();
