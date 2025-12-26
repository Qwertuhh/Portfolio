import { Code, Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (elementId: string) => {
    console.log("Scrolling to:", elementId);
    const element = document.getElementById(elementId);
    if (element) {
      console.log("Element found:", elementId);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.error("Element not found:", elementId);
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleGitHubClick = () => {
    console.log("Opening GitHub");
    window.open("https://github.com/qwertuhh/portfolio", "_blank");
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="flex flex-row justify-center items-center p-4 h-(--navbar-height) relative z-50">
      <div className="flex flex-row items-center justify-between gap-2 border-2 border-black rounded-full w-(--main-width) bg-white/90 backdrop-blur-sm">
        <img
          src="./profile-image/neutral_qwertuhh.svg"
          alt="neutral qwertuhh logo"
          className="w-16"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:block mx-auto">
          <ul className="flex flex-row gap-18 cascadia-code-semibold">
            <li>
              <button
                onClick={() => handleSmoothScroll("about-me")}
                className=" transition-colors cursor-pointer p-2 rounded hover:underline"
              >
                About me
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSmoothScroll("projects")}
                className=" transition-colors cursor-pointer p-2 rounded hover:underline"
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 pr-6 rounded transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 cursor-pointer" />
          ) : (
            <Menu className="w-6 h-6 cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-(--main-width) bg-white/90 backdrop-blur-sm border-2 border-black rounded-[40px] p-4">
          <ul className="flex flex-col gap-4 cascadia-code-semibold text-center">
            <li>
              <button
                onClick={() => handleSmoothScroll("about-me")}
                className=" transition-colors cursor-pointer p-2 rounded w-full"
              >
                About me
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSmoothScroll("projects")}
                className=" transition-colors cursor-pointer p-2 rounded w-full"
              >
                Projects
              </button>
            </li>
            <li>
              <button
                onClick={handleGitHubClick}
                className=" transition-colors cursor-pointer p-2 rounded w-full flex items-center justify-center gap-2"
                title="View GitHub"
              >
                <Code className="w-6 h-6" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
