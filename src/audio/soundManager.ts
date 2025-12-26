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

import { Howler, Howl, type HowlOptions } from "howler";

class SoundManager {
  private muted: boolean;
  private volume: number;

  constructor() {
    this.muted = false;
    this.volume = 0.5;

    Howler.volume(this.volume);
  }

  get isMuted(): boolean {
    return this.muted;
  }

  setVolume(value: number): void {
    this.volume = value;
    Howler.volume(this.muted ? 0 : value);
  }

  mute(): void {
    this.muted = true;
    Howler.mute(true);
  }

  unmute(): void {
    this.muted = false;
    Howler.mute(false);
    Howler.volume(this.volume);
  }

  toggleMute(): void {
    if (this.muted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  createSound(src: string[], options: Partial<HowlOptions> = {}): Howl {
    return new Howl({
      src,
      volume: options.volume ?? 1,
      preload: true,
      html5: false, // Force Web Audio API for better performance and lower latency
      pool: 5, // Allow multiple instances for rapid succession
      ...options,
    });
  }
}

export const soundManager = new SoundManager();
