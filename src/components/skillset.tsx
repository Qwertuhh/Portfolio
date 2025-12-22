import type { Skill } from "@/types";

import BunIcon from "@/assets/bun.svg";
import NpmIcon from "@/assets/npm.svg";
import GitIcon from "@/assets/git.svg";
import GithubIcon from "@/assets/github.svg";
import JsIcon from "@/assets/js.svg";
import ReactIcon from "@/assets/react.svg";
import TsIcon from "@/assets/typescript.svg";
import NodeIcon from "@/assets/nodejs.svg";
import PythonIcon from "@/assets/python.svg";
import RustIcon from "@/assets/rust.svg";
import MongoIcon from "@/assets/mongodb.svg";
import PrismaIcon from "@/assets/prisma.svg";
import NextIcon from "@/assets/nextjs.svg";
import NetlifyIcon from "@/assets/netlify.svg";
import DocusaurusIcon from "@/assets/docusaurus.svg";

import IconBadge from "@/components/ui/icon-badge";

const skillSet: Skill[] = [
  { name: "Bun", icon: BunIcon },
  { name: "NPM", icon: NpmIcon },
  { name: "Git", icon: GitIcon },
  { name: "GitHub", icon: GithubIcon },
  { name: "JavaScript", icon: JsIcon },
  { name: "React", icon: ReactIcon },
  { name: "TypeScript", icon: TsIcon },
  { name: "Node.js", icon: NodeIcon },
  { name: "Python", icon: PythonIcon },
  { name: "Rust", icon: RustIcon },
  { name: "MongoDB", icon: MongoIcon },
  { name: "Prisma", icon: PrismaIcon },
  { name: "Next.js", icon: NextIcon },
  { name: "Netlify", icon: NetlifyIcon },
  { name: "Docusaurus", icon: DocusaurusIcon },
];
function SkillSet() {
  return (
    <div className="flex flex-row flex-wrap h-auto">
      {skillSet.map((skill, idx) => {
        const { name, icon } = skill;
        return (

          <IconBadge
            icon={icon}
            label={name}
            key={idx}
            />
        );
      })}
    </div>
  );
}

export default SkillSet;
