import { soundManager } from "./soundManager";

const sounds = {
  click: soundManager.createSound(["/sfx/click.ogg", "/sfx/click.mp3"], {
    volume: 0.25,
  }),

  hover: soundManager.createSound(
    ["/sfx/soft-typewriter-click.ogg", "/sfx/soft-typewriter-click.mp3"],
    {
      volume: 0.15,
    }
  ),

  scroll: soundManager.createSound(["/sfx/scrolling.ogg"], {
    volume: 0.1,
  }),
};

type SoundType = keyof typeof sounds;

export { sounds };
export type { SoundType };