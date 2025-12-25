import type { AudioContextType } from "@/types";
import { useContext } from "react";
import { AudioContext } from "@/audio";

const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export default useAudio;
