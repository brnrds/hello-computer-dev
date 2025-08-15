"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import TerminalCTA from "@/components/TerminalCTA";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "AI Growth", href: "/services/ai-growth" },
    { name: "Creative Engines", href: "/services/creative-engines" },
    { name: "Technical Integration", href: "/services/technical-integration" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group">
              <div className="font-caprasimo leading-none">
                <div className="text-4xl text-retro-orange-dark group-hover:text-retro-orange-bright transition-colors">
                  Hello
                </div>
                <div className="text-4xl text-retro-orange-warm group-hover:text-retro-orange-bright transition-colors -mt-3">
                  Computer
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Services Dropdown */}
              <div className="relative group">
                <Link
                  href="/services"
                  className={`text-foreground hover:text-primary px-3 py-2 text-base transition-colors ${
                    pathname.startsWith('/services') ? 'font-semibold' : 'font-medium'
                  }`}
                >
                  Services
                </Link>
                <div className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/about"
                className={`text-foreground hover:text-primary px-3 py-2 text-base transition-colors ${
                  pathname === '/about' ? 'font-semibold' : 'font-medium'
                }`}
              >
                About
              </Link>
              
              <Link
                href="/contact"
                className={`text-foreground hover:text-primary px-3 py-2 text-base transition-colors ${
                  pathname === '/contact' ? 'font-semibold' : 'font-medium'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
              <TerminalCTA href="/contact" />
            </SignedIn>
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
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {service.name}
                  </Link>
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

            <div className="px-3 pt-4 space-y-3">
              <SignedOut>
                <div className="flex space-x-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="flex-1" size="sm">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="flex-1" size="sm">
                      Sign Up
                    </Button>
                  </SignUpButton>
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
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
