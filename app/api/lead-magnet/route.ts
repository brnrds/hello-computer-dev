import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const leadMagnetSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().optional().default('website'),
  leadMagnet: z.string().optional().default('ai-marketing-guide'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = leadMagnetSchema.parse(body);
    
    // In a real application, you would:
    // 1. Save email to database/mailing list
    // 2. Send the lead magnet via email
    // 3. Add to email marketing automation sequence
    // 4. Track conversion in analytics
    
    console.log('Lead magnet signup:', validatedData);
    
    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In production, you might want to:
    // await addToMailingList(validatedData.email);
    // await sendLeadMagnet(validatedData.email, validatedData.leadMagnet);
    // await trackConversion('lead-magnet-signup', validatedData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Please check your email for the download link.',
        downloadUrl: '/downloads/ai-marketing-transformation-guide.pdf' // This would be a real download URL
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Lead magnet error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address provided'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// Handle newsletter signup (different from lead magnet)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newsletterSchema = z.object({
      email: z.string().email('Invalid email address'),
      source: z.string().optional().default('newsletter-footer'),
    });
    
    const validatedData = newsletterSchema.parse(body);
    
    console.log('Newsletter signup:', validatedData);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to our newsletter!' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Newsletter signup error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email address provided'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Lead magnet endpoint is available.',
      endpoints: {
        'POST /': 'Download lead magnet',
        'PUT /': 'Newsletter signup'
      }
    },
    { status: 200 }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
