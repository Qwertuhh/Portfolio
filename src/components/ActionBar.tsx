import React, { useEffect, useState } from "react";
import { Calendar, Clock, Github } from "lucide-react";

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
    <div className="fixed top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm flex items-center justify-between px-4 h-12">
      {/* Left side - Stacked Profile Icons */}
      <div className="relative flex items-center h-full pl-2">
        <div className="relative group h-10 w-12">
          {/* First Icon */}
          <div className="absolute top-0 left-0 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:translate-x-[-4px] z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
              <div className="relative w-9 h-9 rounded-full border-2 border-white/90 shadow-lg hover:border-blue-400 transition-all duration-300 z-10 overflow-hidden">
                <img 
                  src="qwertuhh.png" 
                  alt="qwertuhh"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1.5 text-xs font-medium text-white bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
              Qwertuhh
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[1px] w-2 h-2 bg-gray-900/95 rotate-45"></div>
            </span>
          </div>
          
          {/* Second Icon */}
          <div className="absolute top-0 left-4 transition-all duration-300 group-hover:translate-y-[4px] group-hover:translate-x-[4px]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"></div>
              <div className="relative w-9 h-9 rounded-full border-2 border-white/90 shadow-lg hover:border-purple-400 transition-all duration-300 z-10 overflow-hidden">
                <img 
                  src="arihant_jain.png" 
                  alt="Arihant Jain"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1.5 text-xs font-medium text-white bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
              Arihant Jain
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[1px] w-2 h-2 bg-gray-900/95 rotate-45"></div>
            </span>
          </div>
        </div>
      </div>
      {/* Center - Time and Date */}
      <div className="text-sm font-medium flex items-center gap-4">
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
      
      {/* Right side - Placeholder for future elements */}
      <div className="w-8 h-8"></div>
    </div>
  );
};

export default ActionBar;
