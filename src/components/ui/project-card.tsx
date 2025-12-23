import type { Project } from "@/types";
import { Eye, Code } from "lucide-react";
import HoverTextInSlide from "@/components/ui/hover-text-in-slide";

const hoverTextInSlideClassName = "cascadia-code-bold text-white h-5 w-15 mr-2";
function ProjectCard(project: Project) {
  const {
    title,
    imageSrc,
    description,
    type: projectType,
    previewLink,
    tags,
    sourceCodeLink,
  } = project;
  return (
    <div className="min-w-full px-6 py-8">
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
            <video
              controls
              className="w-full h-full object-cover"
              preload="auto"
            >
              <source src={imageSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="flex flex-col gap-3 items-start justify-start">
          <p className="bricolage-grotesque-regular text-white/80 max-w-md text-left">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag, idx) => {
              return (
                <span
                  key={idx}
                  className="cascadia-code-bold px-3 py-1 bg-white/30 rounded-[10px] text-sm text-white"
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <div className="flex flex-row gap-2">
            {sourceCodeLink && (
              <HoverTextInSlide text="Code" className={hoverTextInSlideClassName} direction="right">
                <a
                  title="View source code"
                  href={sourceCodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center text-white cascadia-code-regular underline"
                >
                  <Code className="w-4 h-4 mx-2" />
                </a>
              </HoverTextInSlide>
            )}
            {previewLink && (
              <HoverTextInSlide text="Preview" className={hoverTextInSlideClassName} direction="right">
                <a
                  title="View project"
                  href={previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center text-white cascadia-code-regular underline"
                >
                  <Eye className="w-4 h-4 mx-2" />
                </a>
              </HoverTextInSlide>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
