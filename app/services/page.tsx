import type { Metadata } from "next";
import React from "react";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Services - Hello Computer",
  description: "Discover our complete range of AI-powered services: Growth Marketing, Creative Engines, and Technical Integration. Transform your business with expert AI solutions.",
  keywords: "AI services, AI marketing, AI content creation, technical integration, business automation",
  openGraph: {
    title: "AI-Powered Services - Hello Computer",
    description: "Transform your business with our AI-powered services: Growth Marketing, Creative Engines, and Technical Integration.",
    url: "https://hellocomputer.ai/services",
    siteName: "Hello Computer",
    images: [
      {
        url: "/images/services-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hello Computer AI Services",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="AI-Powered Services"
        subtitle="Complete Solutions"
        description="Transform your business with our comprehensive AI-powered services. From growth marketing to technical integration, we deliver solutions that drive real results."
        primaryCTA={{ text: "Book Consultation", href: "/contact" }}
        secondaryCTA={{ text: "Download Guide", href: "/#lead-magnet" }}
        variant="page"
        backgroundPattern={true}
      />

      {/* Services Overview */}
      <section className="py-24 relative">
        <div className="absolute inset-0 retro-grid opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Our <span className="text-neon-cyan neon-glow">AI Services</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge AI technology with expert human guidance to deliver solutions that actually work for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Proven Results",
                description: "Our clients see an average of 340% growth in qualified leads and £2.4M+ in additional revenue.",
                color: "neon-cyan"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Team",
                description: "Our team combines deep AI expertise with real-world business experience across industries.",
                color: "neon-pink"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Rapid Implementation",
                description: "Get up and running quickly with our proven methodology and pre-built AI frameworks.",
                color: "neon-green"
              }
            ].map((benefit, index) => {
              const colorClasses = {
                "neon-cyan": "text-neon-cyan border-neon-cyan bg-neon-cyan/10",
                "neon-pink": "text-neon-pink border-neon-pink bg-neon-pink/10",
                "neon-green": "text-neon-green border-neon-green bg-neon-green/10"
              };
              
              const classes = colorClasses[benefit.color as keyof typeof colorClasses];
              
              return (
                <Card key={index} className={`border ${classes.split(' ')[1]} border-opacity-30 hover:border-opacity-70 bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${classes} flex items-center justify-center border border-opacity-30`}>
                      {React.cloneElement(benefit.icon, { className: `w-8 h-8 ${classes.split(' ')[0]}` })}
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${classes.split(' ')[0]} neon-glow`}>
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* Service Comparison */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Service <span className="text-neon-pink neon-glow">Comparison</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the right service for your business needs and goals.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-card/50 backdrop-blur rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-neon-cyan/10 to-neon-pink/10">
                  <th className="text-left p-6 font-bold text-foreground">Feature</th>
                  <th className="text-center p-6 font-bold text-neon-cyan">AI Growth</th>
                  <th className="text-center p-6 font-bold text-neon-pink">Creative Engines</th>
                  <th className="text-center p-6 font-bold text-neon-green">Technical Integration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Lead Generation",
                    aiGrowth: true,
                    creative: false,
                    technical: false
                  },
                  {
                    feature: "Content Creation",
                    aiGrowth: true,
                    creative: true,
                    technical: false
                  },
                  {
                    feature: "Marketing Automation",
                    aiGrowth: true,
                    creative: false,
                    technical: true
                  },
                  {
                    feature: "Custom AI Development",
                    aiGrowth: false,
                    creative: false,
                    technical: true
                  },
                  {
                    feature: "Brand Voice Training",
                    aiGrowth: false,
                    creative: true,
                    technical: false
                  },
                  {
                    feature: "System Integration",
                    aiGrowth: true,
                    creative: false,
                    technical: true
                  },
                  {
                    feature: "Performance Analytics",
                    aiGrowth: true,
                    creative: true,
                    technical: true
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="p-6 font-medium text-foreground">{row.feature}</td>
                    <td className="text-center p-6">
                      {row.aiGrowth ? (
                        <CheckCircle className="w-5 h-5 text-neon-cyan mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center p-6">
                      {row.creative ? (
                        <CheckCircle className="w-5 h-5 text-neon-pink mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center p-6">
                      {row.technical ? (
                        <CheckCircle className="w-5 h-5 text-neon-green mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our <span className="text-neon-green neon-glow">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A proven methodology that ensures successful AI implementation and measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Discovery & Analysis",
                description: "We analyze your current setup, goals, and challenges to create a custom strategy.",
                duration: "Week 1",
                icon: "🔍"
              },
              {
                step: "2", 
                title: "Solution Design",
                description: "Design AI systems tailored to your specific business needs and objectives.",
                duration: "Week 2",
                icon: "🎯"
              },
              {
                step: "3",
                title: "Implementation",
                description: "Build, test, and deploy your AI solutions with minimal disruption to operations.",
                duration: "Week 3-6",
                icon: "⚡"
              },
              {
                step: "4",
                title: "Optimization",
                description: "Monitor performance and continuously optimize for better results and ROI.",
                duration: "Ongoing",
                icon: "📈"
              }
            ].map((phase, index) => (
              <Card key={index} className="border-neon-cyan border-opacity-30 bg-card/50 backdrop-blur text-center">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{phase.icon}</div>
                  <div className="w-12 h-12 mx-auto mb-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full flex items-center justify-center">
                    <span className="font-bold text-neon-cyan text-lg">{phase.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {phase.description}
                  </p>
                  <div className="text-xs text-neon-cyan font-medium terminal-text">
                    {phase.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-retro-dark to-retro-gray text-retro-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neon-cyan neon-glow mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-retro-light/80 mb-8 max-w-2xl mx-auto">
            Book a free consultation to discuss your specific needs and learn how our AI services can transform your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="neon-border glow-hover">
              <Link href="/contact" className="flex items-center">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-background">
              <Link href="/#lead-magnet">
                Download AI Guide
              </Link>
            </Button>
          </div>

          <div className="mt-8 bg-retro-gray border border-neon-cyan rounded-lg p-4 max-w-md mx-auto">
            <div className="terminal-text text-sm text-neon-green mb-1">
              $ status --all-services
            </div>
            <div className="text-retro-light text-sm">
              <span className="text-neon-cyan">Ready to deploy</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
