"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import TerminalCTA from "@/components/TerminalCTA";
import Image from "next/image";
import { DesktopMegaMenu } from "@/components/DesktopMegaMenu";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  // DISABLED FOR PREVIEW: Mock user state to show all menu items
  const isAdmin = true; // user?.publicMetadata?.role === 'admin';
  const isUser = true; // user?.publicMetadata?.role === 'user';
  const userTier = 'free'; // user?.publicMetadata?.tier ?? null;

  const MENU = [
    {
      id: "services",
      label: "Services",
      children: [
        { 
          title: "AI Growth", 
          href: "/services/ai-growth", 
          description: "Acquisition, funnels, LTV.",
          subItems: [
            { title: "AI Prompt Tools", href: "/tools", description: "Business templates & prompt optimization" },
          ]
        },
        { title: "Creative Engines", href: "/services/creative-engines", description: "Content systems & tooling." },
        { title: "Technical Integration", href: "/services/technical-integration", description: "Data, automations, infra." },
      ],
    },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
    // REMOVED FOR PREVIEW: Admin menu item
    // ...(isAdmin ? [{ id: "admin", label: "Admin" }] : []),
    // MOVED TO AI GROWTH: Generators menu item
    // ...(isUser && userTier === 'free' ? [{ id: "generators", label: "Generators" }] : []),
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <Image
                src="/logo.png"
                alt="Hello Computer"
                width={200}
                height={80}
                className="h-16 w-auto transition-opacity group-hover:opacity-80"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <DesktopMegaMenu items={MENU} headerHeight={80} />
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* REMOVED FOR PREVIEW: Login functionality */}
            <TerminalCTA label="Let's go" href="/contact-waitlist" />
            {/* 
            <SignedOut>
              <TerminalCTA label="Let's go" href="/contact-waitlist" />
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <TerminalCTA label="logged in" href="/contact-waitlist" />
            </SignedIn>
            */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary focus:outline-none focus:text-primary transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card">
            {/* Services Section */}
            <div className="px-3 py-2">
              <div className="text-sm font-medium text-card-foreground mb-2">Services</div>
              <div className="space-y-1 ml-4">
                {MENU.find(item => item.id === 'services')?.children?.map((service) => (
                  <div key={service.href}>
                    <Link
                      href={service.href}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.title}
                    </Link>
                    {/* AI Growth sub-items */}
                    {service.title === "AI Growth" && service.subItems && (
                      <div className="ml-4 space-y-1">
                        {service.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-3 py-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            • {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className="block px-3 py-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block px-3 py-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>

            {/* MOVED TO AI GROWTH: Generators link now under AI Growth service
            {isUser && userTier === 'free' && (
              <Link
                href="/generators"
                className="block px-3 py-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Generators
              </Link>
            )}
            */}

            {/* REMOVED FOR PREVIEW: Admin link
            {isAdmin && (
              <Link
                href="/admin"
                className="block px-3 py-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
            */}

            <div className="px-3 pt-4 space-y-3">
              {/* REMOVED FOR PREVIEW: Login functionality */}
              <Button asChild className="w-full" size="sm">
                <Link href="/contact-waitlist" onClick={() => setIsOpen(false)}>
                  Get Priority Access
                </Link>
              </Button>
              {/*
              <SignedOut>
                <div className="flex space-x-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="flex-1" size="sm">
                      Sign In
                    </Button>
                  </SignInButton>
                  <Button asChild className="flex-1" size="sm">
                    <Link href="/contact-waitlist" onClick={() => setIsOpen(false)}>
                      Get Priority Access
                    </Link>
                  </Button>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center justify-between">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                  <Button asChild className="flex-1 ml-3">
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Book a Call
                    </Link>
                  </Button>
                </div>
              </SignedIn>
              */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

