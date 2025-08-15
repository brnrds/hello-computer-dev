import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PricingTable from "@/components/PricingTable";
import DeliverablesTable from "@/components/DeliverablesTable";
import Testimonials from "@/components/Testimonials";
import { getServiceBySlug } from "@/data/services";
import { getTestimonialsByService } from "@/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, ArrowRight, TrendingUp, Users, Target, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Growth Marketing - Hello Computer",
  description: "Done-for-you AI-powered growth marketing that generates qualified leads, nurtures prospects, and converts them into customers automatically.",
  keywords: "AI growth marketing, lead generation, marketing automation, AI outbound, email sequences",
};

export default function AIGrowthPage() {
  const service = getServiceBySlug("ai-growth");
  
  if (!service) {
    return <div>Service not found</div>;
  }

  const testimonials = getTestimonialsByService("AI Growth");

  return (
    <>
      {/* Hero Section */}
      <Hero
        title={service.title}
        subtitle={service.subtitle}
        description={service.description}
        primaryCTA={{ text: "Book a Call", href: "/contact" }}
        secondaryCTA={{ text: "See Pricing", href: "#pricing" }}
        variant="page"
        backgroundPattern={true}
      />

      {/* What We Do Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 retro-grid opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-on-light mb-4">
              What We <span className="text-accent-primary">Deliver</span>
            </h2>
            <p className="text-lg text-on-light-muted max-w-2xl mx-auto">
              Complete AI-powered marketing systems that work while you sleep.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Features List */}
            <div className="space-y-6">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-on-light mb-2">
                      {feature.split(':')[0] || feature}
                    </h3>
                    {feature.includes(':') && (
                      <p className="text-on-light-muted text-sm">
                        {feature.split(':').slice(1).join(':').trim()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Card */}
            <Card className="border-neon-cyan border-opacity-30 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-accent-primary mb-6 text-center">
                  Proven Results
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <TrendingUp className="w-8 h-8 text-accent-tertiary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-accent-tertiary mb-1">340%</div>
                    <div className="text-sm text-on-light-muted">Lead Increase</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-accent-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-accent-secondary mb-1">£480K</div>
                    <div className="text-sm text-on-light-muted">ARR Growth</div>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-terminal-amber mx-auto mb-2" />
                    <div className="text-2xl font-bold text-terminal-amber mb-1">24.3%</div>
                    <div className="text-sm text-on-light-muted">Conversion Rate</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-accent-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-accent-primary mb-1">80%</div>
                    <div className="text-sm text-on-light-muted">Time Saved</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-dark rounded-lg">
                  <div className="terminal-text text-xs text-accent-tertiary-dark mb-1">
                    $ analyze --growth-results --client=all
                  </div>
                  <div className="text-on-dark text-sm">
                    Average client sees <span className="text-accent-primary-dark-glow">3.4x ROI</span> within 6 months
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Process Overview */}
          <div className="bg-gradient-to-r from-neon-cyan/5 to-neon-pink/5 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-center text-on-light mb-8">
              Our AI Growth Process
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Audit & Strategy", desc: "Analyze current marketing performance", icon: "🎯" },
                { step: "2", title: "AI Setup", desc: "Build custom AI marketing systems", icon: "🤖" },
                { step: "3", title: "Launch & Monitor", desc: "Deploy and track performance", icon: "🚀" },
                { step: "4", title: "Optimize & Scale", desc: "Continuous improvement and growth", icon: "📈" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent-primary/10 border border-accent-primary/30 rounded-full flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-on-light mb-2">
                    Step {item.step}: {item.title}
                  </h4>
                  <p className="text-sm text-on-light-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Table */}
      <DeliverablesTable 
        service="aiGrowth" 
        title="Complete Deliverables Breakdown"
      />

      {/* Pricing Table */}
      <div id="pricing">
        <PricingTable 
          service="aiGrowth" 
          title="AI Growth Marketing Packages"
        />
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-on-light mb-12">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <Card key={testimonial.id} className="border-neon-cyan border-opacity-30 bg-card/50 backdrop-blur">
                  <CardContent className="p-8">
                    <blockquote className="text-lg text-on-light mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full flex items-center justify-center mr-4">
                        <span className="font-bold text-neon-cyan text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-accent-primary">{testimonial.name}</div>
                        <div className="text-sm text-on-light-muted">
                          {testimonial.position}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-dark to-bg-dark-subtle text-on-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-accent-primary-dark-glow mb-6">
            Ready to Transform Your Growth?
          </h2>
          <p className="text-lg text-on-dark-muted mb-8 max-w-2xl mx-auto">
            Join the businesses already seeing 340% growth with our AI marketing systems. 
            Book a free consultation to discuss your growth goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact" className="flex items-center">
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#lead-magnet">
                Download Growth Guide
              </Link>
            </Button>
          </div>

          <div className="mt-8 bg-dark border border-accent-primary-dark rounded-lg p-4 max-w-md mx-auto">
            <div className="terminal-text text-sm text-accent-tertiary-dark mb-1">
              $ status --ai-growth-system
            </div>
            <div className="text-on-dark text-sm">
              <span className="text-accent-primary-dark-glow">Ready to deploy</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
