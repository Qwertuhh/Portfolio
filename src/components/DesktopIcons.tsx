import React from 'react';
import { Rocket, Signature, FolderGit2, Mail } from 'lucide-react';
import DesktopIcon from './DesktopIcon';

interface DesktopIconsProps {
  openWindow: (id: string, title: string, icon: React.ReactNode, content: React.ReactNode) => void;
  desktopIconsOptions: string;
  windowIconSize: string;
  AboutMeContent: React.ComponentType;
  ProjectsContent: React.ComponentType;
  GalleryContent: React.ComponentType;
  ContactContent: React.ComponentType;
}

const DesktopIcons: React.FC<DesktopIconsProps> = ({
  openWindow,
  desktopIconsOptions,
  windowIconSize,
  AboutMeContent,
  ProjectsContent,
  GalleryContent,
  ContactContent
}) => {
  return (
    <div className="fixed inset-0 p-4 md:p-8">
      <div className="bg-[var(--bg-desktop-icon-color)] p-2 md:p-4 rounded-lg fixed bottom-4 left-1/2 transform -translate-x-1/2 w-auto max-w-[95vw] md:max-w-none">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <DesktopIcon
            icon={<Signature className={desktopIconsOptions} />}
            label="About Me"
            onClick={() =>
              openWindow("about", "About Me", <Signature className={windowIconSize} />, <AboutMeContent />)
            }
          />
          <DesktopIcon
            icon={<Rocket className={desktopIconsOptions} />}
            label="My Projects"
            onClick={() =>
              openWindow("projects", "My Projects", <Rocket className={windowIconSize} />, <ProjectsContent />)
            }
          />
          <DesktopIcon
            icon={<FolderGit2 className={desktopIconsOptions} />}
            label="Gallery"
            onClick={() =>
              openWindow("gallery", "Gallery", <FolderGit2 className={windowIconSize} />, <GalleryContent />)
            }
          />
          <DesktopIcon
            icon={<Mail className={desktopIconsOptions} />}
            label="Contact"
            onClick={() =>
              openWindow("contact", "Contact", <Mail className={windowIconSize} />, <ContactContent />)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopIcons;
