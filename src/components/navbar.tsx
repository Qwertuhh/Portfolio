import { Code } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex flex-row justify-center items-center p-4 h-(--navbar-height)">
      <div className="flex flex-row items-center justify-between gap-2 border-2 border-black rounded-full w-(--main-width)">
        <img
          src="./profile-image/neutral_qwertuhh.svg"
          alt="neutral qwertuhh logo"
          className="w-16"
        />
        <div className="mx-auto">
          <ul className="flex flex-row gap-18 cascadia-code-semibold">
            <li>About me</li>
            <li>Projects</li>
            <li><Code className="w-6 h-6"/></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
