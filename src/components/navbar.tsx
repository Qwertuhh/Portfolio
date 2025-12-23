import { Code } from "lucide-react";

function Navbar() {
  const handleSmoothScroll = (elementId: string) => {
    console.log("Scrolling to:", elementId);
    const element = document.getElementById(elementId);
    if (element) {
      console.log("Element found:", elementId);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Element not found:", elementId);
    }
  };

  const handleGitHubClick = () => {
    console.log("Opening GitHub");
    window.open("https://github.com/qwertuhh", "_blank");
  };

  return (
    <nav className="flex flex-row justify-center items-center p-4 h-(--navbar-height) relative z-50">
      <div className="flex flex-row items-center justify-between gap-2 border-2 border-black rounded-full w-(--main-width) bg-white/90 backdrop-blur-sm">
        <img
          src="./profile-image/neutral_qwertuhh.svg"
          alt="neutral qwertuhh logo"
          className="w-16"
        />
        <div className="mx-auto">
          <ul className="flex flex-row gap-18 cascadia-code-semibold">
            <li>
              <button
                onClick={() => handleSmoothScroll("about-me")}
                className=" transition-colors cursor-pointer p-2 rounded"
              >
                About me
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSmoothScroll("projects")}
                className=" transition-colors cursor-pointer p-2 rounded"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={handleGitHubClick}
                className=" transition-colors cursor-pointer p-2 rounded"
                title="View GitHub"
              >
                <Code className="w-6 h-6" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
