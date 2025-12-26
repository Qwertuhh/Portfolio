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

import DiscordIcon from "@/assets/discord.svg";
import GithubIcon from "@/assets/github.svg";
import LinkedinIcon from "@/assets/linkedin.svg";
import MailIcon from "@/assets/mail.svg";
import MediumIcon from "@/assets/medium.svg";
import NpmIcon from "@/assets/npm.svg";
import XIcon from "@/assets/x.svg";
import type { SocialLink } from "@/types";
import Tooltip from "@/components/ui/tool-tip";
import useSFX from "@/hooks/useSFX";

const socialIconClass = `transition-colors duration-200 h-10 w-10 border-2 border-black rounded-[10px] p-1 group-hover:filter group-hover:brightness-0`;
const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/qwertuhh", // Replace with your actual GitHub URL
    icon: (
      <img src={GithubIcon} alt="Github Icon" className={socialIconClass} />
    ),
  },
  {
    name: "X",
    url: "https://twitter.com/your_x_handle", // Replace with your actual X handle
    icon: <img src={XIcon} alt="X Icon" className={socialIconClass} />,
  },
  {
    name: "Discord",
    url: "https://discordapp.com/users/yourdiscordid", // Replace with your actual Discord ID or server invite
    icon: (
      <img src={DiscordIcon} alt="Discord Icon" className={socialIconClass} />
    ),
  },
  {
    name: "Medium",
    url: "https://medium.com/@yourmediumhandle", // Replace with your actual Medium URL
    icon: (
      <img src={MediumIcon} alt="Medium Icon" className={socialIconClass} />
    ),
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourlinkedinprofile", // Replace with your actual LinkedIn profile
    icon: (
      <img src={LinkedinIcon} alt="Linkedin Icon" className={socialIconClass} />
    ),
  },
  {
    name: "Npm",
    url: "https://npmjs.com/~qwertuhh", // Replace with your actual LinkedIn profile
    icon: <img src={NpmIcon} alt="Linkedin Icon" className={socialIconClass} />,
  },
  {
    name: "Mail",
    url: "mailto:arihantjain132407@gmail.com", // Replace with your actual LinkedIn profile
    icon: (
      <img src={MailIcon} alt="Linkedin Icon" className={socialIconClass} />
    ),
  },
];

function SocialLinks() {
  const clickSound = useSFX("click", "social-link");
  const hoverSound = useSFX("hover", "social-link");

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-1">
        {socialLinks.map((socialLink) => {
          const { name, url, icon } = socialLink;
          return (
            <Tooltip label={name} key={name}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                onClick={clickSound}
                onMouseEnter={hoverSound}
              >
                {icon}
              </a>
            </Tooltip>
          );
        })}
      </div>
      <p className="league-script-regular text-3xl">Connect with me </p>
    </div>
  );
}

export default SocialLinks;
