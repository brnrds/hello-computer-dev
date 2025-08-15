"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TerminalCTAProps {
  href: string;
  className?: string;
}

export default function TerminalCTA({ href, className = "" }: TerminalCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      asChild
      variant="terminal"
      size="lg"
      className={`terminal-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={href} className="flex items-center gap-2">
        <span className="text-accent-tertiary-dark">$</span>
        let's go
        <span 
          className={`text-accent-primary-dark-glow transition-opacity duration-200 ${
            isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`}
        >
          ▶
        </span>
      </Link>
    </Button>
  );
}
