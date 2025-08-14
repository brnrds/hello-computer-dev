"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, CheckCircle, Mail } from "lucide-react";

export default function LeadMagnetCTA() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'lead-magnet-cta',
          leadMagnet: 'ai-marketing-guide'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting lead magnet form:', error);
      // Handle error (you could show a toast notification here)
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 relative bg-gradient-to-br from-neon-cyan/5 via-background to-neon-pink/5">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-neon-green border-opacity-50 bg-card/50 backdrop-blur">
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-neon-green mb-4">
                Success! Check Your Email
              </h3>
              <p className="text-on-light-muted mb-6">
                Your AI Marketing Transformation Guide is on its way to <span className="text-accent-primary font-medium">{email}</span>
              </p>
              <div className="bg-retro-dark border border-neon-green rounded-lg p-4 terminal-text text-sm">
                <div className="text-neon-green">$ send-guide --email={email}</div>
                <div className="text-terminal-green mt-1">✓ Guide delivered successfully</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 relative bg-gradient-to-br from-neon-cyan/5 via-background to-neon-pink/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 retro-grid opacity-10"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-neon-cyan border-opacity-30 bg-card/50 backdrop-blur overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content Side */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-2 mb-6">
                  <Download className="w-6 h-6 text-neon-cyan" />
                  <span className="px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-neon-cyan text-sm font-medium terminal-text">
                    Free Download
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-on-light mb-4">
                  The Complete AI Marketing 
                  <span className="text-accent-primary font-semibold block">Transformation Guide</span>
                </h3>

                <p className="text-on-light-muted mb-6 leading-relaxed">
                  Get our comprehensive 47-page guide that reveals the exact AI marketing strategies used by top-performing businesses to achieve 300%+ growth.
                </p>

                {/* What's Inside */}
                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-on-light text-sm terminal-text">
                    What's Inside:
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "AI-powered lead generation frameworks",
                      "Content automation workflows & templates",
                      "ROI calculation tools & success metrics",
                      "Implementation roadmap & checklists"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-on-light-muted">
                        <span className="text-accent-primary mr-2 flex-shrink-0">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your business email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-background/50 border-neon-cyan/30 focus:border-neon-cyan"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="animate-spin mr-2">⚡</span>
                        Sending Guide...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Download className="mr-2 h-4 w-4" />
                        Download Free Guide
                      </span>
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground mt-4 text-center">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </div>

              {/* Visual Side */}
              <div className="bg-gradient-to-br from-neon-cyan/10 to-neon-pink/10 p-8 lg:p-12 relative">
                {/* Mock Guide Preview */}
                <div className="relative">
                  <div className="bg-white rounded-lg shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-neon-cyan to-neon-pink rounded"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-2 bg-gray-200 rounded w-5/6"></div>
                      </div>
                      <div className="h-20 bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 rounded mt-4"></div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute -top-4 -right-4 bg-neon-green text-white rounded-full p-3 text-xs font-bold terminal-text animate-pulse">
                    47 Pages
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-neon-pink text-white rounded-full p-3 text-xs font-bold terminal-text animate-pulse delay-1000">
                    5K+ Downloads
                  </div>
                </div>

                {/* Terminal Output */}
                <div className="mt-8 bg-retro-dark border border-neon-cyan rounded-lg p-4">
                  <div className="terminal-text text-xs">
                    <div className="text-neon-green mb-1">$ generate-growth --guide=ai-marketing</div>
                    <div className="text-retro-light/80">Initializing transformation...</div>
                    <div className="text-neon-cyan mt-1">Ready for download ▶</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
