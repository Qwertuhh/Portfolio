type ProjectThumbnailType = "IMAGE" | "VIDEO";

interface Project {
  title: string;
  imageSrc: string;
  type: ProjectThumbnailType;
  description: string;
  tags: string[];
  githubLink: string;
}

export type { ProjectThumbnailType, Project };
