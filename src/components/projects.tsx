import ImageBg from '@/components/ui/image-bg';
import { LiquidGlass } from '@/components/ui/liquidGlass';
import type { Project } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import ProjectCard from '@/components/ui/project-card';
import ClassicWebsiteButton from '@/components/classic-website-button';

/**
 * Array of project data to be displayed in the showcase.
 * Each project contains metadata for rendering and navigation.
 */
const projectsShowcase: Project[] = [
    {
        title: 'My Backend',
        imageSrc: './gallery/postman.webp',
        type: 'IMAGE',
        description:
            'In  this project I first time introduced to backend system. In this project I learn about API development, database management, and server-side logic.',
        tags: ['Node JS', 'Express', 'MongoDB'],
        sourceCodeLink: 'https://github.com/qwertuhh/mybackend',
    },
    {
        title: 'Welltrack',
        imageSrc: './gallery/welltrack.mp4',
        type: 'VIDEO',
        description:
            'Welltrack web app developed for a hackathon pitch, designed to help users seamlessly record daily entries, track habits, and monitor their mood.',
        tags: ['Welltrack', 'AI', 'Web Development'],
        sourceCodeLink: 'https://github.com/qwertuhh/welltrack',
    },
];

/**
 * Projects Component
 *
 * A showcase component that displays project cards in a horizontally scrollable
 * container with navigation controls. Features both button and keyboard navigation.
 *
 * @component
 * @example
 * ```tsx
 * <Projects />
 * ```
 *
 * Features:
 * - Horizontal scrolling with snap behavior
 * - Keyboard navigation (Enter/Right for next, Backspace/Left for previous)
 * - Visual indicators for current project position
 * - Responsive design with touch support
 * - Accessibility features with ARIA labels
 *
 * @returns {JSX.Element} The projects showcase section
 */
function Projects() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    /**
     * Scrolls the container to the specified project index with smooth animation.
     * Updates the current project index and scroll button states.
     *
     * @param index - The project index to scroll to
     */
    const scrollToProject = (index: number) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const projectWidth = container.clientWidth;
        const scrollLeft = index * projectWidth;

        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        setCurrentProjectIndex(index);

        // Update scroll states
        setTimeout(() => {
            setCanScrollLeft(index > 0);
            setCanScrollRight(index < projectsShowcase.length - 1);
        }, 100);
    };

    /**
     * Navigates to the next or previous project based on the direction.
     * Uses useCallback to prevent unnecessary re-renders.
     *
     * @param direction - The direction to scroll ('left' for previous, 'right' for next)
     */
    const scroll = useCallback(
        (direction: 'left' | 'right') => {
            const newIndex =
                direction === 'left'
                    ? Math.max(0, currentProjectIndex - 1)
                    : Math.min(
                          projectsShowcase.length - 1,
                          currentProjectIndex + 1
                      );

            scrollToProject(newIndex);
        },
        [currentProjectIndex]
    );

    /**
     * Checks the current scroll position and updates the scroll button states
     * and current project index accordingly. Called on scroll events.
     */
    const checkScrollability = () => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const projectWidth = container.clientWidth;
        const currentIndex = Math.round(container.scrollLeft / projectWidth);
        setCurrentProjectIndex(currentIndex);

        setCanScrollLeft(currentIndex > 0);
        setCanScrollRight(currentIndex < projectsShowcase.length - 1);
    };

    /**
     * Initializes the scroll container and sets up initial state.
     * Runs once on component mount to establish the starting position.
     */
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Set initial states
        setCanScrollLeft(false);
        setCanScrollRight(projectsShowcase.length > 1);

        // Snap to first project
        scrollToProject(0);
    }, []);

    /**
     * Sets up keyboard navigation event listeners.
     * Handles Enter/Right arrow for next project and Backspace/Left arrow for previous.
     * Only active when user is focused within the projects section.
     *
     * Keyboard shortcuts:
     * - Enter or ArrowRight: Navigate to next project
     * - Backspace or ArrowLeft: Navigate to previous project
     */
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check if we're in the projects section
            const projectsSection = document.getElementById('projects');
            if (!projectsSection) return;

            // Check if the event target is within the projects section or if no specific element is focused
            const target = event.target as Element;
            const isInProjectsSection =
                projectsSection.contains(target) ||
                document.activeElement === document.body;

            if (!isInProjectsSection) return;

            // Handle keyboard navigation
            if (event.key === 'Enter' || event.key === 'ArrowRight') {
                event.preventDefault();
                if (canScrollRight) {
                    scroll('right');
                }
            } else if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
                event.preventDefault();
                if (canScrollLeft) {
                    scroll('left');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentProjectIndex, canScrollLeft, canScrollRight, scroll]);

    return (
        <div id="projects">
            <ImageBg imageSrc="./black-forest.svg">
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
                                            <div
                                                key={idx}
                                                className="min-w-full snap-center"
                                            >
                                                <ProjectCard {...project} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </LiquidGlass>

                        {/* Project indicator */}
                        <div className="absolute bottom--4 left-1/2 -translate-x-1/2 flex gap-2 my-2">
                            {projectsShowcase.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        idx === currentProjectIndex
                                            ? 'bg-white w-6'
                                            : 'bg-white/40'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Left Arrow */}
                        {canScrollLeft && (
                            <button
                                onClick={() => scroll('left')}
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
                                onClick={() => scroll('right')}
                                title="Next project"
                                aria-label="Next project"
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm transition-all opacity-100 hover:bg-white/30"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        )}
                    </div>
                </div>
                <ClassicWebsiteButton />
            </ImageBg>
        </div>
    );
}

export default Projects;
