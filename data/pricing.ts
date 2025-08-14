export interface PricingTier {
  package: string;
  price: string;
  includes: string;
  features?: string[];
}

export interface ServicePricing {
  aiGrowth: PricingTier[];
  creativeEngines: PricingTier[];
  technicalIntegration: PricingTier[];
}

export const pricing: ServicePricing = {
  aiGrowth: [
    {
      package: "Starter",
      price: "£2,500/mo",
      includes: "1 outbound sequence, 1 lead magnet, 4 posts",
      features: [
        "AI outbound email sequence",
        "Lead magnet creation and landing page",
        "4 social media posts per week",
        "Basic analytics dashboard",
        "Email support"
      ]
    },
    {
      package: "Growth",
      price: "£5,000/mo",
      includes: "2+ sequences, AI inbox, 8 posts, landing page",
      features: [
        "Multiple outbound sequences",
        "AI-powered inbox management",
        "8 social media posts per week",
        "Custom landing pages",
        "Advanced analytics and reporting",
        "Priority support"
      ]
    },
    {
      package: "Custom",
      price: "from £7,500/mo",
      includes: "Full-funnel growth engine, tailored integrations",
      features: [
        "Complete marketing automation",
        "Custom AI model training",
        "Unlimited content creation",
        "Full CRM integration",
        "Dedicated account manager",
        "24/7 support"
      ]
    }
  ],
  creativeEngines: [
    {
      package: "Content Creator",
      price: "£1,500/mo",
      includes: "AI content generation, brand voice training",
      features: [
        "50 social media posts per month",
        "4 blog articles per month",
        "Brand voice AI training",
        "Basic visual assets",
        "Content calendar planning"
      ]
    },
    {
      package: "Creative Studio",
      price: "£3,500/mo",
      includes: "Full creative suite, video content, campaigns",
      features: [
        "Unlimited social media content",
        "Weekly blog articles",
        "Video content creation",
        "Custom graphics and visuals",
        "Campaign concept development",
        "Performance optimization"
      ]
    },
    {
      package: "Enterprise Creative",
      price: "from £6,000/mo",
      includes: "Dedicated creative team, custom workflows",
      features: [
        "Dedicated creative team",
        "Custom content workflows",
        "Advanced video production",
        "Multi-channel campaigns",
        "Brand strategy consultation",
        "Priority turnaround times"
      ]
    }
  ],
  technicalIntegration: [
    {
      package: "Integration Starter",
      price: "£3,000/mo",
      includes: "Basic AI integration, API setup",
      features: [
        "Simple AI model integration",
        "Basic API development",
        "Documentation and training",
        "Standard support",
        "Monthly optimization review"
      ]
    },
    {
      package: "Advanced Integration",
      price: "£6,500/mo",
      includes: "Complex workflows, custom development",
      features: [
        "Complex workflow automation",
        "Custom AI model development",
        "Advanced API integrations",
        "Real-time monitoring",
        "Dedicated technical support"
      ]
    },
    {
      package: "Enterprise Solution",
      price: "from £10,000/mo",
      includes: "Full technical partnership, ongoing development",
      features: [
        "Complete technical partnership",
        "Ongoing development and optimization",
        "Enterprise-grade infrastructure",
        "24/7 technical support",
        "Dedicated development team",
        "Strategic consulting"
      ]
    }
  ]
};
