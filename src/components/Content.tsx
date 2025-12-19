import { Gift } from "lucide-react";
function Content() {
  return (
    <div className="flex flex-col justify-center items-center fira-code-regular w-full max-w-4xl mx-auto">
      <div className="flex flex-col justify-center items-center mx-4 p-4 w-3xl ">
        <p className="jetbrains-mono-regular text-xl text-left">
          Welcome to my portfolio, where I showcase some of my best work and
          share my story as a developer. always looking for ways to improve my
          craft.
        </p>
        <p className="text-xl text-left">
          An enthusiastic learner who is greatly interested in programming and
          Applied Artificial Intelligence. With a strong programming background,
          I started my journey since <b>7th grade</b> to solve real-world
          problems.
        </p>
      </div>
      <h2 className="flex flex-row gap-2">
        <Gift /> <span className="font-bold">1st January, 2010</span>
      </h2>
      <img
        src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg"
        alt="snake game"
      />
    </div>
  );
}

export default Content;
