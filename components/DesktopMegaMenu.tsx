"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MegaChild = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
};

type MegaItem = {
  id: string;
  label: string;
  children?: MegaChild[];
};

export type DesktopMegaMenuProps = {
  items: MegaItem[];
  headerHeight?: number; // px; used to place panel below header
  maxCols?: number;      // clamp columns if many children
};

export function DesktopMegaMenu({
  items,
  headerHeight = 80, // ~ h-20 (matches your navbar height)
  maxCols = 5,
}: DesktopMegaMenuProps) {
  const [active, setActive] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const closeTimer = React.useRef<number | null>(null);

  const activeItem = React.useMemo(
    () => items.find(i => i.id === active),
    [items, active]
  );

  const hasChildren = (i?: MegaItem | null) => (i?.children?.length ?? 0) > 0;

  function openFor(id: string | null) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActive(id);
    setOpen(Boolean(id));
  }

  function delayedClose(delay = 120) {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      setActive(null);
    }, delay);
  }

  const cols = Math.max(
    1,
    Math.min(maxCols, activeItem?.children?.length ?? 0)
  );

  return (
    <div
      className="relative"
      onMouseLeave={() => delayedClose(120)}
      onKeyDown={(e) => e.key === "Escape" && delayedClose(0)}
    >
      {/* Top-level nav */}
      <nav className="hidden md:flex items-center gap-6">
        {items.map(item => {
          const isActive = open && active === item.id && hasChildren(activeItem);

          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                "text-foreground hover:text-primary px-3 py-2 text-base transition-colors",
                isActive 
                  ? "font-semibold" 
                  : "font-medium"
              )}
              aria-expanded={isActive}
              aria-haspopup={hasChildren(item) ? "dialog" : undefined}
              onMouseEnter={() => (hasChildren(item) ? openFor(item.id) : openFor(null))}
              onFocus={() => (hasChildren(item) ? openFor(item.id) : openFor(null))}
              onClick={() => {
                if (!hasChildren(item)) window.location.href = `/${item.id}`;
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Full-width panel under header */}
      <AnimatePresence>
        {open && hasChildren(activeItem) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-0 right-0 z-50"
            style={{ top: headerHeight }}
            onMouseEnter={() => openFor(activeItem!.id)}
            onFocusCapture={() => openFor(activeItem!.id)}
            role="dialog"
            aria-label={`${activeItem!.label} menu`}
          >
            {/* Full viewport backdrop */}
            <div
              className="absolute inset-0 bg-black/5"
              onClick={() => delayedClose(0)}
              aria-hidden
            />
            {/* Panel */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex items-center" style={{ height: `calc(100vh - ${headerHeight}px)` }}>
              <div className="flex gap-6 w-full">
                {activeItem!.children!.map((child, index) => (
                  <motion.a
                    key={child.href}
                    href={child.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="group flex-1 rounded-xl border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg p-8 hover:bg-white/95 hover:border-gray-300/80 focus:bg-white/95 focus:border-gray-300/80 outline-none transition-all duration-500 ease-out hover:scale-[1.01] flex flex-col justify-center"
                  >
                    <div className="mb-4 text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 ease-out">
                      {child.title}
                    </div>
                    {child.description && (
                      <p className="text-base text-gray-600/90 group-hover:text-gray-700 leading-relaxed transition-colors duration-300 ease-out">{child.description}</p>
                    )}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
