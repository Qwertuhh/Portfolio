import ImageBg from "@/components/ui/image-bg";
import { LiquidGlass } from "@/components/ui/liquidGlass";
import type { Project } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projectsShowcase: Project[] = [
  {
    title: "My Backend",
    imageSrc: "./gallery/postman.webp",
    type: "IMAGE",
    description:
      "Writting and testing APIs build during my backend development journey.",
    tags: ["Node JS", "Express", "MongoDB"],
    githubLink: "https://github.com/qwertuhh/mybackend",
  },
  {
    title: "Welltrack",
    imageSrc: "./gallery/welltrack.mp4",
    type: "VIDEO",
    description:
      "Welltrack web app developed for a hackathon pitch, designed to help users seamlessly record daily entries, track habits, and monitor their mood.",
    tags: ["Welltrack", "AI", "Web Development"],
    githubLink: "https://github.com/qwertuhh/welltrack",
  },
];

function ProjectsFeatures(project: Project) {
  const {
    title,
    imageSrc,
    description,
    type: projectType,
    tags,
    githubLink,
  } = project;
  return (
    <div className="min-w-full px-4 py-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <h2 className="funnel-display-bold text-2xl font-bold text-white">
          {title}
        </h2>
        <div className="w-auto h-48 rounded-lg overflow-hidden">
          {projectType === "IMAGE" ? (
            <img
              alt="Project Thumbnail"
              src={imageSrc}
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          ) : (
            <video controls className="w-full h-full object-cover" preload="auto">
              <source src={imageSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <p className="bricolage-grotesque-regular text-white/80 max-w-md">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag, idx) => {
            return (
              <span
                key={idx}
                className="cascadia-code-bold px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white"
              >
                {tag}
              </span>
            );
          })}
        </div>
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
          >
            View on GitHub
          </a>
        )}
      </div>
    </div>
  );
}

function Projects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const scrollToProject = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const projectWidth = container.clientWidth;
    const scrollLeft = index * projectWidth;

    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    setCurrentProjectIndex(index);

    // Update scroll states
    setTimeout(() => {
      setCanScrollLeft(index > 0);
      setCanScrollRight(index < projectsShowcase.length - 1);
    }, 100);
  };

  const scroll = (direction: "left" | "right") => {
    const newIndex =
      direction === "left"
        ? Math.max(0, currentProjectIndex - 1)
        : Math.min(projectsShowcase.length - 1, currentProjectIndex + 1);

    scrollToProject(newIndex);
  };

  const checkScrollability = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const projectWidth = container.clientWidth;
    const currentIndex = Math.round(container.scrollLeft / projectWidth);
    setCurrentProjectIndex(currentIndex);

    setCanScrollLeft(currentIndex > 0);
    setCanScrollRight(currentIndex < projectsShowcase.length - 1);
  };

  // Initialize scroll states
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Set initial states
    setCanScrollLeft(false);
    setCanScrollRight(projectsShowcase.length > 1);

    // Snap to first project
    scrollToProject(0);
  }, []);

  return (
    <ImageBg imageSrc="./black-forest.webp">
      <div className="main-div h-screen">
        <div className="relative">
          <LiquidGlass className="w-(--main-width) mx-auto rounded-4xl">
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              onScroll={checkScrollability}
            >
              <div className="flex">
                {projectsShowcase.map((project, idx) => {
                  return (
                    <div key={idx} className="min-w-full snap-center">
                      <ProjectsFeatures {...project} />
                    </div>
                  );
                })}
              </div>
            </div>
          </LiquidGlass>

          {/* Project indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {projectsShowcase.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentProjectIndex ? "bg-white w-6" : "bg-white/40"
                }`}
              />
            ))}
          </div>

          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              title="Previous project"
              aria-label="Previous project"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm transition-all opacity-100 hover:bg-white/30"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              title="Next project"
              aria-label="Next project"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm transition-all opacity-100 hover:bg-white/30"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </ImageBg>
  );
}

export default Projects;
