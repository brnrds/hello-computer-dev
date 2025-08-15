import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PricingTable from "@/components/PricingTable";
import DeliverablesTable from "@/components/DeliverablesTable";
import { getServiceBySlug } from "@/data/services";
import { getTestimonialsByService } from "@/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, ArrowRight, Code, Database, Cloud, Shield, Cpu, Network } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Integration - Hello Computer",
  description: "Seamless AI integration into your existing systems with custom integrations, automation workflows, and technical implementations.",
  keywords: "AI integration, API development, workflow automation, technical consulting, AI implementation",
};

export default function TechnicalIntegrationPage() {
  const service = getServiceBySlug("technical-integration");
  
  if (!service) {
    return <div>Service not found</div>;
  }

  const testimonials = getTestimonialsByService("Technical");

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
              Technical <span className="text-accent-tertiary">AI Integration</span>
            </h2>
            <p className="text-lg text-on-light-muted max-w-2xl mx-auto">
              Seamlessly integrate AI capabilities into your existing systems and workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Features List */}
            <div className="space-y-6">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-tertiary flex-shrink-0 mt-1" />
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

            {/* Technical Capabilities Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-accent-tertiary border-opacity-30 bg-card/50 backdrop-blur text-center p-6">
                <Code className="w-8 h-8 text-accent-tertiary mx-auto mb-3" />
                <h4 className="font-semibold text-on-light mb-2">Custom Development</h4>
                <ul className="text-sm text-on-light-muted space-y-1">
                  <li>AI Model Integration</li>
                  <li>API Development</li>
                  <li>Custom Workflows</li>
                  <li>System Architecture</li>
                </ul>
              </Card>

              <Card className="border-accent-tertiary border-opacity-30 bg-card/50 backdrop-blur text-center p-6">
                <Database className="w-8 h-8 text-accent-tertiary mx-auto mb-3" />
                <h4 className="font-semibold text-on-light mb-2">Data Management</h4>
                <ul className="text-sm text-on-light-muted space-y-1">
                  <li>Data Pipelines</li>
                  <li>ETL Processes</li>
                  <li>Data Quality</li>
                  <li>Analytics Setup</li>
                </ul>
              </Card>

              <Card className="border-accent-tertiary border-opacity-30 bg-card/50 backdrop-blur text-center p-6">
                <Cloud className="w-8 h-8 text-accent-tertiary mx-auto mb-3" />
                <h4 className="font-semibold text-on-light mb-2">Cloud Infrastructure</h4>
                <ul className="text-sm text-on-light-muted space-y-1">
                  <li>Scalable Deployment</li>
                  <li>Load Balancing</li>
                  <li>Auto-scaling</li>
                  <li>Monitoring</li>
                </ul>
              </Card>

              <Card className="border-accent-tertiary border-opacity-30 bg-card/50 backdrop-blur text-center p-6">
                <Shield className="w-8 h-8 text-accent-tertiary mx-auto mb-3" />
                <h4 className="font-semibold text-on-light mb-2">Security & Compliance</h4>
                <ul className="text-sm text-on-light-muted space-y-1">
                  <li>Data Encryption</li>
                  <li>Access Controls</li>
                  <li>Compliance Audits</li>
                  <li>Security Monitoring</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Technical Architecture Overview */}
          <div className="bg-gradient-to-r from-neon-green/5 to-neon-blue/5 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-center text-on-light mb-8">
              Enterprise-Grade Architecture
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Cpu className="w-12 h-12 text-accent-tertiary mx-auto mb-4" />
                <div className="text-2xl font-bold text-accent-tertiary mb-2">99.9%</div>
                <div className="text-lg font-semibold text-on-light mb-2">Uptime SLA</div>
                <p className="text-sm text-on-light-muted">
                  Enterprise-grade infrastructure with redundancy and failover protection
                </p>
              </div>
              <div className="text-center">
                <Network className="w-12 h-12 text-accent-primary mx-auto mb-4" />
                <div className="text-2xl font-bold text-accent-primary mb-2">10ms</div>
                <div className="text-lg font-semibold text-on-light mb-2">Response Time</div>
                <p className="text-sm text-on-light-muted">
                  Optimized performance with edge computing and intelligent caching
                </p>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-terminal-amber mx-auto mb-4" />
                <div className="text-2xl font-bold text-terminal-amber mb-2">SOC2</div>
                <div className="text-lg font-semibold text-on-light mb-2">Compliant</div>
                <p className="text-sm text-on-light-muted">
                  Full compliance with enterprise security and privacy standards
                </p>
              </div>
            </div>

            <div className="mt-8 bg-dark border border-accent-tertiary-dark rounded-lg p-4 max-w-md mx-auto">
              <div className="terminal-text text-xs text-accent-tertiary-dark mb-1">
                $ deploy --environment=production --security=enterprise
              </div>
              <div className="text-on-dark text-sm">
                System status: <span className="text-accent-tertiary-dark-glow">Operational</span> • Security: <span className="text-terminal-amber">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-on-light mb-4">
              Our Integration <span className="text-accent-tertiary">Process</span>
            </h2>
            <p className="text-lg text-on-light-muted max-w-2xl mx-auto">
              From planning to deployment, we ensure seamless integration with your existing systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                phase: "Discovery",
                step: "1",
                duration: "Week 1-2",
                tasks: ["System Analysis", "Requirements Gathering", "Architecture Planning", "Risk Assessment"],
                icon: "🔍"
              },
              {
                phase: "Development",
                step: "2", 
                duration: "Week 3-6",
                tasks: ["Custom Development", "API Integration", "Testing Framework", "Quality Assurance"],
                icon: "⚡"
              },
              {
                phase: "Deployment",
                step: "3",
                duration: "Week 7-8", 
                tasks: ["Production Setup", "Security Config", "Performance Tuning", "Go-Live Support"],
                icon: "🚀"
              },
              {
                phase: "Optimization",
                step: "4",
                duration: "Ongoing",
                tasks: ["Performance Monitoring", "Continuous Updates", "Feature Enhancement", "Support & Maintenance"],
                icon: "📈"
              }
            ].map((phase, index) => (
              <Card key={index} className="border-accent-tertiary border-opacity-30 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-4">{phase.icon}</div>
                  <h3 className="text-lg font-bold text-accent-tertiary mb-2">
                    {phase.phase}
                  </h3>
                  <div className="text-sm text-on-light-muted mb-4">
                    Step {phase.step} • {phase.duration}
                  </div>
                  <ul className="text-sm text-on-light-muted space-y-1">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center text-left">
                        <span className="text-accent-tertiary mr-2">▸</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-on-light mb-4">
              Technology <span className="text-accent-tertiary">Stack</span>
            </h2>
            <p className="text-lg text-on-light-muted max-w-2xl mx-auto">
              We work with the latest technologies and frameworks to ensure robust, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Python", category: "AI/ML" },
              { name: "TypeScript", category: "Development" },
              { name: "React", category: "Frontend" },
              { name: "Node.js", category: "Backend" },
              { name: "PostgreSQL", category: "Database" },
              { name: "Redis", category: "Cache" },
              { name: "Docker", category: "DevOps" },
              { name: "Kubernetes", category: "Orchestration" },
              { name: "AWS", category: "Cloud" },
              { name: "TensorFlow", category: "AI/ML" },
              { name: "FastAPI", category: "API" },
              { name: "Monitoring", category: "Observability" }
            ].map((tech, index) => (
              <Card key={index} className="border-accent-tertiary border-opacity-20 bg-card/30 backdrop-blur text-center p-4 hover:border-opacity-50 transition-all">
                <div className="text-sm font-semibold text-on-light mb-1">{tech.name}</div>
                <div className="text-xs text-on-light-muted">{tech.category}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Table */}
      <DeliverablesTable 
        service="technicalIntegration" 
        title="Technical Integration Deliverables"
      />

      {/* Pricing Table */}
      <div id="pricing">
        <PricingTable 
          service="technicalIntegration" 
          title="Technical Integration Packages"
        />
      </div>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-on-light mb-12">
              Technical Success Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((testimonial, index) => (
                <Card key={testimonial.id} className="border-accent-tertiary border-opacity-30 bg-card/50 backdrop-blur">
                  <CardContent className="p-8">
                    <blockquote className="text-lg text-on-light mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-accent-tertiary/10 border border-accent-tertiary/30 rounded-full flex items-center justify-center mr-4">
                        <span className="font-bold text-accent-tertiary text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-accent-tertiary">{testimonial.name}</div>
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
          <h2 className="text-3xl sm:text-4xl font-bold text-accent-tertiary-dark-glow mb-6">
            Ready to Integrate AI?
          </h2>
          <p className="text-lg text-on-dark-muted mb-8 max-w-2xl mx-auto">
            Transform your technical infrastructure with seamless AI integration. 
            Get enterprise-grade solutions that scale with your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact" className="flex items-center">
                Schedule Technical Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/#lead-magnet">
                Download Technical Guide
              </Link>
            </Button>
          </div>

          <div className="mt-8 bg-dark border border-accent-tertiary-dark rounded-lg p-4 max-w-md mx-auto">
            <div className="terminal-text text-sm text-accent-tertiary-dark mb-1">
              $ status --integration-services
            </div>
            <div className="text-on-dark text-sm">
              <span className="text-accent-tertiary-dark-glow">Technical team available</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
