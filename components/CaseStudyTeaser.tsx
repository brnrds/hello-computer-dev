import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";

export default function CaseStudyTeaser() {
  return (
    <section className="py-24 relative bg-gradient-to-r from-background via-muted/10 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-neon-cyan text-sm font-medium terminal-text mb-6">
              Featured Case Study
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              How TechFlow Solutions 
              <span className="text-neon-cyan neon-glow block">Transformed Their Growth</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              See how our AI-powered growth marketing system helped a £3M SaaS company generate 340% more qualified leads while reducing manual marketing work by 80%.
            </p>

            {/* Key Results */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-neon-green" />
                <span className="text-foreground">
                  <span className="font-bold text-neon-green">340% increase</span> in qualified leads
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-neon-pink" />
                <span className="text-foreground">
                  <span className="font-bold text-neon-pink">£480K ARR</span> growth in 6 months
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-terminal-amber" />
                <span className="text-foreground">
                  <span className="font-bold text-terminal-amber">80% reduction</span> in manual work
                </span>
              </div>
            </div>

            <Button asChild size="lg" className="neon-border glow-hover">
              <Link href="/case-studies/techflow-solutions" className="flex items-center">
                Read Full Case Study
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Visual/Stats Card */}
          <div className="space-y-6">
            <Card className="border-neon-cyan border-opacity-30 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-neon-cyan neon-glow mb-6">
                    6-Month Results Timeline
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Month 1-2 */}
                    <div className="flex items-center justify-between p-4 bg-neon-cyan/5 rounded-lg border border-neon-cyan/20">
                      <div className="text-left">
                        <div className="font-semibold text-foreground">Months 1-2</div>
                        <div className="text-sm text-muted-foreground">Setup & Integration</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-neon-cyan">+50%</div>
                        <div className="text-xs text-muted-foreground">Lead Quality</div>
                      </div>
                    </div>

                    {/* Month 3-4 */}
                    <div className="flex items-center justify-between p-4 bg-neon-pink/5 rounded-lg border border-neon-pink/20">
                      <div className="text-left">
                        <div className="font-semibold text-foreground">Months 3-4</div>
                        <div className="text-sm text-muted-foreground">Optimization Phase</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-neon-pink">+180%</div>
                        <div className="text-xs text-muted-foreground">Lead Volume</div>
                      </div>
                    </div>

                    {/* Month 5-6 */}
                    <div className="flex items-center justify-between p-4 bg-neon-green/5 rounded-lg border border-neon-green/20">
                      <div className="text-left">
                        <div className="font-semibold text-foreground">Months 5-6</div>
                        <div className="text-sm text-muted-foreground">Scale & Expand</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-neon-green">+340%</div>
                        <div className="text-xs text-muted-foreground">Total Growth</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terminal Output */}
            <div className="bg-retro-dark border border-neon-cyan rounded-lg p-6">
              <div className="terminal-text text-sm">
                <div className="text-neon-green mb-2">$ analyze --client=techflow --period=6m</div>
                <div className="text-retro-light space-y-1">
                  <div className="flex justify-between">
                    <span className="text-retro-light/80">Leads Generated:</span>
                    <span className="text-neon-cyan">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-retro-light/80">Conversion Rate:</span>
                    <span className="text-neon-pink">24.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-retro-light/80">ROI:</span>
                    <span className="text-neon-green">680%</span>
                  </div>
                  <div className="text-terminal-green mt-2">
                    <span className="animate-pulse">▶</span> Success confirmed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
