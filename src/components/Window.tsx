import { useState, useEffect, useRef } from "react";
import type { MouseEvent, TouchEvent, JSX } from "react";
import type { WindowProps } from "../types"; // Import the interface
import { CircleX, Maximize2, Minimize2 } from "lucide-react"; // Re-added Maximize/Minimize icons

/**
 * Window Component
 * A reusable, draggable, closable, and RESIZABLE window (modal) component.
 * It mimics a desktop window, allowing users to move, close, resize, and maximize/minimize it.
 *
 * @param {WindowProps} props - The props for the component.
 * @param {string} props.id - Unique identifier for the window.
 * @param {string} props.title - The title displayed in the window's title bar.
 * @param {ReactNode} props.children - The content to be displayed inside the window.
 * @param {(id: string) => void} props.onClose - Callback function to close the window.
 * @param {number} props.initialX - Initial X position of the window.
 * @param {number} props.initialY - Initial Y position of the window.
 * @param {number} props.zIndex - Z-index for layering windows.
 * @param {boolean} props.isActive - Indicates if this is the currently active/focused window.
 * @param {(id: string) => void} props.onFocus - Callback to bring the window to the front.
 * @param {boolean} props.isOpen - (Primarily controlled by parent rendering) indicates if the window should be visible.
 */
