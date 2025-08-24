import type { JSX } from "react";

/**
 * AboutMeContent Component
 * Displays information about the portfolio owner.
 * This content will be rendered inside a Window component.
 */

const AboutMeContent = (): JSX.Element => (
  <div className="text-2xl font-bold text-[var(--header-one-color)] flex flex-col gap-1">
    Hi, I'm Qwertuhh
    <img src="qwertuhh_banner.png" alt="qwertuhh banner" className="max-h-60 w-auto" />
    <p className="text-sm font-light text-white ">
      Welcome to my portfolio, where I showcase some of my favorite projects and
      share my story as a web developer. I'm passionate about creating
      user-friendly digital experiences and always looking for ways to improve
      my craft.
    </p>
    <hr className="w-full h-0.5 my-2" />
    <p className="text-sm font-light text-white flex items-center gap-2">
      I'm also know as
      <span className="font-bold flex items-center gap-2 text-2xl underline">
        <img
          src="arihant_jain.png"
          alt="arihant jain"
          className="w-8 h-8 rounded-full"
        />
        Arihant Jain
      </span>
    </p>
    <hr className="w-full h-0.5 my-2" />
    <img
      alt="github contribution grid snake animation"
      src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg"
    />
    <p className="text-md font-light text-white my-2">
      I am a learner pursuing quantum science and AI, and I began my programming
      journey in 7th grade.
    </p>
    <h3 className="text-lg font-semibold text-left">Languages and Tools</h3>
    <div className="flex flex-wrap items-center space-x-2 gap-1">
      <img
        src="https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white"
        alt="C++"
      />
      <img
        src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"
        alt="CSS3"
      />
      <img
        src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"
        alt="HTML5"
      />
      <img
        src="https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white"
        alt="C"
      />
      <img
        src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"
        alt="JavaScript"
      />
      <img
        src="https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white"
        alt="Markdown"
      />
      <img
        src="https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white"
        alt="Rust"
      />
      <img
        src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"
        alt="TypeScript"
      />
      <img
        src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54"
        alt="Python"
      />
      <img
        src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7"
        alt="Netlify"
      />
      <img
        src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"
        alt="Vercel"
      />
      <img
        src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi"
        alt="FastAPI"
      />
      <img
        src="https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white"
        alt="NPM"
      />
      <img
        src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"
        alt="Next JS"
      />
      <img
        src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"
        alt="NodeJS"
      />
      <img
        src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"
        alt="JWT"
      />
      <img
        src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"
        alt="Express.js"
      />
      <img
        src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
        alt="React"
      />
      <img
        src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101"
        alt="Socket.io"
      />
      <img
        src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"
        alt="MongoDB"
      />
      <img
        src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"
        alt="Postgres"
      />
      <img
        src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white"
        alt="Figma"
      />
      <img
        src="https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white"
        alt="Canva"
      />
      <img
        src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white"
        alt="Notion"
      />
      <img
        src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white"
        alt="Postman"
      />
      <img
        src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"
        alt="Docker"
      />
    </div>
    <hr className="w-full h-0.5 my-2" />
    <img
      src="https://komarev.com/ghpvc/?username=qwertuhh&style=for-the-badge&color=blue"
      alt="Profile viewed"
      className="w-40"
    />
    <hr className="w-full h-0.5 my-2" />
    <div className="flex justify-center">
      <a href="https://git.io/typing-svg">
        <img
          src="https://readme-typing-svg.demolab.com?font=%22Playwrite+AT%22&size=24&letterSpacing=2px&pause=1000&color=447CF7&background=00000001&random=false&width=435&lines=Thanks+for+visting"
          alt="Typing SVG"
          className="w-[26rem]"
        />
      </a>
    </div>
  </div>
);

export default AboutMeContent;
