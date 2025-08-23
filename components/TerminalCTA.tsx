"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

interface TerminalCTAProps {
  label: string;
  href: string;
  className?: string;
}

export default function TerminalCTA({ label, href, className = "" }: TerminalCTAProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <SignedOut>
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
            {label}
            <span
              className={`text-accent-primary-dark-glow transition-opacity duration-200 ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'
                }`}
            >
              ▶
            </span>
          </Link>
        </Button>
      </SignedOut>

      <SignedIn>
        <Button
          variant="terminal"
          size="lg"
          className={`terminal-text ${className} flex items-center gap-4 pr-2`}
        >
          <span className="text-accent-tertiary-dark">$</span>
          {label}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-6 h-6"
              }
            }}
          />
        </Button>
      </SignedIn>
    </>
  );
}



