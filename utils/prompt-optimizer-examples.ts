/**
 * PromptOptimizer Usage Examples
 * Demonstrates how to use the PromptOptimizer tool
 */

import { PromptOptimizer, type PromptOptimizerInput } from './prompt-optimizer';

// Example 1: Basic usage with a simple prompt
export function basicExample() {
  const input: PromptOptimizerInput = {
    roughPrompt: "Write me a marketing email",
    levelOfDetail: "BASIC",
    targetAIPlatform: "ChatGPT"
  };

  const result = PromptOptimizer.optimize(input);
  console.log('Basic Example Result:');
  console.log(PromptOptimizer.formatResult(result, false));
  
  return result;
}

// Example 2: Detailed optimization for complex request
export function detailExample() {
  const input: PromptOptimizerInput = {
    roughPrompt: "Help me create a comprehensive business plan for my tech startup that focuses on AI solutions",
    levelOfDetail: "DETAIL",
    targetAIPlatform: "Claude"
  };

  const result = PromptOptimizer.optimize(input);
  console.log('Detail Example Result:');
  console.log(PromptOptimizer.formatResult(result, true));
  
  return result;
}

// Example 3: Technical prompt optimization
export function technicalExample() {
  const input: PromptOptimizerInput = {
    roughPrompt: "Debug my React component",
    levelOfDetail: "DETAIL",
    targetAIPlatform: "ChatGPT"
  };

  const result = PromptOptimizer.optimize(input);
  console.log('Technical Example Result:');
  console.log(PromptOptimizer.formatResult(result, true));
  
  return result;
}

// Example 4: Creative prompt optimization
export function creativeExample() {
  const input: PromptOptimizerInput = {
    roughPrompt: "Write a story about space",
    levelOfDetail: "BASIC",
    targetAIPlatform: "Gemini"
  };

  const result = PromptOptimizer.optimize(input);
  console.log('Creative Example Result:');
  console.log(PromptOptimizer.formatResult(result, false));
  
  return result;
}

// Example 5: API usage example
export async function apiExample() {
  const requestBody: PromptOptimizerInput = {
    roughPrompt: "Explain machine learning to beginners",
    levelOfDetail: "DETAIL",
    targetAIPlatform: "Claude"
  };

  try {
    const response = await fetch('/api/prompt-optimizer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API Example Result:');
    console.log(result.data.formattedOutput);
    
    return result;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Utility function to run all examples
export function runAllExamples() {
  console.log('=== PromptOptimizer Examples ===\n');
  
  console.log('1. Basic Example:');
  basicExample();
  console.log('\n');
  
  console.log('2. Detail Example:');
  detailExample();
  console.log('\n');
  
  console.log('3. Technical Example:');
  technicalExample();
  console.log('\n');
  
  console.log('4. Creative Example:');
  creativeExample();
  console.log('\n');
  
  console.log('Welcome Message:');
  console.log(PromptOptimizer.getWelcomeMessage());
}

