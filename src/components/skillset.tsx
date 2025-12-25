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
  { name: "Bun", icon: BunIcon, description: "Bun is a fast, secure, and cross-platform and my favourite JavaScript runtime." },
  { name: "NPM", icon: NpmIcon, description: "JS script package manager" },
  { name: "Git", icon: GitIcon, description: "Version control system" },
  { name: "GitHub", icon: GithubIcon, description: "Code hosting platform" },
  { name: "JavaScript", icon: JsIcon, description: "My favourite programming language" },
  { name: "React", icon: ReactIcon, description: "Most popular JS library" },
  { name: "TypeScript", icon: TsIcon, description: "This programming language makes JS my favourite, well it's a not interpreter directly by runtime enviroment." },
  { name: "Node.js", icon: NodeIcon, description: "Most popular JS runtime enviroment but like Bun" },
  { name: "Python", icon: PythonIcon, description: "Everybody loves it but I hate it!" },
  { name: "Rust", icon: RustIcon, description: "I know it's bold concepts but I'm learning it" },
  { name: "MongoDB", icon: MongoIcon, description: "My first inrtoduction to Database" },
  { name: "Prisma", icon: PrismaIcon, description: "Best for migration of a database" },
  { name: "Next.js", icon: NextIcon, description: "Best JS fullstack Framework" },
  { name: "Netlify", icon: NetlifyIcon, description: "Nice static site host" },
  { name: "Docusaurus", icon: DocusaurusIcon, description: "Best framework to host docs" },
];
function SkillSet() {
  return (
    <div className="flex flex-row flex-wrap h-auto">
      {skillSet.map((skill, idx) => {
        return (
            <IconBadge {...skill} key={idx}/>
        );  
      })}
    </div>
  );
}

export default SkillSet;
