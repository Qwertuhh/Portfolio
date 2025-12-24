import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

export default function Tooltip({
  label,
  children,
  className,
  textClassName,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={clsx("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            layout={false} // 🔒 prevents horizontal reflow
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 22,
            }}
            className={clsx(
              `
              pointer-events-none
              absolute -top-10 left-1/2 -translate-x-1/2
              origin-center
              text-xm
              whitespace-normal max-w-xs  sm:min-w-8
              rounded-lg
              doto-bold
              bg-(--neutral-900) px-3 py-1 my-4 text-white
              shadow-lg backdrop-blur
              bricolage-grotesque-regular
              wrap-break-word
              z-90
              `,
              textClassName
            )}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
