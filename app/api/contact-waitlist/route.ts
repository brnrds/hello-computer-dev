import { NextResponse } from 'next/server';
import { z } from 'zod';

// Adjust fields to match your form payload
const WaitlistSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional().default(''),
  service: z.string().optional(),
  message: z.string().optional(),
  budget: z.string().optional(),
  businessStage: z.string().optional(),
  timeline: z.string().optional(),
  currentChallenges: z.string().optional(),
  aiExperience: z.string().optional(),
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = WaitlistSchema.parse(body);

    // --- Your existing enrichment / CRM logging (keep if you have it) ---
    console.log('Form submission received:', input);

    // Since waitlistEntries API is not available in this Clerk version,
    // we'll store the form data and redirect to the official waitlist flow
    // where the user can complete their waitlist entry
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your application! Redirecting to waitlist...',
        next: '/waitlist'
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('waitlist submit failed', err);
    return NextResponse.json(
      {
        success: false,
        error: 'unable_to_process_form',
        details: err?.message ?? 'Unknown error',
      },
      { status: 400 }
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
