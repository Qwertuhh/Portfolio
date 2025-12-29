/**
 * Copyright (c) 2025 Arihant Jain, Qwertuhh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { Project } from '@/types';
import { Eye, Code, BookMarked } from 'lucide-react';
import HoverTextInSlide from '@/components/ui/hover-text-in-slide';
import useSFX from '@/hooks/useSFX';
import { useWebsiteRouter } from '@/hooks';

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
        docsLink,
    } = project;
    /**
     * Sound effect hooks for interactive elements
     * - hoverTag: Triggered when hovering over technology tags
     * - hoverProject: Triggered when hovering over the entire project card
     */
    const hoverTag = useSFX('hover3', 'tag');
    const hoverProject = useSFX('hover2', 'project-card');

    /**
     * Router handlers for links - called at top level to maintain hook order
     */
    const handleSourceCodeClick = useWebsiteRouter(sourceCodeLink || '');
    const handlePreviewClick = useWebsiteRouter(previewLink || '');
    const handleDocsClick = useWebsiteRouter(docsLink || '');

    return (
        /**
         * Main container with hover sound effect and cursor pointer
         * Provides full-width layout with padding for the card content
         */
        <div
            className="min-w-full px-6 py-8 cursor-pointer"
            onMouseOver={hoverProject}
        >
            {/** * Content container with centered layout and vertical spacing *
          Displays project information in a structured, readable format */}
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
                            <div onClick={handleSourceCodeClick}>
                                <HoverTextInSlide
                                    text="Code"
                                    className={hoverTextInSlideClassName}
                                    direction="right"
                                >
                                    <button
                                        title="View source code"
                                        type="button"
                                        className="flex flex-row items-center text-white cascadia-code-regular underline bg-transparent border-none cursor-pointer"
                                    >
                                        <Code className="w-4 h-4 mx-2" />
                                    </button>
                                </HoverTextInSlide>
                            </div>
                        )}

                        {/* Live preview link - conditionally rendered if URL exists */}
                        {previewLink && (
                            <div onClick={handlePreviewClick}>
                                <HoverTextInSlide
                                    text="Preview"
                                    className={hoverTextInSlideClassName}
                                    direction="right"
                                >
                                    <button
                                        title="View project"
                                        className="flex flex-row items-center text-white cascadia-code-regular underline bg-transparent border-none cursor-pointer"
                                    >
                                        <Eye className="w-4 h-4 mx-2" />
                                    </button>
                                </HoverTextInSlide>
                            </div>
                        )}
                        {/* Live docs link - conditionally rendered if URL exists */}
                        {docsLink && (
                            <div onClick={handleDocsClick}>
                                <HoverTextInSlide
                                    text="Docs"
                                    className={hoverTextInSlideClassName}
                                    direction="right"
                                >
                                    <button
                                        title="View docs"
                                        className="flex flex-row items-center text-white cascadia-code-regular underline bg-transparent border-none cursor-pointer"
                                    >
                                        <BookMarked className="w-4 h-4 mx-2" />
                                    </button>
                                </HoverTextInSlide>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
