import type { JSX } from "react";

/**
 * GalleryContent Component
 * Displays a collection of images or visual assets.
 * This content will be rendered inside a Window component.
 */
interface GalleryItem {
  image?: string;
  video?: string;
  description: string;
  badges?: string[];
}
const GalleryContentStock: GalleryItem[] = [
  {
    image: "../../public/gallery/postman.png",
    description: "Writting and testing APIs build during my backend development journey.",
    badges: ["Node.js", "Express", "MongoDB"],
  },
  {
    video: "../../public/gallery/welltrack.mp4",
    description: "Welltrack web app developed for a hackathon pitch, designed to help users seamlessly record daily entries, track habits, and monitor their mood.",
    badges: ["Welltrack", "AI", "Web Development"],
  },
]
const GalleryContent = (): JSX.Element => (
  <div className="text-2xl text-[var(--header-one-color)] flex flex-col gap-1">
    <h2 className="text-3xl md:text-4xl font-bold text-left text-[var(--header-one-color)]">
      Gallery
    </h2>
    <p className="text-base font-light text-gray-300 text-left">
      Explore a collection of my favorite digital creations, showcasing my
      skills in design and development, as well as my working pictures. Each
      project is a unique blend of creativity and functionality, reflecting my
      dedication to creating visually stunning and user-friendly digital
      experiences.
    </p>
    {GalleryContentStock.map(({ image, video, description, badges }, index) => (
      <div
        key={index}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 font-semibold font-julius-sans-one bg-[var(--bg-window-color)] p-4 rounded-lg shadow-md my-2 text-base md:text-lg ring-1 ring-gray-100 hover:ring-gray-400 transition-all duration-200 cursor-pointer items-center"
      >
        {image && (
          <img
            src={image}
            alt={description}
            className="rounded-lg shadow-md max-w-full h-auto"
          />
        )}
        {video && (
          <iframe
            src={video}
            title={description}
            className="rounded-lg shadow-md max-w-full h-auto"
            width="100%"
            height="100%"
            allowFullScreen
          />
        )}
        <div className="flex flex-col space-y-2 ring-1 ring-gray-300 p-4 rounded-lg">
          <p className="text-sm font-light font-mono text-gray-300">
            {description}
          </p>
          <div className="flex space-x-2">
            {badges?.map((badge, index) => (
              <span
                key={index}
                className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
    <hr className="w-full h-0.5 my-2" />
    <div className="flex justify-center">
      <a href="https://git.io/typing-svg">
        <img
          src="https://readme-typing-svg.demolab.com?font=%22Playwrite+AT%22&size=24&letterSpacing=2px&pause=1000&color=447CF7&background=00000001&random=false&width=435&lines=Thanks+for+viewing"
          alt="Typing SVG"
          className="w-[26rem]"
        />
      </a>
    </div>
  </div>
);

export default GalleryContent;

