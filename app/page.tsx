import Hero from "@/components/Hero";
import USPSection from "@/components/USPSection";
import ServicesGrid from "@/components/ServicesGrid";
import CaseStudyTeaser from "@/components/CaseStudyTeaser";
import Testimonials from "@/components/Testimonials";
import LeadMagnetCTA from "@/components/LeadMagnetCTA";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero
        title="The Done-for-You AI Agency"
        subtitle="AI + Human Expertise"
        description="Transform your business with AI-powered growth marketing, creative engines, and seamless technical integration. Expert human guidance meets cutting-edge AI technology."
        primaryCTA={{ text: "Get Priority Access", href: "/contact-waitlist" }}
        secondaryCTA={{ text: "Download Free Guide", href: "#lead-magnet" }}
        variant="home"
        backgroundPattern={true}
      />

      {/* USP Section */}
      <USPSection />

      {/* Services Grid */}
      <ServicesGrid />

      {/* Case Study Teaser */}
      <CaseStudyTeaser />

      {/* Testimonials */}
      <Testimonials />

      {/* Lead Magnet CTA */}
      <div id="lead-magnet">
        <LeadMagnetCTA />
      </div>
    </>
  );
}
