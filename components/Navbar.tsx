"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
                <div className="text-3xl text-retro-orange-dark group-hover:text-retro-orange-bright transition-colors">
                  Hello
                </div>
                <div className="text-3xl text-retro-orange-warm group-hover:text-retro-orange-bright transition-colors -mt-3">
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
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
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
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors "
              >
                About
              </Link>
              
              <Link
                href="/contact"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors "
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className=" ">
              <Link href="/contact">
                Book a Call
              </Link>
            </Button>
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

            <div className="px-3 pt-4">
              <Button asChild className="w-full ">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Book a Call
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
