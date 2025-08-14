import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deliverables, type Deliverable } from "@/data/deliverables";
import { CheckCircle } from "lucide-react";

interface DeliverablesTableProps {
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

const categoryIcons = {
  "Strategy & Planning": "🎯",
  "Content & Campaigns": "📝", 
  "Systems & Automation": "⚙️",
  "Ongoing Support": "🔄",
  "Content Strategy": "📋",
  "Written Content": "✏️",
  "Visual Assets": "🎨",
  "Campaign Execution": "🚀",
  "Analysis & Planning": "📊",
  "Development & Integration": "🔧",
  "Deployment & Support": "🚀",
  "Optimization & Growth": "📈"
};

export default function DeliverablesTable({ service, title }: DeliverablesTableProps) {
  const serviceDeliverables = deliverables[service];
  const colors = serviceColors[service];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground">
              Everything we deliver to ensure your success with AI transformation.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {serviceDeliverables.map((category, index) => (
            <Card 
              key={category.category}
              className={`border ${colors.border} border-opacity-30 hover:border-opacity-70 bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105`}
            >
              <CardHeader>
                <CardTitle className={`flex items-center text-xl ${colors.text} neon-glow`}>
                  <span className="mr-3 text-2xl">
                    {categoryIcons[category.category as keyof typeof categoryIcons] || "📋"}
                  </span>
                  {category.category}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className={`w-4 h-4 ${colors.text} mr-3 mt-0.5 flex-shrink-0`} />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* Hover Effect */}
              <div className={`absolute inset-0 ${colors.bg} opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-lg`}></div>
            </Card>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="mt-16">
          <h3 className={`text-2xl font-bold text-center mb-12 ${colors.text} neon-glow`}>
            Delivery Timeline
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full ${colors.bg} hidden lg:block`}></div>
            
            <div className="space-y-8 lg:space-y-12">
              {serviceDeliverables.map((category, index) => (
                <div 
                  key={category.category}
                  className={`flex flex-col lg:flex-row items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className={`hidden lg:flex w-8 h-8 ${colors.bg} ${colors.border} border-2 rounded-full items-center justify-center ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'} flex-shrink-0`}>
                    <span className={`text-xs font-bold ${colors.text}`}>
                      {index + 1}
                    </span>
                  </div>

                  {/* Timeline Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                    <div className={`inline-block px-4 py-2 ${colors.bg} ${colors.border} border rounded-full text-sm font-medium ${colors.text} mb-2`}>
                      Week {index + 1}-{index + 2}
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {category.category}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {category.items.length} deliverables including {category.items[0].toLowerCase()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal-style summary */}
        <div className="mt-16 bg-retro-dark border border-neon-cyan rounded-xl p-8 text-center">
          <div className="terminal-text text-sm text-neon-green mb-4">
            $ calculate --total-deliverables --service={service}
          </div>
          <div className="text-retro-light">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className={`text-2xl font-bold ${colors.text} neon-glow mb-1`}>
                  {serviceDeliverables.reduce((total, category) => total + category.items.length, 0)}+
                </div>
                <div className="text-sm text-retro-light/80">Total Deliverables</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${colors.text} neon-glow mb-1`}>
                  {serviceDeliverables.length}
                </div>
                <div className="text-sm text-retro-light/80">Delivery Phases</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${colors.text} neon-glow mb-1`}>
                  {serviceDeliverables.length * 2}
                </div>
                <div className="text-sm text-retro-light/80">Weeks Timeline</div>
              </div>
            </div>
            <div className="mt-4 text-terminal-green">
              <span className="animate-pulse">▶</span> All deliverables included in your package
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
