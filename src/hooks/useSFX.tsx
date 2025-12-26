import { sounds, type SoundType } from "@/audio";

const useSFX = (type: SoundType, sfxLabel: string) => {
  console.log(`Playing ${type} SFX for ${sfxLabel}`);
  return () => {
    try {
      switch (type) {
        case "click":
          {
            sounds.click.play();
          }
          break;
        case "hover": {
          sounds.hover.play();
          break;
        }
        case "hover2": {
          sounds.hover2.play();
          break;
        }
        case "hover3": {
          sounds.hover3.play();
          break;
        }
        case "scroll":
          {
            sounds.scroll.play();
          }
          break;

        case "typewriterClick":
          {
            sounds.typewriterClick.play();
          }
          break;
        default:
          console.warn(`Unknown sound type: ${type}`);
      }
    } catch (error) {
      console.error(`Error playing ${type} sound:`, error);
    }
  };
};

export default useSFX;
