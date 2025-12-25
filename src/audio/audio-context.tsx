import {  useState } from "react";
import { soundManager } from "@/audio";
import type { AudioContextType, AudioProviderProps } from "@/types";
import { createContext } from "react";

const AudioContext = createContext<AudioContextType | undefined>(undefined);

function AudioProvider({ children }: AudioProviderProps) {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const toggleMute = () => {
    soundManager.toggleMute();
    setMuted(soundManager.isMuted);
  };

  const changeVolume = (value: number) => {
    soundManager.setVolume(value);
    setVolume(value);
  };

  return (
    <AudioContext.Provider value={{ muted, volume, toggleMute, changeVolume }}>
      {children}
    </AudioContext.Provider>
  );
}



export { AudioProvider, AudioContext };