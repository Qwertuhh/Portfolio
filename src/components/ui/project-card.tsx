import type { Project } from '@/types';
import { Eye, Code } from 'lucide-react';
import HoverTextInSlide from '@/components/ui/hover-text-in-slide';
import useSFX from '@/hooks/useSFX';

/**
 * CSS class name for hover text elements with consistent styling.
 */
const hoverTextInSlideClassName = 'cascadia-code-bold text-white h-5 w-15 mr-2';

/**
 * ProjectCard Component
 *
 * A reusable card component that displays project information including title,
 * media (image or video), description, tags, and action links. Features interactive
 * hover effects and sound feedback.
 *
 * @component
 * @param {Project} project - The project data to display
 * @param {string} project.title - Project title
 * @param {string} project.imageSrc - Path to project media (image or video)
 * @param {string} project.type - Media type ('IMAGE' or 'VIDEO')
 * @param {string} project.description - Project description
 * @param {string[]} project.tags - Array of technology tags
 * @param {string} [project.sourceCodeLink] - URL to source code repository
 * @param {string} [project.previewLink] - URL to live preview/demo
 *
 * @example
 * ```tsx
 * const project = {
 *   title: "My Project",
 *   imageSrc: "./project-screenshot.webp",
 *   type: "IMAGE",
 *   description: "A cool project I built",
 *   tags: ["React", "TypeScript"],
 *   sourceCodeLink: "https://github.com/user/project",
 *   previewLink: "https://project-demo.com"
 * };
 *
 * <ProjectCard {...project} />
 * ```
 *
 * @returns {JSX.Element} A styled project card with media, description, and links
 */
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

    /**
     * Sound effect hooks for interactive elements
     * - hoverTag: Triggered when hovering over technology tags
     * - hoverProject: Triggered when hovering over the entire project card
     */
    const hoverTag = useSFX('hover3', 'tag');
    const hoverProject = useSFX('hover2', 'project-card');

    return (
        /**
         * Main container with hover sound effect and cursor pointer
         * Provides full-width layout with padding for the card content
         */
        <div
            className="min-w-full px-6 py-8 cursor-pointer"
            onMouseOver={hoverProject}
        >
            /** * Content container with centered layout and vertical spacing *
            Displays project information in a structured, readable format */
            <div className="flex flex-col items-center text-center space-y-4">
                {/* Project title with prominent styling */}
                <h2 className="funnel-display-bold text-2xl font-bold text-white">
                    {title}
                </h2>

                {/* Media container - conditionally renders image or video */}
                <div className="w-auto h-48 rounded-lg overflow-hidden">
                    {projectType === 'IMAGE' ? (
                        /**
                         * Image element with lazy loading for performance
                         * Uses object-cover to maintain aspect ratio while filling container
                         */
                        <img
                            alt="Project Thumbnail"
                            src={imageSrc}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        /**
                         * Video element with controls for user interaction
                         * Includes fallback text for browsers that don't support video
                         */
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

                {/* Project information section */}
                <div className="flex flex-col gap-3 items-start justify-start">
                    {/* Project description with semi-transparent text */}
                    <p className="bricolage-grotesque-regular text-white/80 max-w-md text-left">
                        {description}
                    </p>

                    {/* Technology tags container */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {tags.map((tag, idx) => {
                            return (
                                /**
                                 * Individual tag with hover sound effect
                                 * Uses consistent styling with rounded corners and background
                                 */
                                <span
                                    key={idx}
                                    onMouseEnter={hoverTag}
                                    className="cascadia-code-bold px-3 py-1 bg-white/30 rounded-[10px] text-sm text-white"
                                >
                                    {tag}
                                </span>
                            );
                        })}
                    </div>

                    {/* Action links container */}
                    <div className="flex flex-row gap-2">
                        {/* Source code link - conditionally rendered if URL exists */}
                        {sourceCodeLink && (
                            <HoverTextInSlide
                                text="Code"
                                className={hoverTextInSlideClassName}
                                direction="right"
                            >
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

                        {/* Live preview link - conditionally rendered if URL exists */}
                        {previewLink && (
                            <HoverTextInSlide
                                text="Preview"
                                className={hoverTextInSlideClassName}
                                direction="right"
                            >
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
