import React, { useState } from "react";
import type { JSX } from "react";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import AboutMeContent from "./content/AboutMeContent";
import ProjectsContent from "./content/ProjectsContent";
import ContactContent from "./content/ContactContent";
import GalleryContent from "./content/GalleryContent";
import type { OpenWindow } from "./types"; // Import the OpenWindow interface
import Spline from "@splinetool/react-spline";
import {
  Rocket,
  UserRoundSearch,
  Signature,
  Images,
} from "lucide-react";
import ActionBar from "./components/ActionBar";
/**
 * Main App Component for the Desktop-Style Portfolio Website.
 * Manages the state of open windows and renders desktop icons.
 */
const desktopIconsOptions = "w-10 h-10";
const windowIconSize = "w-6 aspect-square";
function App(): JSX.Element {

  // State to manage which windows are open, their content, and position
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  /**
   * Opens a new window with the given ID, title, and content.
   * If the window is already open, it brings it to the front.
   * @param {string} id - Unique identifier for the window.
   * @param {string} title - Title for the window.
   * @param {React.ReactNode} content - React content to display inside the window.
   */
  const openWindow = (
    id: string,
    title: string,
    icon: React.ReactNode,
    content: React.ReactNode
  ): void => {
    // Check if the window is already open
    if (!openWindows.some((win: OpenWindow) => win.id === id)) {
      setOpenWindows((prev: OpenWindow[]) => [
        ...prev,
        {
          id,
          title,
          icon,
          content,
          // Initial position (randomized slightly for a desktop feel)
          x: Math.random() * 100 + 50,
          y: Math.random() * 50 + 50,
          zIndex: 100 + prev.length, // Bring new window to front
        },
      ]);
    }
    setActiveWindowId(id); // Make the newly opened window active
  };

  /**
   * Closes a window based on its ID.
   * @param {string} id - The ID of the window to close.
   */
  const closeWindow = (id: string): void => {
    setOpenWindows((prev: OpenWindow[]) =>
      prev.filter((win: OpenWindow) => win.id !== id)
    );
    setActiveWindowId(null); // No window is active after closing
  };

  /**
   * Brings a specific window to the front by updating its z-index.
   * @param {string} id - The ID of the window to bring to the front.
   */
  const bringToFront = (id: string): void => {
    setOpenWindows((prev: OpenWindow[]) => {
      // Find the maximum z-index among all open windows
      const maxZIndex =
        prev.length > 0
          ? Math.max(...prev.map((w: OpenWindow) => w.zIndex))
          : 100;

      const newWindows = prev.map((win: OpenWindow) => {
        if (win.id === id) {
          // Set the clicked window's z-index to maxZIndex + 1
          return { ...win, zIndex: maxZIndex + 1 };
        }
        return win; // Keep other windows' z-index as is
      });
      return newWindows;
    });
    setActiveWindowId(id); // Set the clicked window as active
  };

  return (
    // The main container now uses relative positioning to allow Spline to be absolute within it
    <div className="relative min-h-screen w-full overflow-hidden font-inter text-white">
      {/* Spline scene as background */}
      <Spline
        scene="https://prod.spline.design/XykpMzm5Q82fA33i/scene.splinecode"
        className="absolute inset-0 z-0"
        onLoad={(spline) => {
          const scene = spline;
          scene.setZoom(0.8);
        }}
      />
      {/* Navbar */}
      <ActionBar />

      <div className="absolute inset-0 z-10 p-4 md:p-8">
        {/* Content overlayed on top of Spline */}
        <div className="bg-[var(--bg-desktop-icon-color)] p-4 rounded-lg  fixed bottom-0 left-1/2 transform -translate-x-1/2 scale-75 flex flex-row justify-between items-center">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGgyOXhycTA5azd4ZmMxZWxydXk5Y2txOXc3eHhvdHV2N3JncGhyYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xThuWbpKdoOPIbQzcY/giphy.webp"
            alt="Shell"
            className="w-14 h-14 m-4"
          />
          {/* Desktop Icons */}
          <div className="grid grid-cols-4 gap-4 w-150">
            <DesktopIcon
              icon=<Signature className={desktopIconsOptions} />
              label="About Me"
              onClick={() =>
                openWindow("about", "About Me", <Signature className={windowIconSize}/>,<AboutMeContent />)
              }
            />
            <DesktopIcon
              icon=<Rocket className={desktopIconsOptions} />
              label="My Projects"
              onClick={() =>
                openWindow("projects", "My Projects",<Rocket className={windowIconSize}/>, <ProjectsContent />)
              }
            />
            <DesktopIcon
              icon=<UserRoundSearch className={desktopIconsOptions} />
              label="Contact"
              onClick={() =>
                openWindow("contact", "Contact Me",<UserRoundSearch className={windowIconSize}/>, <ContactContent />)
              }
            />
            <DesktopIcon
              icon=<Images className={desktopIconsOptions} />
              label="Gallery"
              onClick={() =>
                openWindow("gallery", "My Gallery", <Images className={windowIconSize}/>,<GalleryContent />)
              }
            />
          </div>
        </div>

        {/* Render Open Windows */}
        {openWindows.map((window: OpenWindow) => (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            icon={window.icon}
            initialX={window.x}
            initialY={window.y}
            zIndex={window.zIndex}
            isActive={activeWindowId === window.id}
            onClose={closeWindow}
            onFocus={bringToFront}
          >
            {window.content}
          </Window>
        ))}
      </div>
    </div>
  );
}

export default App;
