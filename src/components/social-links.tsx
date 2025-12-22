import DiscordIcon from "@/assets/discord.svg";
import GithubIcon from "@/assets/github.svg";
import LinkedinIcon from "@/assets/linkedin.svg";
import MailIcon from "@/assets/mail.svg";
import MediumIcon from "@/assets/medium.svg";
import NpmIcon from "@/assets/npm.svg";
import XIcon from "@/assets/x.svg";
import type { SocialLink } from "@/types";
import Tooltip from "@/components/ui/tool-tip";

const iconBaseClasses = "transition-colors duration-200";
const svgImgClasses = `h-10 w-10 border-2 border-black rounded-[10px] p-1 group-hover:filter group-hover:brightness-0 ${iconBaseClasses} `; // Adjust size and hover effect for SVG images, and make them white

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/qwertuhh", // Replace with your actual GitHub URL
    icon: <img src={GithubIcon} alt="Github Icon" className={svgImgClasses} />,
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
    icon: (
      <img src={LinkedinIcon} alt="Linkedin Icon" className={svgImgClasses} />
    ),
  },
  {
    name: "Npm",
    url: "https://npmjs.com/~qwertuhh", // Replace with your actual LinkedIn profile
    icon: <img src={NpmIcon} alt="Linkedin Icon" className={svgImgClasses} />,
  },
  {
    name: "Mail",
    url: "mailto:arihantjain132407@gmail.com", // Replace with your actual LinkedIn profile
    icon: <img src={MailIcon} alt="Linkedin Icon" className={svgImgClasses} />,
  },
];

function SocialLinks() {
  return (
    <div className="flex flex-row gap-1">
      {socialLinks.map((socialLink) => {
        const { name, url, icon } = socialLink;
        return (
          <Tooltip label={name} className="">
            <a key={name} href={url} target="_blank" rel="noreferrer">
              {icon}
            </a>
          </Tooltip>
        );
      })}
    </div>
  );
}

export { SocialLinks };
