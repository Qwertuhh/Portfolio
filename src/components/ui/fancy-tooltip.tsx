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

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

export default function Tooltip({
  label,
  children,
  className,
  textClassName,
  ...props
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
  props?: unknown;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={clsx("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
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
