/**
 * Lyra - AI Prompt Optimization Tool
 * Transforms rough prompts into precision-crafted prompts using the 4-D methodology
 */

export type LevelOfDetail = 'BASIC' | 'DETAIL';
export type TargetAIPlatform = 'ChatGPT' | 'Claude' | 'Gemini' | 'Other';

export interface OptimizationResult {
  optimizedPrompt: string;
  improvements: string[];
  techniquesApplied: string[];
  proTip?: string;
  clarifyingQuestions?: string[];
}

export interface LyraInput {
  roughPrompt: string;
  levelOfDetail: LevelOfDetail;
  targetAIPlatform: TargetAIPlatform;
}

export class LyraOptimizer {
  private static readonly WELCOME_MESSAGE = `Hello! I'm Lyra, your AI prompt optimizer. I transform vague requests into precise, effective prompts that deliver better results.

**What I need to know:**
- **Target AI:** ChatGPT, Claude, Gemini, or Other
- **Prompt Style:** DETAIL (I'll ask clarifying questions first) or BASIC (quick optimization)

**Examples:**
- "DETAIL using ChatGPT — Write me a marketing email"
- "BASIC using Claude — Help with my resume"

Just share your rough prompt and I'll handle the optimization!`;

  /**
   * Main optimization function implementing the 4-D methodology
   */
  static optimize(input: LyraInput): OptimizationResult {
    const { roughPrompt, levelOfDetail, targetAIPlatform } = input;

    // Step 1: DECONSTRUCT
    const analysis = this.deconstruct(roughPrompt);
    
    // Step 2: DIAGNOSE
    const diagnosis = this.diagnose(analysis, roughPrompt);
    
    // Step 3: DEVELOP
    const development = this.develop(analysis, diagnosis, targetAIPlatform, levelOfDetail);
    
    // Step 4: DELIVER
    return this.deliver(development, levelOfDetail);
  }

  /**
   * Step 1: DECONSTRUCT - Extract core intent, entities, and context
   */
  private static deconstruct(roughPrompt: string) {
    const words = roughPrompt.toLowerCase().split(/\s+/);
    const length = words.length;
    
    // Determine request type
    let requestType: 'Creative' | 'Technical' | 'Educational' | 'Complex' = 'Complex';
    
    if (words.some(w => ['write', 'create', 'design', 'story', 'creative'].includes(w))) {
      requestType = 'Creative';
    } else if (words.some(w => ['code', 'debug', 'technical', 'api', 'function', 'algorithm'].includes(w))) {
      requestType = 'Technical';
    } else if (words.some(w => ['explain', 'teach', 'learn', 'understand', 'how'].includes(w))) {
      requestType = 'Educational';
    }

    // Extract entities and context
    const hasSpecificContext = words.some(w => ['for', 'about', 'regarding', 'concerning'].includes(w));
    const hasOutputRequirements = words.some(w => ['format', 'length', 'style', 'tone'].includes(w));
    
    return {
      requestType,
      wordCount: length,
      hasSpecificContext,
      hasOutputRequirements,
      complexity: length > 20 ? 'high' : length > 10 ? 'medium' : 'low'
    };
  }

  /**
   * Step 2: DIAGNOSE - Audit for gaps and assess needs
   */
  private static diagnose(analysis: any, roughPrompt: string) {
    const issues = [];
    const needs = [];

    // Check for clarity gaps
    if (analysis.wordCount < 5) {
      issues.push('Too vague - needs more context');
      needs.push('context expansion');
    }

    if (!analysis.hasSpecificContext) {
      issues.push('Missing specific context');
      needs.push('context specification');
    }

    if (!analysis.hasOutputRequirements) {
      issues.push('No output format specified');
      needs.push('output formatting');
    }

    // Check for question words without structure
    const hasQuestionWords = /\b(what|how|why|when|where|who)\b/i.test(roughPrompt);
    if (hasQuestionWords && !roughPrompt.includes('?')) {
      issues.push('Question format unclear');
      needs.push('question structuring');
    }

    return { issues, needs, requiresStructure: analysis.complexity === 'high' };
  }

