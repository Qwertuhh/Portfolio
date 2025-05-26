import React, { useEffect, useState } from "react";
import { Shell, Calendar, Clock, Github } from "lucide-react";

const desktopIconsOptions = "w-4 aspect-square"; // Corrected 'apspect-square' to 'aspect-square'
const ActionBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10 bg-black w-full h-5 opacity-50 flex flex-row items-center justify-between py-4 px-8 gap-x-4">
      <div className="flex flex-col">
        <Shell className="w-8 aspect-square" />
      </div>
      <div className="text-[0.8rem] font-semibold julius-sans-one-bold w-80 rounded-lg flex flex-row items-center justify-between">
        <span className="flex flex-row justify-center items-center gap-1">
          <Calendar className={desktopIconsOptions} />
          {currentTime.toLocaleDateString()}
        </span>
        <span className="flex flex-row justify-center items-center gap-1">
          <Clock className={desktopIconsOptions} />
          {currentTime.toLocaleTimeString()}
        </span>
        <span className="flex flex-row justify-center items-center gap-1">
          <a
            href="https://github.com/Qwertuhh/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Github className={desktopIconsOptions} />
          </a>
        </span>
      </div>
    </div>
  );
};

export default ActionBar;
