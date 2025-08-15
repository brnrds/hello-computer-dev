import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PricingTable from "@/components/PricingTable";
import DeliverablesTable from "@/components/DeliverablesTable";
import { getServiceBySlug } from "@/data/services";
import { getTestimonialsByService } from "@/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, ArrowRight, Palette, FileText, Video, Camera } from "lucide-react";

export const metadata: Metadata = {
  title: "Creative Engines - Hello Computer",
  description: "AI-powered content creation that produces high-quality, brand-consistent content at scale—from social posts to long-form articles.",
  keywords: "AI content creation, creative automation, brand content, social media content, AI writing",
};

export default function CreativeEnginesPage() {
  const service = getServiceBySlug("creative-engines");
  
  if (!service) {
    return <div>Service not found</div>;
  }

  const testimonials = getTestimonialsByService("Creative");

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
              Creative <span className="text-accent-secondary">AI Systems</span>
            </h2>
            <p className="text-lg text-on-light-muted max-w-2xl mx-auto">
              From concept to creation, our AI engines produce content that captures your brand voice perfectly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Features List */}
            <div className="space-y-6">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-secondary flex-shrink-0 mt-1" />
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

            {/* Content Types Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-accent-secondary border-opacity-30 bg-card/50 backdrop-blur text-center p-6">
                <FileText className="w-8 h-8 text-accent-secondary mx-auto mb-3" />
                <h4 className="font-semibold text-on-light mb-2">Written Content</h4>
                <ul className="text-sm text-on-light-muted space-y-1">
                  <li>Blog Articles</li>
                  <li>Social Posts</li>
                  <li>Email Campaigns</li>
                  <li>Website Copy</li>
                </ul>
              </Card>

              <Card className="border-accent-secondary border-opacity-30 bg-card/50 backdrop-blur text-center p-6">
                <Palette className="w-8 h-8 text-accent-secondary mx-auto mb-3" />
                <h4 className="font-semibold text-on-light mb-2">Visual Assets</h4>
                <ul className="text-sm text-on-light-muted space-y-1">
                  <li>Graphics & Illustrations</li>
                  <li>Social Templates</li>
                  <li>Infographics</li>
                  <li>Brand Assets</li>
                </ul>
              </Card>

              <Card className="border-accent-secondary border-opacity-30 bg-card/50 backdrop-blur text-center p-6">
                <Video className="w-8 h-8 text-accent-secondary mx-auto mb-3" />
                <h4 className="font-semibold text-on-light mb-2">Video Content</h4>
                <ul className="text-sm text-on-light-muted space-y-1">
                  <li>Animated Videos</li>
                  <li>Social Clips</li>
                  <li>Explainer Videos</li>
                  <li>Video Ads</li>
                </ul>
              </Card>

              <Card className="border-accent-secondary border-opacity-30 bg-card/50 backdrop-blur text-center p-6">
                <Camera className="w-8 h-8 text-accent-secondary mx-auto mb-3" />
                <h4 className="font-semibold text-on-light mb-2">Campaigns</h4>
                <ul className="text-sm text-on-light-muted space-y-1">
                  <li>Multi-channel Campaigns</li>
                  <li>Content Calendars</li>
                  <li>Brand Campaigns</li>
                  <li>Product Launches</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Content Production Stats */}
          <div className="bg-gradient-to-r from-neon-pink/5 to-neon-purple/5 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-center text-on-light mb-8">
              Content Production at Scale
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-secondary mb-2">10x</div>
                <div className="text-lg font-semibold text-on-light mb-2">Faster Production</div>
                <p className="text-sm text-on-light-muted">
                  AI-powered content creation that maintains quality while dramatically increasing output speed
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-primary mb-2">98%</div>
                <div className="text-lg font-semibold text-on-light mb-2">Brand Consistency</div>
                <p className="text-sm text-on-light-muted">
                  AI trained on your brand voice and guidelines ensures every piece matches your standards
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-terminal-amber mb-2">50+</div>
                <div className="text-lg font-semibold text-on-light mb-2">Content Types</div>
                <p className="text-sm text-on-light-muted">
                  From social posts to long-form articles, we create content for every channel and purpose
                </p>
              </div>
            </div>

            <div className="mt-8 bg-dark border border-accent-secondary-dark rounded-lg p-4 max-w-md mx-auto">
              <div className="terminal-text text-xs text-accent-tertiary-dark mb-1">
                $ generate-content --type=all --brand-voice=consistent
              </div>
              <div className="text-on-dark text-sm">
                Content pipeline: <span className="text-accent-secondary-dark-glow">Active</span> • Quality: <span className="text-accent-tertiary-dark-glow">Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Voice Training */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-on-light mb-6">
                AI That Speaks <span className="text-accent-secondary">Your Language</span>
              </h2>
              <p className="text-lg text-on-light-muted mb-8">
                Our AI engines are trained specifically on your brand voice, tone, and messaging guidelines. 
                Every piece of content maintains your unique style and personality.
              </p>

              <div className="space-y-4">
                {[
                  "Brand voice analysis and AI training",
                  "Style guide integration and enforcement",
                  "Tone consistency across all content types",
                  "Industry-specific terminology and expertise",
                  "Continuous learning and improvement"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-accent-secondary" />
                    <span className="text-on-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-accent-secondary border-opacity-30 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-accent-secondary mb-6 text-center">
                  Training Process
                </h3>
                
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Brand Analysis", desc: "Analyze existing content and brand guidelines" },
                    { step: "2", title: "Voice Modeling", desc: "Train AI on your unique tone and style" },
                    { step: "3", title: "Quality Testing", desc: "Test outputs against brand standards" },
                    { step: "4", title: "Fine-tuning", desc: "Adjust parameters for perfect alignment" },
                    { step: "5", title: "Production Ready", desc: "Deploy for consistent content creation" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-accent-secondary/10 border border-accent-secondary/30 rounded-full flex items-center justify-center text-sm font-bold text-accent-secondary">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-on-light">{item.title}</div>
                        <div className="text-sm text-on-light-muted">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Deliverables Table */}
      <DeliverablesTable 
        service="creativeEngines" 
        title="Complete Creative Deliverables"
      />

      {/* Pricing Table */}
      <div id="pricing">
        <PricingTable 
          service="creativeEngines" 
          title="Creative Engines Packages"
        />
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-on-light mb-12">
              Creative Success Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <Card key={testimonial.id} className="border-accent-secondary border-opacity-30 bg-card/50 backdrop-blur">
                  <CardContent className="p-8">
                    <blockquote className="text-lg text-on-light mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-accent-secondary/10 border border-accent-secondary/30 rounded-full flex items-center justify-center mr-4">
                        <span className="font-bold text-accent-secondary text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-accent-secondary">{testimonial.name}</div>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-accent-secondary-dark-glow mb-6">
            Ready to Scale Your Content?
          </h2>
          <p className="text-lg text-on-dark-muted mb-8 max-w-2xl mx-auto">
            Transform your content creation with AI engines that understand your brand. 
            Produce 10x more content without sacrificing quality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact" className="flex items-center">
                Start Creating Content
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#lead-magnet">
                Download Content Guide
              </Link>
            </Button>
          </div>

          <div className="mt-8 bg-dark border border-accent-secondary-dark rounded-lg p-4 max-w-md mx-auto">
            <div className="terminal-text text-sm text-accent-tertiary-dark mb-1">
              $ status --creative-engines
            </div>
            <div className="text-on-dark text-sm">
              <span className="text-accent-secondary-dark-glow">Content pipeline ready</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
