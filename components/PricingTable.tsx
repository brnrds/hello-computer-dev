import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { pricing, type PricingTier } from "@/data/pricing";
import Link from "next/link";

interface PricingTableProps {
  service: "aiGrowth" | "creativeEngines" | "technicalIntegration";
  title?: string;
}

const serviceColors = {
  aiGrowth: {
    text: "text-neon-cyan",
    border: "border-neon-cyan",
    bg: "bg-neon-cyan/10"
  },
  creativeEngines: {
    text: "text-neon-pink",
    border: "border-neon-pink",
    bg: "bg-neon-pink/10"
  },
  technicalIntegration: {
    text: "text-neon-green",
    border: "border-neon-green",
    bg: "bg-neon-green/10"
  }
};

export default function PricingTable({ service, title }: PricingTableProps) {
  const servicePricing = pricing[service];
  const colors = serviceColors[service];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-on-light mb-4">
              {title}
            </h2>
            <p className="text-on-light-muted">
              Choose the package that fits your business needs and growth goals.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicePricing.map((tier, index) => {
            const isPopular = index === 1; // Middle tier is popular
            
            return (
              <Card 
                key={tier.package}
                className={`relative ${
                  isPopular 
                    ? `${colors.border} border-2 border-opacity-70 scale-105` 
                    : `${colors.border} border border-opacity-30`
                } bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105`}
              >
                {isPopular && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 ${colors.bg} ${colors.border} border rounded-full text-xs font-medium ${colors.text}`}>
                    Most Popular
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className={`text-2xl font-bold ${colors.text}`}>
                    {tier.package}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-on-light">
                      {tier.price.split('/')[0]}
                    </span>
                    {tier.price.includes('/') && (
                      <span className="text-on-light-muted">
                        /{tier.price.split('/')[1]}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-on-light-muted mt-2">
                    {tier.includes}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features List */}
                  {tier.features && (
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className={`w-4 h-4 ${colors.text} mr-3 mt-0.5 flex-shrink-0`} />
                          <span className="text-sm text-on-light-muted">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA Button */}
                  <Button 
                    asChild 
                    variant={isPopular ? "default" : "outline"}
                    className="w-full"
                    size="lg"
                  >
                    <Link href="/contact">
                      {tier.package === "Custom" || tier.package === "Enterprise Solution" || tier.package === "Enterprise Creative"
                        ? "Contact Sales"
                        : "Get Started"
                      }
                    </Link>
                  </Button>

                  {/* Additional Info */}
                  <div className="text-center">
                    <p className="text-xs text-on-light-muted">
                      {tier.package === "Custom" || tier.package === "Enterprise Solution" || tier.package === "Enterprise Creative"
                        ? "Custom pricing based on requirements"
                        : "No setup fees • Cancel anytime"
                      }
                    </p>
                  </div>
                </CardContent>

                {/* Hover Effect */}
                <div className={`absolute inset-0 ${colors.bg} opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-lg`}></div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-dark border border-accent-primary-dark rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-accent-primary-dark-glow mb-4">
              Not sure which package is right for you?
            </h3>
            <p className="text-on-dark mb-6">
              Book a free consultation and we'll help you choose the perfect solution for your business.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Book Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
