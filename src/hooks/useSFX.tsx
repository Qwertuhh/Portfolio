import { sounds, type SoundType } from "@/audio";

const useSFX = (type: SoundType, sfxLabel: string) => {
  return () => {
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
      case "scroll":
        {
          console.log(`Scrolled on "${sfxLabel}"`);

          sounds.scroll.play();
        }
        break;
    }
  };
};

export default useSFX;
