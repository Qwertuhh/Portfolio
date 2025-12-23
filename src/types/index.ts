type ProjectThumbnailType = "IMAGE" | "VIDEO";

interface Project {
  title: string;
  imageSrc: string;
  type: ProjectThumbnailType;
  description: string;
  tags: string[];
  githubLink: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface Skill {
  icon?: string;
  name: string;
  description: string;
}

export type { ProjectThumbnailType, Project, SocialLink, Skill };
