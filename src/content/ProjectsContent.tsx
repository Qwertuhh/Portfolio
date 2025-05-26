import { Package, PanelTop } from "lucide-react";
import type { JSX } from "react";
/**
 * ProjectsContent Component
 * Displays a list of personal projects.
 * This content will be rendered inside a Window component.
 */
const projects = [
  {
    title: "MyBackend",
    icon: <PanelTop className="w-6 h-6 inline-block mr-2" />,
    description: `
    <p class="my-4">
    MyBackend is a large-scale project developed during my backend development journey. 
    It explores key concepts like models, controllers, routers, request handling, and query optimization. 
    I extensively tested APIs using Postman and worked with aggregation pipelines to improve data processing. 
    The API will soon be publicly available with further enhancements planned.
    </p>
    `,
    link: "https://github.com/Qwertuhh/MyBackend",
    badges: ["Node.js", "Express", "MongoDB"],
  },
  {
    title: "welltrack",
    icon: <PanelTop className="w-6 h-6 inline-block mr-2" />,
    description: `
    <p class="my-4">
    WellTrack is a web app developed for a hackathon pitch, designed to help users seamlessly record daily entries, track habits, and monitor their mood. AI integration plays a key role in optimizing task management and enhancing the user experience. While the app showcases its core functionality, it is not production-ready, requiring significant improvements before deployment. <span class="text-blue-500">Let me know if you'd like any tweaks!</span>
    </p>`,
    link: "https://github.com/Qwertuhh/welltrack",
    badges: ["React", "AI", "Web Development"],
  },
  {
    title: "ObjBranch",
    icon: (
     <Package className="w-6 h-6 inline-block mr-2" />
    ),
    description: `
      <p class="my-4">
        obj-branch is a JavaScript module designed to simplify operations on adjacent fields within an object, enabling convenient manipulations of object properties. With support for arithmetic operations like addition, subtraction, multiplication, division, and modulo, developers can efficiently perform calculations on structured data. Easily installable via npm, obj-branch streamlines data processing with intuitive syntax for branching and field operations. Contributions and enhancements are welcomed to further refine its functionality. &nbsp;<span class="text-blue-500">Let me know if you'd like any tweaks!</span>
      </p>`,
    link: "https://github.com/Qwertuhh/objbranch",
    badges: ["JavaScript", "npm", "Module"],
  },
];

const ProjectsContent = (): JSX.Element => (
  <div className="text-2xl text-[var(--header-one-color)] flex flex-col gap-1">
    <h2 className="text-3xl md:text-4xl font-bold text-left text-[var(--header-one-color)]">
      My Projects
    </h2>
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
          <h3 className="text-xl font-semibold text-[var( --header-two-color)] mb-2">
            {project.icon}
            {project.title}
          </h3>
          <div
            className="text-sm mb-3 font-light"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
          <div className="flex space-x-2 mb-3">
            {project.badges.map((badge, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
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
    <hr className="w-full h-0.5 my-2" />
    <a href="https://git.io/typing-svg">
      <img
        src="https://readme-typing-svg.demolab.com?font=%22Playwrite+AT%22&size=24&letterSpacing=2px&pause=1000&color=447CF7&background=00000001&random=false&width=435&lines=Thanks+for+reviewing"
        alt="Typing SVG"
      />
    </a>
  </div>
);

export default ProjectsContent;
