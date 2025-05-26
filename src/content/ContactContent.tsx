import type { JSX } from "react";
import { Github, Linkedin, Mail } from "lucide-react"; // Import icons from lucide-react
// Import SVG assets as strings (their file paths)
import XIcon from "../assets/x.svg"; // Renamed to avoid conflict with JSX element 'X'
import DiscordIcon from "../assets/discord.svg"; // Renamed
import MediumIcon from "../assets/medium.svg"; // Renamed

/**
 * ContactContent Component
 * Provides contact information and links to social profiles.
 * This content will be rendered inside a Window component.
 */

interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

const iconSize = 24;
// This class will be applied to Lucide icons directly, and to img tags.
// For img tags, filter-invert might be needed if SVGs are black on transparent.
const iconBaseClasses = "transition-colors duration-200";
const lucideIconClasses = `text-gray-300 group-hover:text-white ${iconBaseClasses}`;
const svgImgClasses = `h-6 w-6 group-hover:filter group-hover:brightness-0 invert ${iconBaseClasses} `; // Adjust size and hover effect for SVG images, and make them white

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/qwertuhh", // Replace with your actual GitHub URL
    icon: <Github size={iconSize} className={lucideIconClasses} />,
  },
  {
    name: "X",
    url: "https://twitter.com/your_x_handle", // Replace with your actual X handle
    icon: <img src={XIcon} alt="X Icon" className={svgImgClasses} />,
  },
  {
    name: "Discord",
    url: "https://discordapp.com/users/yourdiscordid", // Replace with your actual Discord ID or server invite
    icon: (
      <img src={DiscordIcon} alt="Discord Icon" className={svgImgClasses} />
    ),
  },
  {
    name: "Medium",
    url: "https://medium.com/@yourmediumhandle", // Replace with your actual Medium URL
    icon: <img src={MediumIcon} alt="Medium Icon" className={svgImgClasses} />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourlinkedinprofile", // Replace with your actual LinkedIn profile
    icon: <Linkedin size={iconSize} className={lucideIconClasses} />,
  },
];

const ContactContent = (): JSX.Element => (
  <div className="space-y-6 p-4 sm:p-6 lg:p-8">
    <h2 className="text-3xl md:text-4xl font-bold text-[var(--header-one-color)] text-center">
      Get in Touch!
    </h2>
    <p className="text-base md:text-lg text-white text-center leading-relaxed">
      I'm always open to new opportunities, collaborations, or just a friendly
      chat. Feel free to reach out through any of the channels below!
    </p>
    <div className="flex flex-col items-center justify-center space-y-2">
      {/* Email Contact */}
      <div className="flex space-x-3 bg-[var(--bg-window-bar-color)] w-lg bg-opacity-50 p-3 rounded-lg shadow-md hover:bg-opacity-70 transition-all duration-200 cursor-pointer justify-center items-center">
        <Mail size={24} className="text-white" />
        <a
          href="mailto:arihantjain132407+portfolio@gmail.com"
          className="text-white text-lg md:text-xl font-medium hover:underline"
        >
          <span className="font-medium font-mono">
            arihantjain132407+portfolio@gmail.com{" "}
          </span>
          {/* Replace with your actual email */}
        </a>
      </div>
      {/* Social Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-lg">
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center space-x-3 p-3 sm:p-4 rounded-lg bg-[var(--bg-window-bar-color)] bg-opacity-50 shadow-md
                       hover:bg-opacity-70 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {item.icon}{" "}
            {/* This will now correctly render either Lucide or an img tag */}
            <span className="text-white text-base md:text-lg font-medium group-hover:text-blue-300 transition-colors duration-200">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </div>
    <hr className="w-full h-0.5 my-2" />
    <a href="https://git.io/typing-svg">
      <img
        src="https://readme-typing-svg.demolab.com?font=%22Playwrite+AT%22&size=24&letterSpacing=2px&pause=1000&color=447CF7&background=00000001&random=false&width=435&lines=Thanks+for+connecting"
        alt="Typing SVG"
      />
    </a>
  </div>
);

export default ContactContent;
