import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";

const serviceIcons = {
  "ai-growth": "🚀",
  "creative-engines": "🎨",
  "technical-integration": "⚙️"
};

const serviceColors = {
  "ai-growth": {
    text: "text-neon-cyan",
    border: "border-neon-cyan",
    bg: "bg-neon-cyan/10",
    hover: "hover:bg-neon-cyan/20"
  },
  "creative-engines": {
    text: "text-neon-pink",
    border: "border-neon-pink",
    bg: "bg-neon-pink/10",
    hover: "hover:bg-neon-pink/20"
  },
  "technical-integration": {
    text: "text-neon-green",
    border: "border-neon-green",
    bg: "bg-neon-green/10",
    hover: "hover:bg-neon-green/20"
  }
};

export default function ServicesGrid() {
  return (
    <section className="section-spacing relative bg-gradient-to-b from-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-high-contrast mb-6 leading-tight">
            Our <span className="text-neon-pink neon-glow-subtle">AI-Powered</span> Services
          </h2>
          <p className="text-xl text-medium-contrast max-w-2xl mx-auto leading-relaxed">
            Complete solutions that combine artificial intelligence with human expertise to drive real business results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const colors = serviceColors[service.id as keyof typeof serviceColors];
            const icon = serviceIcons[service.id as keyof typeof serviceIcons];
            
            return (
              <Card 
                key={service.id}
                className={`group relative overflow-hidden border ${colors.border} border-opacity-30 hover:border-opacity-70 bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105`}
              >
                <CardHeader className="text-center">
                  {/* Service Icon */}
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full ${colors.bg} flex items-center justify-center text-3xl border ${colors.border} border-opacity-30`}>
                    {icon}
                  </div>
                  
                  <CardTitle className={`text-2xl font-semibold ${colors.text} neon-glow-subtle`}>
                    {service.title}
                  </CardTitle>
                  
                  <p className={`${colors.text} font-medium text-base`}>
                    {service.subtitle}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-medium-contrast leading-relaxed content-spacing">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-high-contrast text-sm terminal-text">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-medium-contrast flex items-start leading-relaxed">
                          <span className={`${colors.text} mr-2 flex-shrink-0 mt-0.5`}>▸</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button asChild className={`w-full ${colors.border} ${colors.text} hover:bg-background ${colors.hover} transition-colors group-hover:neon-border`}>
                    <Link href={`/services/${service.slug}`} className="flex items-center justify-center">
                      Learn More 
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section - Process Overview */}
        <div className="bg-retro-dark border border-neon-cyan rounded-xl p-10 text-center">
          <h3 className="text-2xl font-semibold text-neon-cyan neon-glow-subtle mb-8">
            Our Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-retro-light">
            <div className="space-y-3">
              <div className="text-4xl mb-2">🎯</div>
              <h4 className="font-semibold text-neon-green terminal-text text-base">1. Analyze</h4>
              <p className="text-sm text-retro-light/90 leading-relaxed">We audit your current setup and identify opportunities</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl mb-2">🔧</div>
              <h4 className="font-semibold text-neon-pink terminal-text text-base">2. Build</h4>
              <p className="text-sm text-retro-light/90 leading-relaxed">Custom AI solutions tailored to your business needs</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl mb-2">📊</div>
              <h4 className="font-semibold text-terminal-amber terminal-text text-base">3. Optimize</h4>
              <p className="text-sm text-retro-light/90 leading-relaxed">Continuous improvement based on real performance data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