const Window = ({
  id,
  title,
  icon,
  children,
  onClose,
  initialX,
  initialY,
  zIndex,
  isActive,
  onFocus,
}: // isOpen, // This prop is typically used by the PARENT to conditionally render the Window component.
// If the component is rendered, we assume it's "open".
// We'll keep it in the type for clarity, but the component itself doesn't need to "hide" based on it.
WindowProps & { isOpen?: boolean }): JSX.Element => {
  // Made isOpen optional as its main use is parent rendering
  const windowRef = useRef<HTMLDivElement>(null);

  // State for position (draggable)
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: initialX,
    y: initialY,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // State for size (resizable)
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: Math.min(window.innerWidth * 0.8, 800), // Max 80% of viewport width or 800px
    height: Math.min(window.innerHeight * 0.7, 600), // Max 70% of viewport height or 600px
  });
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const [initialMousePos, setInitialMousePos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // State for maximization
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [prevSize, setPrevSize] = useState<{ width: number; height: number }>(
    size
  );
  const [prevPosition, setPrevPosition] = useState<{ x: number; y: number }>(
    position
  );

  // --- Effect for Dragging and Resizing ---
  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent): void => {
      if (isDragging) {
        // Update position based on mouse movement, using transform for smoothness
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      } else if (isResizing && resizeDirection) {
        const deltaX = e.clientX - initialMousePos.x;
        const deltaY = e.clientY - initialMousePos.y;

        let newWidth = initialSize.width;
        let newHeight = initialSize.height;
        let newX = initialPosition.x;
        let newY = initialPosition.y;

        // Determine new dimensions and potentially new position based on resize direction
        switch (resizeDirection) {
          case "bottom-right":
            newWidth = Math.max(300, initialSize.width + deltaX);
            newHeight = Math.max(200, initialSize.height + deltaY);
            break;
          case "bottom-left":
            newWidth = Math.max(300, initialSize.width - deltaX);
            newHeight = Math.max(200, initialSize.height + deltaY);
            newX = initialPosition.x + deltaX;
            break;
          case "top-right":
            newWidth = Math.max(300, initialSize.width + deltaX);
            newHeight = Math.max(200, initialSize.height - deltaY);
            newY = initialPosition.y + deltaY;
            break;
          case "top-left":
            newWidth = Math.max(300, initialSize.width - deltaX);
            newHeight = Math.max(200, initialSize.height - deltaY);
            newX = initialPosition.x + deltaX;
            newY = initialPosition.y + deltaY;
            break;
          case "right":
            newWidth = Math.max(300, initialSize.width + deltaX);
            break;
          case "left":
            newWidth = Math.max(300, initialSize.width - deltaX);
            newX = initialPosition.x + deltaX;
            break;
          case "bottom":
            newHeight = Math.max(200, initialSize.height + deltaY);
            break;
          case "top":
            newHeight = Math.max(200, initialSize.height - deltaY);
            newY = initialPosition.y + deltaY;
            break;
          default:
            break;
        }

        // Clamp dimensions to window bounds
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        newWidth = Math.min(newWidth, viewportWidth);
        newHeight = Math.min(newHeight, viewportHeight);

        // Clamp position to keep window within viewport
        newX = Math.max(0, Math.min(newX, viewportWidth - newWidth));
        newY = Math.max(0, Math.min(newY, viewportHeight - newHeight));

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleGlobalMouseUp = (): void => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [
    isDragging,
    dragOffset,
    isResizing,
    resizeDirection,
    initialMousePos,
    initialSize,
    initialPosition,
  ]);

  // --- Initial Position on Mount (Responsive Centering) ---
  useEffect(() => {
    if (windowRef.current && !isMaximized) {
      const windowWidth = size.width;
      const windowHeight = size.height;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate a more responsive initial position
      const initialXCentered = Math.max(
        0,
        (viewportWidth - windowWidth) / 2 + (id.charCodeAt(0) % 50) - 25
      ); // Slight offset per window
      const initialYCentered = Math.max(
        0,
        (viewportHeight - windowHeight) / 2 + (id.charCodeAt(1) % 50) - 25
      );

      // Ensure window doesn't go off-screen initially
      setPosition({
        x: Math.min(initialXCentered, viewportWidth - windowWidth),
        y: Math.min(initialYCentered, viewportHeight - windowHeight),
      });
    }
  }, [id, size, isMaximized]); // Recalculate if ID or size changes, but not if maximized

  // --- Event Handlers ---

  const handleMouseDown = (e: MouseEvent | TouchEvent): void => {
    // Bring to front
    onFocus(id);

    // Only allow dragging from the title bar
    const target = e.target as HTMLElement;
    if (
      windowRef.current &&
      windowRef.current.contains(target) &&
      target.closest(".window-title-bar") &&
      !isMaximized // Cannot drag when maximized
    ) {
      setIsDragging(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setDragOffset({
        x: clientX - position.x,
        y: clientY - position.y,
      });
    }
  };

  const handleResizeMouseDown = (
    e: MouseEvent | TouchEvent,
    direction: string
  ): void => {
    e.stopPropagation(); // Prevent dragging if resizing
    onFocus(id); // Bring to front
    setIsResizing(true);
    setResizeDirection(direction);

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    setInitialMousePos({ x: clientX, y: clientY });
    setInitialSize({ width: size.width, height: size.height });
    setInitialPosition({ x: position.x, y: position.y });
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      // Restore from maximized
      setSize(prevSize);
      setPosition(prevPosition);
      setIsMaximized(false);
    } else {
      // Maximize
      setPrevSize(size); // Save current size
      setPrevPosition(position); // Save current position
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setIsMaximized(true);
      
    }
  };

  // --- Render ---
  // The 'isOpen' prop is typically handled by the parent component that conditionally
  // renders this Window component. If it's rendered, it's considered "open".
  // So, no explicit check like `return isOpen ? (...) : null;` is usually needed here
  // unless you want internal fade-in/out animations based on it.
  return (
    <div
      ref={windowRef}
      className={`absolute backdrop-blur-sm bg-[var(--bg-window-color)] bg-opacity-95 rounded-lg shadow-2xl overflow-hidden flex flex-col
                  transition-all duration-150 ease-out ${
                    // Added transition for smooth movement
                    isActive ? "ring-0.5 ring-white" : ""
                  } ${isMaximized ? "maximized-window" : ""}`}
      style={{
        left: 0, // Using transform for position
        top: 0, // Using transform for position
        width: isMaximized ? "100vw" : `${size.width}px`,
        height: isMaximized ? "100vh" : `${size.height}px`,
        zIndex: zIndex,
        minWidth: isMaximized ? "100vw" : "300px",
        minHeight: isMaximized ? "100vh" : "200px",
        maxWidth: isMaximized ? "100vw" : "95vw", // Maximize takes full width
        maxHeight: isMaximized ? "100vh" : "95vh", // Maximize takes full height
        transform: `translate3d(${position.x}px, ${position.y}px, 0) ${
          isDragging ? "scale(1.005)" : "scale(1)" // Subtle scale on drag
        }`,
        cursor: isDragging ? "grabbing" : isResizing ? "crosshair" : "default", // More precise cursor
      }}
      onMouseDown={handleMouseDown} // Handle focus and drag start on window body (not title bar)
      onTouchStart={handleMouseDown} // Handle focus and drag start on touch
    >
      {/* Resize Handles (only visible when not maximized) */}
      {!isMaximized && (
        <>
          <div
            className="absolute w-2 h-full top-0 right-0 cursor-ew-resize z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, "right")}
            onTouchStart={(e) => handleResizeMouseDown(e, "right")}
          />
          <div
            className="absolute w-2 h-full top-0 left-0 cursor-ew-resize z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, "left")}
            onTouchStart={(e) => handleResizeMouseDown(e, "left")}
          />
          <div
            className="absolute h-2 w-full bottom-0 left-0 cursor-ns-resize z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
            onTouchStart={(e) => handleResizeMouseDown(e, "bottom")}
          />
          <div
            className="absolute h-2 w-full top-0 left-0 cursor-ns-resize z-10"
            onMouseDown={(e) => handleResizeMouseDown(e, "top")}
            onTouchStart={(e) => handleResizeMouseDown(e, "top")}
          />
          <div
            className="absolute w-4 h-4 bottom-0 right-0 cursor-nwse-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
            onTouchStart={(e) => handleResizeMouseDown(e, "bottom-right")}
          />
          <div
            className="absolute w-4 h-4 bottom-0 left-0 cursor-nesw-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
            onTouchStart={(e) => handleResizeMouseDown(e, "bottom-left")}
          />
          <div
            className="absolute w-4 h-4 top-0 right-0 cursor-nesw-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
            onTouchStart={(e) => handleResizeMouseDown(e, "top-right")}
          />
          <div
            className="absolute w-4 h-4 top-0 left-0 cursor-nwse-resize z-20"
            onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
            onTouchStart={(e) => handleResizeMouseDown(e, "top-left")}
          />
        </>
      )}

      {/* Window Title Bar */}
      <div
        className="window-title-bar flex-shrink-0 flex justify-between items-center bg-[var(--bg-window-bar-color)] text-white p-2 cursor-grab rounded-t-lg select-none"
        onMouseDown={handleMouseDown} // Title bar specifically for drag initiation
        onTouchStart={handleMouseDown} // Title bar specifically for touch drag initiation
        onDoubleClick={toggleMaximize} // Maximize on double click
      >
        <span className="font-semibold text-sm md:text-base flex flex-row items-center gap-1 playfair-display-regular truncate">
          {icon}
          {title}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleMaximize}
            className="text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 hover:bg-green-500 hover:bg-opacity-20"
            aria-label={isMaximized ? "Restore window" : "Maximize window"}
          >
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={() => onClose(id)}
            className="text-white w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold transition-colors duration-200 hover:bg-red-500"
            aria-label={`Close ${title} window`}
          >
            <CircleX size={16} />
          </button>
        </div>
      </div>

      {/* Window Content Area */}
      {/* flex-grow ensures content area takes remaining space, overflow-y-auto enables scrolling */}
      <div className="p-4 flex-grow overflow-y-auto text-gray-200 text-sm md:text-base custom-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Window;