  /**
   * Step 3: DEVELOP - Apply optimization techniques
   */
  private static develop(analysis: any, diagnosis: any, platform: TargetAIPlatform, detail: LevelOfDetail) {
    const techniques = [];
    let roleAssignment = '';
    let structure = '';
    let contextEnhancement = '';
    let outputSpecs = '';

    // Role assignment based on request type
    switch (analysis.requestType) {
      case 'Creative':
        roleAssignment = 'You are a creative writing expert with years of experience in storytelling and content creation.';
        techniques.push('Multi-perspective analysis', 'Tone emphasis');
        break;
      case 'Technical':
        roleAssignment = 'You are a senior technical expert with deep knowledge in software development and system architecture.';
        techniques.push('Constraint-based optimization', 'Precision focus');
        break;
      case 'Educational':
        roleAssignment = 'You are an experienced educator skilled at breaking down complex topics into clear, understandable explanations.';
        techniques.push('Few-shot examples', 'Clear structure');
        break;
      default:
        roleAssignment = 'You are an expert consultant with comprehensive knowledge across multiple domains.';
        techniques.push('Chain-of-thought reasoning', 'Systematic frameworks');
    }

    // Platform-specific optimizations
    switch (platform) {
      case 'ChatGPT':
        structure = '\n\n## Task:\n[Main request]\n\n## Context:\n[Background information]\n\n## Requirements:\n[Specific needs]\n\n## Output Format:\n[Desired format]';
        techniques.push('Structured sections');
        break;
      case 'Claude':
        structure = '\n\nPlease approach this systematically:\n1. First, analyze the requirements\n2. Then, develop your response\n3. Finally, review and refine\n\nProvide detailed reasoning for your approach.';
        techniques.push('Reasoning frameworks');
        break;
      case 'Gemini':
        structure = '\n\nConsider multiple perspectives and provide creative alternatives where applicable.';
        techniques.push('Comparative analysis');
        break;
      default:
        structure = '\n\nPlease provide a comprehensive response with clear reasoning.';
        techniques.push('Universal best practices');
    }

    // Context enhancement
    if (diagnosis.needs.includes('context expansion')) {
      contextEnhancement = '\n\nContext: [Provide relevant background, target audience, and specific use case]';
    }

    // Output specifications
    if (diagnosis.needs.includes('output formatting')) {
      outputSpecs = '\n\nOutput Requirements:\n- Format: [Specify format]\n- Length: [Specify length]\n- Tone: [Specify tone]\n- Include: [Specific elements to include]';
    }

    return {
      roleAssignment,
      structure,
      contextEnhancement,
      outputSpecs,
      techniques,
      needsClarification: detail === 'DETAIL' && diagnosis.issues.length > 2
    };
  }

  /**
   * Step 4: DELIVER - Construct and format the optimized prompt
   */
  private static deliver(development: any, levelOfDetail: LevelOfDetail): OptimizationResult {
    const optimizedPrompt = [
      development.roleAssignment,
      development.structure,
      development.contextEnhancement,
      development.outputSpecs
    ].filter(Boolean).join('');

    const improvements = [
      'Added expert role assignment for better context',
      'Implemented structured approach for clarity',
      'Enhanced specificity and context',
      'Optimized for target AI platform'
    ];

    const result: OptimizationResult = {
      optimizedPrompt: optimizedPrompt.trim(),
      improvements,
      techniquesApplied: development.techniques
    };

    // Add pro tip based on complexity
    if (levelOfDetail === 'DETAIL') {
      result.proTip = 'For best results, customize the context and requirements sections with your specific details.';
    }

    // Add clarifying questions for DETAIL mode
    if (development.needsClarification) {
      result.clarifyingQuestions = [
        'What is the specific context or use case for this request?',
        'Who is your target audience?',
        'What format would you prefer for the output?'
      ];
    }

    return result;
  }

  /**
   * Get the welcome message
   */
  static getWelcomeMessage(): string {
    return this.WELCOME_MESSAGE;
  }

  /**
   * Auto-detect complexity and suggest mode
   */
  static suggestMode(roughPrompt: string): LevelOfDetail {
    const words = roughPrompt.split(/\s+/).length;
    const hasComplexRequirements = /\b(professional|business|complex|detailed|comprehensive)\b/i.test(roughPrompt);
    
    return (words > 15 || hasComplexRequirements) ? 'DETAIL' : 'BASIC';
  }

  /**
   * Format the result for display
   */
  static formatResult(result: OptimizationResult, isComplex: boolean = false): string {
    if (isComplex) {
      return `**Your Optimized Prompt:**
${result.optimizedPrompt}

**Key Improvements:**
${result.improvements.map(imp => `• ${imp}`).join('\n')}

**Techniques Applied:** ${result.techniquesApplied.join(', ')}

${result.proTip ? `**Pro Tip:** ${result.proTip}` : ''}

${result.clarifyingQuestions ? `**Clarifying Questions:**\n${result.clarifyingQuestions.map(q => `• ${q}`).join('\n')}` : ''}`;
    } else {
      return `**Your Optimized Prompt:**
${result.optimizedPrompt}

**What Changed:** ${result.improvements.join(', ')}`;
    }
  }
}

