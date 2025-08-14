import type { Metadata } from "next";
import React from "react";
import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Users, Target, Lightbulb, Shield, Code, Brain } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - Hello Computer",
  description: "Learn about Hello Computer's mission to bridge AI potential with business reality through expert human guidance and cutting-edge technology.",
  keywords: "AI agency, AI consulting, business transformation, AI strategy, human expertise",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="AI + Human Expertise"
        subtitle="About Hello Computer"
        description="We bridge the gap between AI potential and business reality, combining cutting-edge technology with expert human guidance to deliver solutions that actually work."
        primaryCTA={{ text: "Work With Us", href: "/contact" }}
        secondaryCTA={{ text: "View Services", href: "/services" }}
        variant="page"
        backgroundPattern={true}
      />

      {/* Our Story Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 retro-grid opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Our <span className="text-neon-cyan neon-glow">Story</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Hello Computer was born from a simple observation: while AI technology advances at breakneck speed, 
                  most businesses struggle to harness its potential effectively. The gap between what AI can do and 
                  what businesses actually achieve with it continues to widen.
                </p>
                <p>
                  We founded Hello Computer to bridge this gap. Our team combines deep technical expertise in AI 
                  and machine learning with real-world business experience. We don't just build AI solutions—we 
                  build AI solutions that drive measurable business outcomes.
                </p>
                <p>
                  Today, we've helped over 50 businesses transform their operations with AI, generating over £2.4M 
                  in additional revenue and saving thousands of hours of manual work. Our secret? We never lose 
                  sight of the human element that makes AI truly powerful.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <Card className="border-neon-cyan border-opacity-30 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-neon-cyan neon-glow mb-6">
                  Our Journey
                </h3>
                
                <div className="space-y-6">
                  {[
                    { year: "2022", milestone: "Founded", desc: "Started with a vision to make AI accessible" },
                    { year: "2023", milestone: "First 10 Clients", desc: "Proven methodology with early adopters" },
                    { year: "2024", milestone: "Scale & Growth", desc: "50+ businesses transformed, £2.4M+ revenue generated" },
                    { year: "2025", milestone: "Future Vision", desc: "Expanding globally, advancing AI capabilities" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-neon-cyan terminal-text">{item.year}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.milestone}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-neon-pink neon-glow">Philosophy</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do, from client relationships to technical implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-8 h-8" />,
                title: "Human-Centered AI",
                description: "AI should amplify human capabilities, not replace human judgment. We design systems that enhance decision-making and creativity.",
                color: "neon-cyan"
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Results-Driven Focus",
                description: "Every solution must drive measurable business outcomes. We optimize for your success, not just impressive technology demos.",
                color: "neon-pink"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Ethical & Transparent",
                description: "We build AI systems with privacy, security, and ethical considerations at their core. No black boxes, no surprises.",
                color: "neon-green"
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "Continuous Learning",
                description: "Technology evolves rapidly, and so do we. We stay at the forefront of AI innovation to deliver cutting-edge solutions.",
                color: "terminal-amber"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Partnership Approach",
                description: "We're not just vendors—we're partners in your success. Your goals become our goals, and we work together to achieve them.",
                color: "neon-purple"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Quality Excellence",
                description: "We deliver enterprise-grade solutions with robust testing, monitoring, and support. Quality is never compromised.",
                color: "neon-blue"
              }
            ].map((principle, index) => {
              const colorClasses = {
                "neon-cyan": "text-neon-cyan border-neon-cyan bg-neon-cyan/10",
                "neon-pink": "text-neon-pink border-neon-pink bg-neon-pink/10",
                "neon-green": "text-neon-green border-neon-green bg-neon-green/10",
                "terminal-amber": "text-terminal-amber border-terminal-amber bg-terminal-amber/10",
                "neon-purple": "text-neon-purple border-neon-purple bg-neon-purple/10",
                "neon-blue": "text-neon-blue border-neon-blue bg-neon-blue/10"
              };
              
              const classes = colorClasses[principle.color as keyof typeof colorClasses];
              
              return (
                <Card key={index} className={`border ${classes.split(' ')[1]} border-opacity-30 hover:border-opacity-70 bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105`}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${classes} flex items-center justify-center border border-opacity-30`}>
                      {React.cloneElement(principle.icon, { className: `w-8 h-8 ${classes.split(' ')[0]}` })}
                    </div>
                    <h3 className={`text-xl font-bold mb-4 ${classes.split(' ')[0]} neon-glow`}>
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our <span className="text-neon-green neon-glow">Tech Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We work with the latest AI technologies and frameworks to deliver cutting-edge solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                category: "AI & Machine Learning",
                technologies: ["OpenAI GPT", "Anthropic Claude", "TensorFlow", "PyTorch", "Hugging Face", "LangChain"],
                color: "neon-cyan"
              },
              {
                category: "Development & Infrastructure", 
                technologies: ["Python", "TypeScript", "React", "Next.js", "FastAPI", "Docker"],
                color: "neon-pink"
              },
              {
                category: "Data & Analytics",
                technologies: ["PostgreSQL", "Redis", "Elasticsearch", "Apache Kafka", "Databricks", "Snowflake"],
                color: "neon-green"
              },
              {
                category: "Cloud & DevOps",
                technologies: ["AWS", "Google Cloud", "Kubernetes", "Terraform", "GitHub Actions", "Monitoring"],
                color: "terminal-amber"
              }
            ].map((stack, index) => {
              const colorClasses = {
                "neon-cyan": "text-neon-cyan border-neon-cyan bg-neon-cyan/10",
                "neon-pink": "text-neon-pink border-neon-pink bg-neon-pink/10",
                "neon-green": "text-neon-green border-neon-green bg-neon-green/10",
                "terminal-amber": "text-terminal-amber border-terminal-amber bg-terminal-amber/10"
              };
              
              const classes = colorClasses[stack.color as keyof typeof colorClasses];
              
              return (
                <Card key={index} className={`border ${classes.split(' ')[1]} border-opacity-30 bg-card/50 backdrop-blur`}>
                  <CardContent className="p-6">
                    <h3 className={`text-lg font-bold mb-4 ${classes.split(' ')[0]} neon-glow`}>
                      {stack.category}
                    </h3>
                    <ul className="space-y-2">
                      {stack.technologies.map((tech, techIndex) => (
                        <li key={techIndex} className="text-sm text-muted-foreground flex items-center">
                          <span className={`${classes.split(' ')[0]} mr-2`}>▸</span>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-r from-retro-dark to-retro-gray text-retro-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neon-cyan neon-glow mb-4">
              Our Values
            </h2>
            <p className="text-lg text-retro-light/80 max-w-2xl mx-auto">
              The core values that shape our culture and drive our mission to transform businesses with AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                value: "Innovation with Purpose",
                description: "We don't innovate for innovation's sake. Every advancement serves a clear business purpose and delivers real value to our clients."
              },
              {
                value: "Radical Transparency",
                description: "We believe in open communication about capabilities, limitations, timelines, and costs. No hidden surprises, ever."
              },
              {
                value: "Continuous Improvement",
                description: "We're constantly learning, evolving, and improving our methodologies based on real-world results and client feedback."
              },
              {
                value: "Client Success First",
                description: "Your success is our success. We measure our performance by the tangible results we deliver for your business."
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-neon-green/20 border border-neon-green/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-neon-green font-bold text-sm">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neon-green neon-glow mb-2">
                    {item.value}
                  </h3>
                  <p className="text-retro-light/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Stats */}
          <div className="mt-16 bg-retro-gray border border-neon-cyan rounded-xl p-8">
            <div className="text-center">
              <div className="terminal-text text-neon-green text-sm mb-4">
                $ analytics --company-metrics --year=2024
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-neon-cyan neon-glow mb-1">50+</div>
                  <div className="text-sm text-retro-light/80 terminal-text">Clients Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-pink neon-glow mb-1">£2.4M+</div>
                  <div className="text-sm text-retro-light/80 terminal-text">Revenue Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-neon-green neon-glow mb-1">98%</div>
                  <div className="text-sm text-retro-light/80 terminal-text">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-terminal-amber neon-glow mb-1">24/7</div>
                  <div className="text-sm text-retro-light/80 terminal-text">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Work <span className="text-neon-cyan neon-glow">Together?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the businesses already transforming their operations with AI. 
            Let's discuss how we can help you achieve your goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="neon-border glow-hover">
              <Link href="/contact" className="flex items-center">
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-background">
              <Link href="/services">
                Explore Our Services
              </Link>
            </Button>
          </div>

          <div className="mt-8 bg-retro-dark border border-neon-cyan rounded-lg p-4 max-w-md mx-auto">
            <div className="terminal-text text-sm text-neon-green mb-1">
              $ status --team-availability
            </div>
            <div className="text-retro-light text-sm">
              <span className="text-neon-cyan">Ready to help</span>
              <span className="animate-pulse">|</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
