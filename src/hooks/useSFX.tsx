import { sounds, type SoundType } from "@/audio";

const useSFX = (type: SoundType, sfxLabel: string) => {
  return () => {
    try {
      switch (type) {
        case "click":
          {
            console.log(`Clicked on "${sfxLabel}"`);

            sounds.click.play();
          }
          break;
        case "hover": {
          console.log(`Hovered on "${sfxLabel}"`);

          sounds.hover.play();
          break;
        }
        case "hover2": {
          console.log(`Hovered2 on "${sfxLabel}"`);
          console.log("hover2 sound state:", sounds.hover2.state());

          sounds.hover2.play();
          break;
        }
        case "scroll":
          {
            console.log(`Scrolled on "${sfxLabel}"`);

            sounds.scroll.play();
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
