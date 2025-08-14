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
          <div className="absolute top-20 left-10 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
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

        <h1 className={`font-bold text-foreground mb-6 ${
          variant === "home" 
            ? "text-4xl sm:text-5xl lg:text-7xl" 
            : "text-3xl sm:text-4xl lg:text-5xl"
        }`}>
          {title.split(" ").map((word, index) => {
            // Highlight specific words with neon effects
            const isHighlight = ["AI", "Computer", "Growth", "Creative", "Technical", "Integration"].includes(word);
            return (
              <span
                key={index}
                className={isHighlight ? "text-neon-cyan neon-glow" : ""}
              >
                {word}{" "}
              </span>
            );
          })}
        </h1>

        {description && (
          <p className={`text-muted-foreground mb-8 max-w-3xl mx-auto ${
            variant === "home" ? "text-lg sm:text-xl" : "text-lg"
          }`}>
            {description}
          </p>
        )}

        <div className={`flex flex-col sm:flex-row gap-4 ${
          variant === "home" ? "justify-center" : "justify-center"
        }`}>
          <Button asChild size="lg" className="neon-border glow-hover">
            <Link href={primaryCTA.href}>
              {primaryCTA.text}
            </Link>
          </Button>

          {secondaryCTA && (
            <Button asChild variant="outline" size="lg" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-background glow-hover">
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
              <div className="text-2xl font-bold text-neon-cyan neon-glow mb-1">340%</div>
              <div className="text-sm text-muted-foreground terminal-text">Lead Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-green neon-glow mb-1">10x</div>
              <div className="text-sm text-muted-foreground terminal-text">Faster Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-pink neon-glow mb-1">75%</div>
              <div className="text-sm text-muted-foreground terminal-text">Time Saved</div>
            </div>
          </div>
        )}

        {/* Terminal-style command hint for home variant */}
        {variant === "home" && (
          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-retro-dark border border-neon-cyan rounded-lg p-4 terminal-text text-left">
              <div className="text-neon-green text-xs mb-2">$ hello-computer --status</div>
              <div className="text-terminal-green text-sm">
                <span className="text-neon-cyan">Ready to transform your business</span>
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
