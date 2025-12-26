/**
 * Copyright (c) 2025 Arihant Jain, Qwertuhh
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
