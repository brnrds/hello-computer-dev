'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  PromptOptimizer, 
  type LevelOfDetail, 
  type TargetAIPlatform, 
  type OptimizationResult 
} from '@/utils/prompt-optimizer';

export default function PromptOptimizerComponent() {
  const [roughPrompt, setRoughPrompt] = useState('');
  const [levelOfDetail, setLevelOfDetail] = useState<LevelOfDetail>('BASIC');
  const [targetAIPlatform, setTargetAIPlatform] = useState<TargetAIPlatform>('ChatGPT');
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleOptimize = async () => {
    if (!roughPrompt.trim()) return;

    setIsLoading(true);
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const optimizationResult = PromptOptimizer.optimize({
        roughPrompt,
        levelOfDetail,
        targetAIPlatform
      });
      
      setResult(optimizationResult);
      setShowWelcome(false);
    } catch (error) {
      console.error('Optimization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRoughPrompt('');
    setResult(null);
    setShowWelcome(true);
  };

  const suggestedMode = roughPrompt ? PromptOptimizer.suggestMode(roughPrompt) : 'BASIC';

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Prompt Optimizer</h1>
        <p className="text-gray-600">Transform vague requests into precision-crafted prompts</p>
      </div>

      {showWelcome && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="whitespace-pre-line text-sm text-gray-700">
            {PromptOptimizer.getWelcomeMessage()}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Input</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="roughPrompt" className="text-sm font-medium">
                Rough Prompt *
              </Label>
              <Textarea
                id="roughPrompt"
                placeholder="Enter your rough prompt here..."
                value={roughPrompt}
                onChange={(e) => setRoughPrompt(e.target.value)}
                className="mt-1 min-h-[120px]"
              />
              {roughPrompt && suggestedMode !== levelOfDetail && (
                <p className="text-sm text-amber-600 mt-1">
                  💡 Suggested mode: {suggestedMode} (based on complexity)
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="levelOfDetail" className="text-sm font-medium">
                Level of Detail
              </Label>
              <select
                id="levelOfDetail"
                value={levelOfDetail}
                onChange={(e) => setLevelOfDetail(e.target.value as LevelOfDetail)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="BASIC">BASIC - Quick optimization</option>
                <option value="DETAIL">DETAIL - Comprehensive with clarifying questions</option>
              </select>
            </div>

            <div>
              <Label htmlFor="targetAIPlatform" className="text-sm font-medium">
                Target AI Platform
              </Label>
              <select
                id="targetAIPlatform"
                value={targetAIPlatform}
                onChange={(e) => setTargetAIPlatform(e.target.value as TargetAIPlatform)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ChatGPT">ChatGPT/GPT-4</option>
                <option value="Claude">Claude</option>
                <option value="Gemini">Gemini</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleOptimize}
                disabled={!roughPrompt.trim() || isLoading}
                className="flex-1"
              >
                {isLoading ? 'Optimizing...' : 'Optimize Prompt'}
              </Button>
              {result && (
                <Button 
                  onClick={handleReset}
                  variant="outline"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Output</h2>
          
          {result ? (
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-green-700">
                  Your Optimized Prompt:
                </Label>
                <div className="mt-1 p-3 bg-green-50 border border-green-200 rounded-md">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800">
                    {result.optimizedPrompt}
                  </pre>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-blue-700">
                  Key Improvements:
                </Label>
                <ul className="mt-1 space-y-1">
                  {result.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Label className="text-sm font-medium text-purple-700">
                  Techniques Applied:
                </Label>
                <p className="mt-1 text-sm text-gray-700">
                  {result.techniquesApplied.join(', ')}
                </p>
              </div>

              {result.proTip && (
                <div>
                  <Label className="text-sm font-medium text-amber-700">
                    Pro Tip:
                  </Label>
                  <p className="mt-1 text-sm text-gray-700">
                    {result.proTip}
                  </p>
                </div>
              )}

              {result.clarifyingQuestions && result.clarifyingQuestions.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-indigo-700">
                    Clarifying Questions:
                  </Label>
                  <ul className="mt-1 space-y-1">
                    {result.clarifyingQuestions.map((question, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(result.optimizedPrompt);
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  📋 Copy Optimized Prompt
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">🎯</div>
              <p>Enter a rough prompt and click "Optimize Prompt" to see the magic happen!</p>
            </div>
          )}
        </Card>
      </div>

      {/* Usage Examples */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-3">Usage Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-1">Basic Example:</p>
            <p className="text-sm text-gray-600">"Write me a marketing email"</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-1">Detail Example:</p>
            <p className="text-sm text-gray-600">"Help me create a comprehensive business plan for my startup"</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

