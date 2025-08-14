export interface Deliverable {
  category: string;
  items: string[];
}

export interface ServiceDeliverables {
  aiGrowth: Deliverable[];
  creativeEngines: Deliverable[];
  technicalIntegration: Deliverable[];
}

export const deliverables: ServiceDeliverables = {
  aiGrowth: [
    {
      category: "Strategy & Planning",
      items: [
        "Comprehensive growth strategy document",
        "Target audience analysis and personas",
        "Competitive landscape assessment",
        "KPI framework and success metrics",
        "90-day implementation roadmap"
      ]
    },
    {
      category: "Content & Campaigns",
      items: [
        "AI-powered email sequences (3-7 emails per sequence)",
        "Lead magnets (eBooks, guides, templates)",
        "Social media content calendar (monthly)",
        "Landing pages optimized for conversion",
        "Blog content and SEO optimization"
      ]
    },
    {
      category: "Systems & Automation",
      items: [
        "CRM setup and configuration",
        "Marketing automation workflows",
        "Lead scoring and qualification system",
        "Analytics dashboard and reporting",
        "Integration with existing tools"
      ]
    },
    {
      category: "Ongoing Support",
      items: [
        "Weekly performance reports",
        "Monthly strategy optimization calls",
        "Continuous A/B testing and improvement",
        "Technical support and troubleshooting",
        "Strategic guidance and consultation"
      ]
    }
  ],
  creativeEngines: [
    {
      category: "Content Strategy",
      items: [
        "Brand voice analysis and AI training",
        "Content pillars and messaging framework",
        "Editorial calendar and content planning",
        "Visual brand guidelines and style guide",
        "Content performance benchmarks"
      ]
    },
    {
      category: "Written Content",
      items: [
        "Blog articles and thought leadership pieces",
        "Social media posts and captions",
        "Email newsletters and campaigns",
        "Website copy and product descriptions",
        "Case studies and success stories"
      ]
    },
    {
      category: "Visual Assets",
      items: [
        "Custom graphics and illustrations",
        "Social media templates and designs",
        "Infographics and data visualizations",
        "Video content and animations",
        "Brand photography direction"
      ]
    },
    {
      category: "Campaign Execution",
      items: [
        "Multi-channel campaign concepts",
        "Creative asset production and delivery",
        "Content distribution and promotion",
        "Performance tracking and optimization",
        "Creative refresh and iteration"
      ]
    }
  ],
  technicalIntegration: [
    {
      category: "Analysis & Planning",
      items: [
        "Technical requirements analysis",
        "System architecture design",
        "Integration roadmap and timeline",
        "Risk assessment and mitigation plan",
        "Technical documentation and specifications"
      ]
    },
    {
      category: "Development & Integration",
      items: [
        "Custom AI model development and training",
        "API development and third-party integrations",
        "Workflow automation implementation",
        "Data pipeline creation and management",
        "Quality assurance and testing"
      ]
    },
    {
      category: "Deployment & Support",
      items: [
        "Production deployment and configuration",
        "System monitoring and alerting setup",
        "User training and documentation",
        "Performance optimization and tuning",
        "Ongoing maintenance and updates"
      ]
    },
    {
      category: "Optimization & Growth",
      items: [
        "Performance analytics and reporting",
        "Continuous improvement recommendations",
        "Scalability planning and implementation",
        "Technical consulting and strategic guidance",
        "Emergency support and troubleshooting"
      ]
    }
  ]
};
