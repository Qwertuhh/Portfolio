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
      ...options,
    });
  }
}

export const soundManager = new SoundManager();
