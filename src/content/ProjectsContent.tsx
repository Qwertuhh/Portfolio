import type { JSX } from "react";

/**
 * ProjectsContent Component
 * Displays a list of personal projects.
 * This content will be rendered inside a Window component.
 */
const projects = [
  {
    title: "MyBackend",
    description: `
MyBackend is a large-scale project developed during my backend development journey. 
It explores key concepts like models, controllers, routers, request handling, and query optimization. 
I extensively tested APIs using Postman and worked with aggregation pipelines to improve data processing. 
The API will soon be publicly available with further enhancements planned.
    `,
    link: "https://github.com/Qwertuhh/MyBackend",
  },
  {
    title: "Task Management App",
    description:
      "A full-stack application using Node.js, Express, and MongoDB, with a React front-end for task tracking and collaboration.",
    link: "#",
  },
  {
    title: "Personal Blog Platform",
    description:
      "A static site generator based blog built with Next.js, allowing for fast content delivery and SEO optimization.",
    link: "#",
  },
];
const ProjectsContent = (): JSX.Element => (
  <div className="text-2xl text-[var(--header-one-color)] flex flex-col gap-1">
    <h2 className="text-3xl md:text-4xl font-bold text-left text-[var(--header-one-color)]">My Projects</h2>
    <p className="text-base font-light text-gray-300 text-left">
      Explore some of my flagship projects that demonstrate my expertise in
      creating intuitive and engaging digital solutions. Each project showcases
      a unique aspect of my skills and dedication to delivering high-quality
      user experiences.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <div
          key={project.title}
          className="bg-[var(--bg-window-bar-color)] p-4 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold text-blue-200 mb-2">
            {project.title}
          </h3>
          <p className="text-sm mb-3 font-light">{project.description}</p>
          <a
            href={project.link}
            className="text-blue-400 hover:underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </div>
      ))}
    </div>
  </div>
);
export default ProjectsContent;
