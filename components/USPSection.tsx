import { Card, CardContent } from "@/components/ui/card";

interface USP {
  title: string;
  description: string;
  icon: string;
  color: "cyan" | "pink" | "green";
}

const usps: USP[] = [
  {
    title: "AI + Human Expertise",
    description: "Cutting-edge AI technology guided by expert human strategy. Get the best of both worlds without the complexity.",
    icon: "🤖",
    color: "cyan"
  },
  {
    title: "Done-for-You Delivery",
    description: "Complete marketing systems, creative content, and technical integrations delivered ready-to-use. No learning curve required.",
    icon: "⚡",
    color: "pink"
  },
  {
    title: "Results-Driven Focus",
    description: "Every solution is built to drive measurable business outcomes. We optimize for your success, not just impressive technology.",
    icon: "📈",
    color: "green"
  }
];

const colorClasses = {
  cyan: {
    text: "text-neon-cyan",
    border: "border-neon-cyan",
    bg: "bg-neon-cyan/10"
  },
  pink: {
    text: "text-neon-pink",
    border: "border-neon-pink",
    bg: "bg-neon-pink/10"
  },
  green: {
    text: "text-neon-green",
    border: "border-neon-green",
    bg: "bg-neon-green/10"
  }
};

export default function USPSection() {
  return (
    <section className="py-24 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-neon-cyan neon-glow">Hello Computer</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We bridge the gap between AI potential and business reality with solutions that actually work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {usps.map((usp, index) => {
            const colors = colorClasses[usp.color];
            return (
              <Card 
                key={index} 
                className={`relative group hover:scale-105 transition-all duration-300 ${colors.border} border-opacity-30 hover:border-opacity-70 bg-card/50 backdrop-blur`}
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${colors.bg} flex items-center justify-center text-2xl border ${colors.border} border-opacity-30`}>
                    {usp.icon}
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-4 ${colors.text} neon-glow`}>
                    {usp.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {usp.description}
                  </p>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 ${colors.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}></div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-retro-dark border border-neon-cyan rounded-lg p-6 max-w-2xl mx-auto">
            <div className="terminal-text text-neon-green text-sm mb-2">
              $ deploy --business-transformation
            </div>
            <p className="text-retro-light text-lg">
              Ready to see what <span className="text-neon-cyan neon-glow">AI + human expertise</span> can do for your business?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
