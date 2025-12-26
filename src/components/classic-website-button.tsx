import { useWebsiteRouter } from '@/hooks/useWebsiteRouter';
import Tooltip from '@/components/ui/tool-tip';
import useSFX from '@/hooks/useSFX';

function ClassicWebsiteButton() {
    const handleClassicWebsiteClick = useWebsiteRouter(
        'https://qwertuhh-classic.netlify.app/'
    );
    return (
        <div
            className="flex justify-center"
            onMouseEnter={useSFX('hover3', 'classic-website')}
        >
            <Tooltip label="This is my old portfolio website" className="">
                <button
                    onClick={handleClassicWebsiteClick}
                    className="league-script-regular z-45 text-4xl mx-6 my-4 text-white cursor-pointer"
                >
                    visit my{' '}
                    <span className="rouge-script-regular">Classic</span>{' '}
                    Website
                </button>
            </Tooltip>
        </div>
    );
}

export default ClassicWebsiteButton;
