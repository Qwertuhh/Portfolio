import { type ReactNode } from "react";

type ProjectThumbnailType = "IMAGE" | "VIDEO";

interface Project {
  title: string;
  imageSrc: string;
  type: ProjectThumbnailType;
  description: string;
  tags: string[];
  sourceCodeLink: string;
  previewLink?: string;
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

// * Audio Types

interface AudioContextType {
  muted: boolean;
  volume: number;
  toggleMute: () => void;
  changeVolume: (value: number) => void;
}

interface AudioProviderProps {
  children: ReactNode;
}

export type {
  ProjectThumbnailType,
  Project,
  SocialLink,
  Skill,
  AudioContextType,
  AudioProviderProps,
};
