import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  variant?: "home" | "page";
  backgroundPattern?: boolean;
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA = { text: "Book a Call", href: "/contact" },
  secondaryCTA,
  variant = "home",
  backgroundPattern = true,
}: HeroProps) {
  return (
    <section className={`relative ${variant === "home" ? "min-h-screen" : "py-24"} flex items-center justify-center overflow-hidden`}>
      {/* Background Pattern */}
      {backgroundPattern && (
        <div className="absolute inset-0">
          <div className="retro-grid opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        </div>
      )}

      {/* Floating Elements */}
      {variant === "home" && (
        <>
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary-blue rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-neon-pink rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-terminal-amber rounded-full animate-pulse delay-1500"></div>
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {subtitle && (
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium terminal-text">
              {subtitle}
            </span>
          </div>
        )}

        <h1 className={`font-bold text-on-light mb-6 leading-tight ${
          variant === "home" 
            ? "text-4xl sm:text-5xl lg:text-7xl" 
            : "text-3xl sm:text-4xl lg:text-5xl"
        }`}>
          {title.split(" ").map((word, index) => {
            // Highlight specific words with accent colors
            const isHighlight = ["AI", "Computer", "Growth", "Creative", "Technical", "Integration"].includes(word);
            return (
              <span
                key={index}
                className={isHighlight ? "text-accent-primary font-semibold" : ""}
              >
                {word}{" "}
              </span>
            );
          })}
        </h1>

        {description && (
          <p className={`text-on-light-muted mb-8 max-w-3xl mx-auto leading-relaxed ${
            variant === "home" ? "text-lg sm:text-xl" : "text-lg"
          }`}>
            {description}
          </p>
        )}

        <div className={`flex flex-col sm:flex-row gap-4 ${
          variant === "home" ? "justify-center" : "justify-center"
        }`}>
          <Button asChild size="lg">
            <Link href={primaryCTA.href}>
              {primaryCTA.text}
            </Link>
          </Button>

          {secondaryCTA && (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryCTA.href}>
                {secondaryCTA.text}
              </Link>
            </Button>
          )}
        </div>

        {/* Stats or additional info for home variant */}
        {variant === "home" && (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-primary mb-2">340%</div>
              <div className="text-sm text-on-light-muted terminal-text font-medium">Lead Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-tertiary mb-2">10x</div>
              <div className="text-sm text-on-light-muted terminal-text font-medium">Faster Content</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-secondary mb-2">75%</div>
              <div className="text-sm text-on-light-muted terminal-text font-medium">Time Saved</div>
            </div>
          </div>
        )}

        {/* Terminal-style command hint for home variant */}
        {variant === "home" && (
          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-dark border border-accent-primary-dark rounded-lg p-4 terminal-text text-left">
              <div className="text-accent-tertiary-dark text-xs mb-2">$ hello-computer --status</div>
              <div className="text-accent-tertiary-dark text-sm">
                <span className="text-accent-primary-dark-glow">Ready to transform your business</span>
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
