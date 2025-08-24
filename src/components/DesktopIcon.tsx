import type { DesktopIconProps } from "../types"; // Import the interface
import type { JSX } from "react";
import { useState } from "react";

/**
 * DesktopIcon Component
 * Represents a clickable icon on the desktop home screen.
 * When clicked, it typically opens a new window.
 * Now includes a hover effect to display the label in a box.
 *
 * @param {DesktopIconProps} props - The props for the component.
 * @param {string} props.icon - The emoji or character to display as the icon.
 * @param {string} props.label - The text label for the icon.
 * @param {() => void} props.onClick - The function to call when the icon is clicked.
 */
const DesktopIcon = ({
  icon,
  label,
  onClick,
}: DesktopIconProps): JSX.Element => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false); // State to control tooltip visibility
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false); // New state variable to track window visibility

  const handleIconClick = () => {
    setIsWindowOpen(!isWindowOpen); // Toggle window visibility on icon click
    onClick(); // Call the original onClick event handler
  };

  return (
    <div
      className="relative flex flex-col items-center cursor-crosshair" // Add relative positioning for the tooltip
      onMouseEnter={() => setShowTooltip(true)} // Show tooltip on mouse enter
      onMouseLeave={() => setShowTooltip(false)} // Hide tooltip on mouse leave
    >
      <button
        className="bg-[var(--bg-desktop-icon-color)] w-20 h-20 flex flex-col items-center p-4 rounded-lg transition-transform duration-200 cursor-pointer hover:bg-[var(--bg-desktop-icon-color-hover)] hover:scale-115 hover:mx-1 peer:hover:scale-85 focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-[var(--bg-desktop-icon-color)] hover:border-2 hover:border-[var(--bg-desktop-icon-color-hover)]"
        onClick={handleIconClick} // Update the onClick event handler
      >
        <div className="text-4xl mb-1">{icon}</div>
        <span className="text-sm text-center font-semibold julius-sans-one-bold"></span>
      </button>

      {/* Tooltip box */}
      {showTooltip && (
        <div className="absolute my-8 bottom-full mt-2 p-2 bg-black opacity-80 text-white text-sn rounded-md shadow-lg whitespace-nowrap z-20">
          {label}
        </div>
      )}
    </div>
  );
};

export default DesktopIcon;
