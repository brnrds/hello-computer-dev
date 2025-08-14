export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  quote: string;
  service: string;
  results?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "sarah-marketing",
    name: "Sarah Chen",
    position: "VP of Marketing",
    company: "TechFlow Solutions",
    quote: "Hello Computer transformed our lead generation completely. Their AI-powered outbound sequences generated 340% more qualified leads in just 3 months, and the quality was exceptional.",
    service: "AI Growth Marketing",
    results: "340% increase in qualified leads"
  },
  {
    id: "marcus-founder",
    name: "Marcus Thompson",
    position: "Founder & CEO",
    company: "InnovateHub",
    quote: "The creative engines they built for us produce content that's indistinguishable from our best human writers, but at 10x the speed. Our content output increased dramatically while maintaining our brand voice perfectly.",
    service: "Creative Engines",
    results: "10x faster content production"
  },
  {
    id: "elena-cto",
    name: "Elena Rodriguez",
    position: "CTO",
    company: "DataStream Analytics",
    quote: "Their technical integration expertise is outstanding. They seamlessly integrated AI capabilities into our existing platform, reducing manual work by 75% and improving our customer experience significantly.",
    service: "Technical Integration",
    results: "75% reduction in manual work"
  },
  {
    id: "james-director",
    name: "James Mitchell",
    position: "Growth Director",
    company: "ScaleUp Ventures",
    quote: "Working with Hello Computer feels like having an entire AI-powered marketing team. They understand both the technology and the business strategy needed to drive real results.",
    service: "AI Growth Marketing",
    results: "Complete marketing automation"
  },
  {
    id: "priya-head",
    name: "Priya Patel",
    position: "Head of Content",
    company: "BrandForge",
    quote: "The creative output from their AI systems is remarkable. We went from struggling to keep up with content demands to having a surplus of high-quality, on-brand content across all channels.",
    service: "Creative Engines",
    results: "Consistent multi-channel content"
  },
  {
    id: "alex-coo",
    name: "Alex Kumar",
    position: "COO",
    company: "ProcessPro",
    quote: "The automation workflows they implemented have revolutionized our operations. Tasks that used to take hours now happen automatically, freeing our team to focus on strategic work.",
    service: "Technical Integration",
    results: "Full process automation"
  }
];

export const getFeaturedTestimonials = (count: number = 3): Testimonial[] => {
  return testimonials.slice(0, count);
};

export const getTestimonialsByService = (service: string): Testimonial[] => {
  return testimonials.filter(testimonial => 
    testimonial.service.toLowerCase().includes(service.toLowerCase())
  );
};
