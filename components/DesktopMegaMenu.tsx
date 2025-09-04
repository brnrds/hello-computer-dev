"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const serviceIcons = {
  "ai-growth": "🚀",
  "creative-engines": "🎨",
  "technical-integration": "⚙️"
};

const serviceColors = {
  "ai-growth": {
    text: "text-accent-primary",
    border: "border-accent-primary",
    bg: "bg-accent-primary/10",
    hover: "hover:bg-accent-primary/20"
  },
  "creative-engines": {
    text: "text-accent-secondary",
    border: "border-accent-secondary",
    bg: "bg-accent-secondary/10",
    hover: "hover:bg-accent-secondary/20"
  },
  "technical-integration": {
    text: "text-accent-tertiary",
    border: "border-accent-tertiary",
    bg: "bg-accent-tertiary/10",
    hover: "hover:bg-accent-tertiary/20"
  }
};

type MegaChild = {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
  subItems?: {
    title: string;
    href: string;
    description?: string;
  }[];
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
                if (!hasChildren(item)) {
                  window.location.href = `/${item.id}`;
                } else if (item.id === 'services') {
                  // Allow navigation to services page even when it has children
                  window.location.href = '/services';
                }
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
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => delayedClose(0)}
              aria-hidden
            />
            {/* Panel */}
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex items-center" style={{ height: `calc(100vh - ${headerHeight}px)` }}>
              <div className="flex gap-6 w-full">
                                {activeItem!.children!.map((child, index) => {
                  const serviceId = child.href.split('/').pop() as keyof typeof serviceColors;
                  const colors = serviceColors[serviceId];
                  const icon = serviceIcons[serviceId];
                  
                  return (
                    <motion.div
                      key={child.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className={`group flex-1 rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden relative`}
                    >
                      <div className="p-8 text-center">
                        {/* Service Icon - exactly like homepage */}
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${colors.bg} flex items-center justify-center text-3xl border ${colors.border} border-opacity-30`}>
                          {icon}
                        </div>
                        
                        {/* Title - exactly like homepage - now clickable */}
                        <Link 
                          href={child.href}
                          className={`block text-2xl font-semibold ${colors.text} mb-2 hover:underline`}
                        >
                          {child.title}
                        </Link>
                        
                        {/* Description - exactly like homepage */}
                        {child.description && (
                          <p className="text-on-light-muted leading-relaxed mb-4">
                            {child.description}
                          </p>
                        )}
                        
                        {/* Sub-items for AI Growth */}
                        {child.subItems && child.subItems.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {child.subItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`block p-3 rounded-lg ${colors.bg} ${colors.hover} transition-colors text-left`}
                              >
                                <div className={`font-medium ${colors.text} text-sm`}>
                                  {subItem.title}
                                </div>
                                {subItem.description && (
                                  <div className="text-xs text-on-light-muted mt-1">
                                    {subItem.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Effect Overlay - exactly like homepage */}
                      <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
