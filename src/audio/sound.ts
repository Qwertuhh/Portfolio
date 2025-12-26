import { soundManager } from "./soundManager";

const sounds = {
  click: soundManager.createSound(["/sfx/click.ogg", "/sfx/click.mp3"], {
    volume: 0.25,
  }),

  hover: soundManager.createSound(["/sfx/hovering.ogg", "/sfx/hovering.mp3"], {
    volume: 0.5,
  }),
  hover2: soundManager.createSound(
    ["/sfx/hovering2.ogg", "/sfx/hovering2.mp3"],
    {
      volume: 0.25,
    }
  ),

  scroll: soundManager.createSound(["/sfx/scrolling.ogg"], {
    volume: 0.25,
  }),
  hover3: soundManager.createSound(
    ["/sfx/hard-typewriter-click.ogg", "/sfx/hard-typewriter-click.mp3"],
    {
      volume: 0.25,
    }
  ),
  typewriterClick: soundManager.createSound(
    ["/sfx/soft-typewriter-click.ogg", "/sfx/soft-typewriter-click.mp3"],
    {
      volume: 0.25,
    }
  ),
};

type SoundType = keyof typeof sounds;

export { sounds };
export type { SoundType };
