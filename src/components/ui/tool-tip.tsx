import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex"
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
            className="
              pointer-events-none
              absolute -top-10 left-1/2 -translate-x-1/2
              origin-center
              whitespace-nowrap rounded-lg
              doto-bold
              bg-(--neutral-900) px-3 py-1.5 text-xs text-white
              shadow-lg backdrop-blur
            "
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
