"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Clock, Users, Zap } from "lucide-react";

const contactWaitlistSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  service: z.string().min(1, { message: "Please select a service." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  budget: z.string().optional(),
  // Enhanced waitlist-specific fields
  businessStage: z.string().min(1, { message: "Please select your business stage." }),
  timeline: z.string().min(1, { message: "Please select your timeline." }),
  currentChallenges: z.string().min(10, { message: "Please describe your main challenges." }),
  aiExperience: z.string().min(1, { message: "Please select your AI experience level." }),
  joinWaitlist: z.boolean(),
});

type ContactWaitlistValues = z.infer<typeof contactWaitlistSchema>;

export default function ContactWaitlistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactWaitlistValues>({
    resolver: zodResolver(contactWaitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
      budget: "",
      businessStage: "",
      timeline: "",
      currentChallenges: "",
      aiExperience: "",
      joinWaitlist: true,
    },
  });

  async function onSubmit(data: ContactWaitlistValues) {
    setIsLoading(true);
    
    try {
      // Submit to enhanced contact API that also handles waitlist
      const response = await fetch('/api/contact-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Check if we need to redirect to waitlist
        if (result.next) {
          window.location.href = result.next;
        } else {
          setIsSubmitted(true);
          form.reset();
        }
      } else {
        throw new Error(result.message || 'Failed to submit form');
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
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Welcome to the Priority Waitlist!
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you for providing detailed information about your business needs. 
              You've been added to our priority waitlist and our team will review your 
              submission within 24 hours.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-800 text-sm">Quick Review</h3>
                <p className="text-xs text-blue-700">Response within 24 hours</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800 text-sm">Priority Access</h3>
                <p className="text-xs text-green-700">Skip the general waitlist</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-800 text-sm">Founder Pricing</h3>
                <p className="text-xs text-purple-700">Exclusive early access rates</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-700 space-y-1 text-left">
                <li>• Our team reviews your business profile and needs</li>
                <li>• We'll prioritize your access based on timeline and fit</li>
                <li>• You'll receive an invitation when your spot is ready</li>
                <li>• Get exclusive updates on product development</li>
                <li>• Lock in special pricing for early supporters</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <a href="/">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Return to Home
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Questions? Email us at hello@hellocomputer.ai
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Get Priority Access to{' '}
            <span className="text-retro-orange-bright">Hello Computer</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Skip the waitlist with our qualification form
          </p>
          <p className="text-muted-foreground">
            Complete this detailed form to get priority access to our AI-powered business transformation platform.
          </p>
        </div>

        <Card className="border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">
              Tell Us About Your Business
            </CardTitle>
            <p className="text-muted-foreground">
              The more we understand your needs, the better we can prioritize your access and tailor our solution.
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Full Name *</FormLabel>
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
                          <FormLabel className="text-foreground">Work Email *</FormLabel>
                          <FormControl>
                            <Input placeholder="john@company.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Company Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Business Profile */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Business Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessStage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Business Stage *</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                            >
                              <option value="">Select stage</option>
                              <option value="startup">Startup (0-10 employees)</option>
                              <option value="growth">Growth Stage (11-50 employees)</option>
                              <option value="scale">Scale Up (51-200 employees)</option>
                              <option value="enterprise">Enterprise (200+ employees)</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aiExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">AI Experience Level *</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                            >
                              <option value="">Select experience</option>
                              <option value="beginner">Beginner - New to AI</option>
                              <option value="some">Some Experience - Used basic AI tools</option>
                              <option value="experienced">Experienced - Implemented AI solutions</option>
                              <option value="expert">Expert - AI is core to our business</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Project Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Project Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Primary Interest *</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                            >
                              <option value="">Select primary service</option>
                              <option value="ai-growth">AI Growth Marketing</option>
                              <option value="creative-engines">Creative Engines</option>
                              <option value="technical-integration">Technical Integration</option>
                              <option value="full-suite">Complete AI Transformation</option>
                              <option value="consultation">Strategic AI Consultation</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Implementation Timeline *</FormLabel>
                          <FormControl>
                            <select 
                              {...field} 
                              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                            >
                              <option value="">When do you need this?</option>
                              <option value="immediate">Immediate (ASAP)</option>
                              <option value="1-month">Within 1 month</option>
                              <option value="3-months">Within 3 months</option>
                              <option value="6-months">Within 6 months</option>
                              <option value="planning">Planning for next year</option>
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
                        <FormLabel className="text-foreground">Investment Budget Range</FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                          >
                            <option value="">Select budget (optional)</option>
                            <option value="under-10k">Under $10,000</option>
                            <option value="10k-25k">$10,000 - $25,000</option>
                            <option value="25k-50k">$25,000 - $50,000</option>
                            <option value="50k-100k">$50,000 - $100,000</option>
                            <option value="100k-plus">$100,000+</option>
                            <option value="discuss">Prefer to discuss</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Detailed Requirements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
                    Tell Us More
                  </h3>
                  <FormField
                    control={form.control}
                    name="currentChallenges"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          What are your biggest business/marketing challenges? *
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the main challenges you're facing that AI could help solve..."
                            rows={3}
                            {...field} 
                          />
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
                        <FormLabel className="text-foreground">
                          What specific outcomes are you hoping to achieve? *
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your goals, what success looks like, and how we can help transform your business..."
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Priority Access Benefits:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Skip the general waitlist queue</li>
                    <li>• Get personal consultation within 24 hours</li>
                    <li>• Lock in founder pricing (up to 40% off)</li>
                    <li>• Direct access to our founding team</li>
                    <li>• Custom AI strategy session included</li>
                  </ul>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing Application..." : "Apply for Priority Access"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting this application, you'll be added to our priority waitlist and receive updates about Hello Computer. 
                  We respect your privacy and will never spam you.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
