import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactWaitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget: z.string().optional(),
  businessStage: z.string().min(1, 'Please select your business stage'),
  timeline: z.string().min(1, 'Please select your timeline'),
  currentChallenges: z.string().min(10, 'Please describe your challenges'),
  aiExperience: z.string().min(1, 'Please select your AI experience level'),
  joinWaitlist: z.boolean().default(true),
});

// Priority scoring function
function calculatePriorityScore(data: any): number {
  let score = 0;
  
  // Timeline urgency (higher priority for immediate needs)
  const timelineScores: Record<string, number> = {
    'immediate': 50,
    '1-month': 40,
    '3-months': 30,
    '6-months': 20,
    'planning': 10
  };
  score += timelineScores[data.timeline] || 0;
  
  // Business stage (larger companies often have higher priority)
  const stageScores: Record<string, number> = {
    'enterprise': 30,
    'scale': 25,
    'growth': 20,
    'startup': 15
  };
  score += stageScores[data.businessStage] || 0;
  
  // Budget range (higher budget = higher priority)
  const budgetScores: Record<string, number> = {
    '100k-plus': 20,
    '50k-100k': 15,
    '25k-50k': 10,
    '10k-25k': 5,
    'under-10k': 2
  };
  score += budgetScores[data.budget] || 0;
  
  return score;
}

// Check if user qualifies for immediate access
function qualifiesForImmediateAccess(data: any, score: number): boolean {
  // High priority criteria
  const hasUrgentTimeline = ['immediate', '1-month'].includes(data.timeline);
  const hasGoodBudget = ['50k-100k', '100k-plus'].includes(data.budget);
  const isLargerCompany = ['scale', 'enterprise'].includes(data.businessStage);
  
  // Immediate access if score is high enough OR meets specific criteria
  return score >= 80 || (hasUrgentTimeline && (hasGoodBudget || isLargerCompany));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactWaitlistSchema.parse(body);
    
    // Calculate priority score
    const priorityScore = calculatePriorityScore(validatedData);
    const immediateAccess = qualifiesForImmediateAccess(validatedData, priorityScore);
    
    // Enhanced contact data with waitlist metadata
    const enhancedContactData = {
      ...validatedData,
      source: 'contact-waitlist',
      priorityScore,
      immediateAccess,
      submittedAt: new Date().toISOString(),
      // Additional metadata for CRM
      leadQuality: priorityScore >= 60 ? 'high' : priorityScore >= 30 ? 'medium' : 'low',
      qualification: {
        businessStage: validatedData.businessStage,
        timeline: validatedData.timeline,
        budget: validatedData.budget,
        aiExperience: validatedData.aiExperience,
        priorityScore
      }
    };
    
    // 1. Save contact information (your existing contact logic)
    console.log('Enhanced contact form submission:', enhancedContactData);
    
    // 2. Do NOT create a Clerk user here; only store lead data as needed.
    // After processing, send the visitor to the official waitlist flow.
    console.log('Enhanced contact form submission:', enhancedContactData);
    
    // In production, you would also:
    // - Send notification email to your team with priority flag
    // - Send confirmation email to user with appropriate messaging
    // - Add to your CRM with enhanced qualification data
    // - Trigger automated follow-up sequences based on priority
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 3. In production, you would also:
    // - Send notification email to your team with priority flag
    // - Send confirmation email to user with appropriate messaging
    // - Add to your CRM with enhanced qualification data
    // - Trigger automated follow-up sequences based on priority
    
    // Return JSON with redirect instruction for client-side navigation
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your application! Redirecting to waitlist...',
        next: '/waitlist'
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Contact-waitlist form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please check your form inputs',
          errors: error.issues 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your application. Please try again or contact us directly.' 
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Contact-waitlist endpoint. Use POST to submit applications.' },
    { status: 405 }
  );
}
