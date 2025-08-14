"use client";

import { Card, CardContent } from "@/components/ui/card";
import { testimonials, getFeaturedTestimonials } from "@/data/testimonials";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredTestimonials = getFeaturedTestimonials(3);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredTestimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredTestimonials.length]);

  return (
    <section className="section-spacing relative bg-gradient-to-b from-muted/20 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 retro-grid opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-high-contrast mb-6 leading-tight">
            What Our <span className="text-neon-green font-semibold">Clients</span> Say
          </h2>
          <p className="text-xl text-medium-contrast max-w-2xl mx-auto leading-relaxed">
            Real results from real businesses who've transformed their operations with AI.
          </p>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Mobile: Carousel Layout */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredTestimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard testimonial={testimonial} index={index} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {featuredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-blue' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Terminal-style stats */}
        <div className="mt-16 bg-retro-dark border border-neon-pink rounded-xl p-10">
          <div className="text-center">
            <div className="terminal-text text-neon-green text-sm mb-6">
              $ analytics --client-results --summary
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
              <div>
                <div className="text-4xl font-bold text-neon-cyan-dark neon-glow-subtle mb-3">50+</div>
                <div className="text-sm text-gray-200 terminal-text font-medium">Businesses Transformed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-neon-pink mb-3">£2.4M+</div>
                <div className="text-sm text-gray-200 terminal-text font-medium">Revenue Generated</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-neon-green mb-3">98%</div>
                <div className="text-sm text-gray-200 terminal-text font-medium">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    position: string;
    company: string;
    quote: string;
    service: string;
    results?: string;
  };
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const colors = [
    { text: "text-primary-blue", border: "border-primary-blue", bg: "bg-primary-blue/10" },
    { text: "text-neon-pink", border: "border-neon-pink", bg: "bg-neon-pink/10" },
    { text: "text-neon-green", border: "border-neon-green", bg: "bg-neon-green/10" },
  ];
  
  const color = colors[index % colors.length];

  return (
    <Card className={`group relative overflow-hidden border ${color.border} border-opacity-30 hover:border-opacity-70 bg-card/50 backdrop-blur transition-all duration-300 hover:scale-105`}>
      <CardContent className="p-8">
        {/* Quote */}
        <div className="mb-6">
          <svg className={`w-8 h-8 ${color.text} mb-4 opacity-60`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-high-contrast text-lg leading-relaxed mb-6">
            "{testimonial.quote}"
          </blockquote>
        </div>

        {/* Results Badge */}
        {testimonial.results && (
          <div className={`inline-block px-3 py-1 ${color.bg} ${color.border} border border-opacity-50 rounded-full text-xs font-medium ${color.text} mb-4`}>
            {testimonial.results}
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-center">
          <div className={`w-12 h-12 ${color.bg} rounded-full flex items-center justify-center mr-4 border ${color.border} border-opacity-30`}>
            <span className={`font-bold ${color.text} text-lg`}>
              {testimonial.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className={`font-semibold ${color.text}`}>
              {testimonial.name}
            </div>
            <div className="text-sm text-medium-contrast">
              {testimonial.position}, {testimonial.company}
            </div>
            <div className="text-xs text-medium-contrast terminal-text">
              {testimonial.service}
            </div>
          </div>
        </div>

        {/* Hover Effect */}
        <div className={`absolute inset-0 ${color.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
      </CardContent>
    </Card>
  );
}
