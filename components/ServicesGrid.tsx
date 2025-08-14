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

export default function ServicesGrid() {
  return (
    <section className="section-spacing relative bg-gradient-to-b from-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-on-light mb-6 leading-tight">
            Our <span className="text-accent-secondary font-semibold">AI-Powered</span> Services
          </h2>
          <p className="text-xl text-on-light-muted max-w-2xl mx-auto leading-relaxed">
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
                  
                  <CardTitle className={`text-2xl font-semibold ${colors.text}`}>
                    {service.title}
                  </CardTitle>
                  
                  <p className={`${colors.text} font-medium text-base`}>
                    {service.subtitle}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-on-light-muted leading-relaxed content-spacing">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-on-light text-sm terminal-text">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-on-light-muted flex items-start leading-relaxed">
                          <span className={`${colors.text} mr-2 flex-shrink-0 mt-0.5`}>▸</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button asChild variant="outline" className="w-full">
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
        <div className="bg-dark border border-accent-primary-dark rounded-xl p-10 text-center">
          <h3 className="text-2xl font-semibold text-accent-primary-dark-glow mb-8">
            Our Process
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="text-4xl mb-2">🎯</div>
              <h4 className="font-semibold text-accent-tertiary-dark terminal-text text-base">1. Analyze</h4>
              <p className="text-sm text-on-dark-muted leading-relaxed">We audit your current setup and identify opportunities</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl mb-2">🔧</div>
              <h4 className="font-semibold text-accent-secondary-dark terminal-text text-base">2. Build</h4>
              <p className="text-sm text-on-dark-muted leading-relaxed">Custom AI solutions tailored to your business needs</p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl mb-2">📊</div>
              <h4 className="font-semibold text-accent-tertiary-dark terminal-text text-base">3. Optimize</h4>
              <p className="text-sm text-on-dark-muted leading-relaxed">Continuous improvement based on real performance data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
