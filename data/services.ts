export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  slug: string;
}

export const services: Service[] = [
  {
    id: "ai-growth",
    title: "AI Growth Marketing",
    subtitle: "Done-for-you growth engines that convert",
    description: "We build complete AI-powered marketing systems that generate qualified leads, nurture prospects, and convert them into customers—while you focus on delivery.",
    features: [
      "AI-driven outbound sequences with personalized messaging",
      "Lead magnets that capture and qualify prospects automatically",
      "Smart content creation for social media and email campaigns",
      "Landing pages optimized for conversion",
      "Integrated CRM workflows and lead scoring",
      "Performance analytics and optimization"
    ],
    slug: "ai-growth"
  },
  {
    id: "creative-engines",
    title: "Creative Engines",
    subtitle: "AI-powered content that converts and engages",
    description: "Transform your content creation with AI systems that produce high-quality, brand-consistent content at scale—from social posts to long-form articles.",
    features: [
      "AI content generation with brand voice training",
      "Visual assets and graphics creation",
      "Video content and animation production",
      "Social media content calendars",
      "Blog and article writing with SEO optimization",
      "Creative campaign concepts and execution"
    ],
    slug: "creative-engines"
  },
  {
    id: "technical-integration",
    title: "Technical Integration",
    subtitle: "Seamless AI integration into your existing systems",
    description: "Connect AI capabilities directly into your business processes with custom integrations, automation workflows, and technical implementations.",
    features: [
      "Custom AI model integration and deployment",
      "API development and third-party connections",
      "Workflow automation and process optimization",
      "Data pipeline creation and management",
      "AI chatbots and customer service automation",
      "Technical consulting and implementation support"
    ],
    slug: "technical-integration"
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};
