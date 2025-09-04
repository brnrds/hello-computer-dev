import { NextRequest, NextResponse } from 'next/server';
import { PromptOptimizer, type PromptOptimizerInput } from '@/utils/prompt-optimizer';

export async function POST(request: NextRequest) {
  try {
    const body: PromptOptimizerInput = await request.json();
    
    // Validate input
    if (!body.roughPrompt || !body.roughPrompt.trim()) {
      return NextResponse.json(
        { error: 'roughPrompt is required and cannot be empty' },
        { status: 400 }
      );
    }

    if (!['BASIC', 'DETAIL'].includes(body.levelOfDetail)) {
      return NextResponse.json(
        { error: 'levelOfDetail must be either BASIC or DETAIL' },
        { status: 400 }
      );
    }

    if (!['ChatGPT', 'Claude', 'Gemini', 'Other'].includes(body.targetAIPlatform)) {
      return NextResponse.json(
        { error: 'targetAIPlatform must be one of: ChatGPT, Claude, Gemini, Other' },
        { status: 400 }
      );
    }

    // Optimize the prompt
    const result = PromptOptimizer.optimize(body);
    
    // Format the result for API response
    const isComplex = body.levelOfDetail === 'DETAIL' || body.roughPrompt.split(/\s+/).length > 15;
    const formattedResult = PromptOptimizer.formatResult(result, isComplex);

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        formattedOutput: formattedResult,
        suggestedMode: PromptOptimizer.suggestMode(body.roughPrompt)
      }
    });

  } catch (error) {
    console.error('Prompt optimization error:', error);
    return NextResponse.json(
      { error: 'Internal server error during prompt optimization' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Prompt Optimizer API',
    welcomeMessage: PromptOptimizer.getWelcomeMessage(),
    usage: {
      endpoint: '/api/prompt-optimizer',
      method: 'POST',
      parameters: {
        roughPrompt: 'string (required) - The rough prompt to optimize',
        levelOfDetail: 'BASIC | DETAIL (required) - Level of optimization detail',
        targetAIPlatform: 'ChatGPT | Claude | Gemini | Other (required) - Target AI platform'
      },
      example: {
        roughPrompt: 'Write me a marketing email',
        levelOfDetail: 'BASIC',
        targetAIPlatform: 'ChatGPT'
      }
    }
  });
}

