"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Hero from "@/components/Hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  service: z.string().min(1, { message: "Please select a service." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  budget: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
      budget: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (you could show a toast notification here)
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <>
        <Hero
          title="Thank You!"
          subtitle="Message Received"
          description="Your message has been received successfully. We'll get back to you within 24 hours."
          primaryCTA={{ text: "Back to Home", href: "/" }}
          secondaryCTA={{ text: "View Services", href: "/services" }}
          variant="page"
          backgroundPattern={true}
        />
        
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="border-neon-green border-opacity-50 bg-card/50 backdrop-blur">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-neon-green mx-auto mb-6 neon-glow" />
                <h2 className="text-2xl font-bold text-neon-green neon-glow mb-4">
                  We've Received Your Message
                </h2>
                <p className="text-muted-foreground mb-6">
                  Our team will review your inquiry and get back to you within 24 hours with next steps.
                </p>
                <div className="bg-retro-dark border border-neon-green rounded-lg p-4 terminal-text text-sm">
                  <div className="text-neon-green">$ process-inquiry --priority=high</div>
                  <div className="text-terminal-green mt-1">✓ Message queued for review</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Let's Talk"
        subtitle="Get in Touch"
        description="Ready to transform your business with AI? Let's discuss your goals and explore how we can help you achieve them."
        primaryCTA={{ text: "Call Now", href: "tel:+44-20-1234-5678" }}
        secondaryCTA={{ text: "Email Us", href: "mailto:hello@hellocomputer.ai" }}
        variant="page"
        backgroundPattern={true}
      />

      {/* Contact Form & Info Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 retro-grid opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-neon-cyan border-opacity-30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-neon-cyan neon-glow">
                    Tell Us About Your Project
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Smith" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@company.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company Ltd" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Service Interest</FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <option value="">Select a service</option>
                                  <option value="ai-growth">AI Growth Marketing</option>
                                  <option value="creative-engines">Creative Engines</option>
                                  <option value="technical-integration">Technical Integration</option>
                                  <option value="consultation">General Consultation</option>
                                  <option value="other">Other</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Budget Range (Optional)</FormLabel>
                            <FormControl>
                              <select
                                {...field}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                <option value="">Select budget range</option>
                                <option value="under-5k">Under £5,000/month</option>
                                <option value="5k-10k">£5,000 - £10,000/month</option>
                                <option value="10k-25k">£10,000 - £25,000/month</option>
                                <option value="25k-plus">£25,000+/month</option>
                                <option value="project-based">Project-based pricing</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Project Details</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project, goals, and any specific requirements..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full neon-border glow-hover"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <span className="animate-spin mr-2">⚡</span>
                            Sending Message...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Send Message
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="border-neon-pink border-opacity-30 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-neon-pink neon-glow">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-neon-pink" />
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <div className="text-sm text-muted-foreground">hello@hellocomputer.ai</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-neon-pink" />
                    <div>
                      <div className="font-medium text-foreground">Phone</div>
                      <div className="text-sm text-muted-foreground">+44 20 1234 5678</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-neon-pink" />
                    <div>
                      <div className="font-medium text-foreground">Location</div>
                      <div className="text-sm text-muted-foreground">London, United Kingdom</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-neon-pink" />
                    <div>
                      <div className="font-medium text-foreground">Response Time</div>
                      <div className="text-sm text-muted-foreground">Within 24 hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response Promise */}
              <Card className="border-neon-green border-opacity-30 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="font-bold text-neon-green neon-glow mb-4">
                    Our Promise
                  </h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-neon-green mr-2 mt-0.5 flex-shrink-0" />
                      Response within 24 hours
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-neon-green mr-2 mt-0.5 flex-shrink-0" />
                      Free initial consultation
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-neon-green mr-2 mt-0.5 flex-shrink-0" />
                      Custom solution proposal
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-neon-green mr-2 mt-0.5 flex-shrink-0" />
                      No obligation or pressure
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Terminal Status */}
              <div className="bg-retro-dark border border-neon-cyan rounded-lg p-4">
                <div className="terminal-text text-sm">
                  <div className="text-neon-green mb-2">$ status --support-team</div>
                  <div className="text-retro-light space-y-1">
                    <div className="flex justify-between">
                      <span className="text-retro-light/80">Team Status:</span>
                      <span className="text-neon-cyan">Online</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-retro-light/80">Avg Response:</span>
                      <span className="text-neon-green">4.2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-retro-light/80">Availability:</span>
                      <span className="text-terminal-amber">24/7</span>
                    </div>
                    <div className="text-terminal-green mt-2">
                      <span className="animate-pulse">▶</span> Ready to help
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked <span className="text-neon-cyan neon-glow">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly can you start working on my project?",
                answer: "We typically begin initial analysis and planning within 1-2 weeks of project approval. Implementation timelines vary based on scope and complexity."
              },
              {
                question: "Do you work with businesses of all sizes?",
                answer: "Yes, we work with businesses from £1M to £10M+ ARR. Our solutions scale from startup-friendly packages to enterprise implementations."
              },
              {
                question: "What ongoing support do you provide?",
                answer: "All packages include ongoing monitoring, optimization, and support. We provide 24/7 technical support and regular strategy reviews."
              },
              {
                question: "Can you integrate with our existing systems?",
                answer: "Absolutely. We specialize in seamless integration with existing CRMs, marketing tools, and business systems without disrupting your workflow."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-border bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
