import type { ReactNode } from "react";

// Interface for a single open window object
interface OpenWindow {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
  x: number;
  y: number;
  zIndex: number;
}

// Interface for DesktopIcon component props
interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

// Interface for Window component props
interface WindowProps {
  id: string;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  onClose: (id: string) => void;
  initialX: number;
  initialY: number;
  zIndex: number;
  isActive: boolean;
  onFocus: (id: string) => void;
}

export type { OpenWindow, DesktopIconProps, WindowProps };