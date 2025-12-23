import { useWebsiteRouter } from "@/hooks/useWebsiteRouter";
import Tooltip from "@/components/ui/tool-tip";

function ClassicWebsiteButton() {
  const handleClassicWebsiteClick = useWebsiteRouter(
    "https://qwertuhh-portfolio.netlify.app/"
  );
  return (
    <div className="flex justify-center">
      <Tooltip label="This is my old portfolio website" className="">
        <button
          onClick={handleClassicWebsiteClick}
          className="league-script-regular z-45 text-4xl mx-6 my-4 text-white"
        >
          visit my <span className="rouge-script-regular">Classic</span> Website
        </button>
      </Tooltip>
    </div>
  );
}

export default ClassicWebsiteButton;
