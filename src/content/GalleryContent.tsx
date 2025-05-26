import type { JSX } from "react";

/**
 * GalleryContent Component
 * Displays a collection of images or visual assets.
 * This content will be rendered inside a Window component.
 */
const GalleryContent = (): JSX.Element => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-blue-300">Visual Showcase</h2>
    <p>
      A collection of design mockups, UI/UX explorations, and visual assets.
    </p>
    <div className="grid grid-cols-2 gap-4">
      <img
        src="https://placehold.co/150x100/000000/FFFFFF?text=Design+1"
        alt="Design 1"
        className="w-full h-auto rounded-md shadow-lg"
      />
      <img
        src="https://placehold.co/150x100/000000/FFFFFF?text=Design+2"
        alt="Design 2"
        className="w-full h-auto rounded-md shadow-lg"
      />
      <img
        src="https://placehold.co/150x100/000000/FFFFFF?text=Design+3"
        alt="Design 3"
        className="w-full h-auto rounded-md shadow-lg"
      />
      <img
        src="https://placehold.co/150x100/000000/FFFFFF?text=Design+4"
        alt="Design 4"
        className="w-full h-auto rounded-md shadow-lg"
      />
    </div>
    <p className="text-xs text-gray-400">
      (Placeholder images are used here. Replace with your actual images.)
    </p>
  </div>
);

export default GalleryContent;
