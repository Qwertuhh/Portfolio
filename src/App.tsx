import React, { useState } from "react";
import type { JSX } from "react";
import Window from "./components/Window";
import AboutMeContent from "./content/AboutMeContent";
import ProjectsContent from "./content/ProjectsContent";
import ContactContent from "./content/ContactContent";
import GalleryContent from "./content/GalleryContent";
import type { OpenWindow } from "./types";
import Spline from "@splinetool/react-spline";
// Icons are now imported in their respective components
import ActionBar from "./components/ActionBar";
import DesktopIcons from "./components/DesktopIcons";
/**
 * Main App Component for the Desktop-Style Portfolio Website.
 * Manages the state of open windows and renders desktop icons.
 */
const desktopIconsOptions = "w-8 h-8 md:w-10 md:h-10";
const windowIconSize = "w-5 h-5 md:w-6 md:h-6";
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

      <DesktopIcons
        openWindow={openWindow}
        desktopIconsOptions={desktopIconsOptions}
        windowIconSize={windowIconSize}
        AboutMeContent={AboutMeContent}
        ProjectsContent={ProjectsContent}
        GalleryContent={GalleryContent}
        ContactContent={ContactContent}
      />

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
  );
}

export default App;
