'use client';

import React, { useState, useEffect } from 'react';
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

interface PromptOptimizerTabProps {
  initialPrompt?: string;
  fromTab?: string;
  onClearCrossTabData?: () => void;
}

export default function PromptOptimizerTab({ 
  initialPrompt, 
  fromTab, 
  onClearCrossTabData 
}: PromptOptimizerTabProps) {
  const [roughPrompt, setRoughPrompt] = useState('');
  const [levelOfDetail, setLevelOfDetail] = useState<LevelOfDetail>('BASIC');
  const [targetAIPlatform, setTargetAIPlatform] = useState<TargetAIPlatform>('ChatGPT');
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [hasUserChangedMode, setHasUserChangedMode] = useState(false);

  // Handle initial prompt from cross-tab data
  useEffect(() => {
    if (initialPrompt) {
      setRoughPrompt(initialPrompt);
      setShowWelcome(false);
      // Clear the cross-tab data after using it
      if (onClearCrossTabData) {
        onClearCrossTabData();
      }
    }
  }, [initialPrompt, onClearCrossTabData]);

  // Auto-switch to suggested mode if user hasn't manually changed it
  useEffect(() => {
    if (roughPrompt && !hasUserChangedMode) {
      const suggestedMode = PromptOptimizer.suggestMode(roughPrompt);
      if (suggestedMode !== levelOfDetail) {
        setLevelOfDetail(suggestedMode);
      }
    }
  }, [roughPrompt, hasUserChangedMode, levelOfDetail]);

  // Auto-optimize when inputs change (with debounce for prompt text)
  useEffect(() => {
    if (!roughPrompt.trim()) {
      setResult(null);
      setShowWelcome(true);
      return;
    }

    const timeoutId = setTimeout(async () => {
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
    }, 1000); // 1 second debounce for typing

    return () => clearTimeout(timeoutId);
  }, [roughPrompt, levelOfDetail, targetAIPlatform]);

  const handleReset = () => {
    setRoughPrompt('');
    setResult(null);
    setShowWelcome(true);
    setHasUserChangedMode(false); // Reset the manual change flag
  };

  const handleModeChange = (newMode: LevelOfDetail) => {
    setLevelOfDetail(newMode);
    setHasUserChangedMode(true); // Mark that user has manually changed the mode
  };

  const suggestedMode = roughPrompt ? PromptOptimizer.suggestMode(roughPrompt) : 'BASIC';

  return (
    <div className="space-y-6">
      {/* Cross-tab notification */}
      {fromTab && initialPrompt && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <span className="text-lg">✨</span>
            <p className="text-sm">
              <strong>Prompt imported from Business Templates!</strong> Ready to optimize for better AI results.
            </p>
          </div>
        </Card>
      )}

      {showWelcome && !initialPrompt && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="whitespace-pre-line text-sm text-gray-700">
            {PromptOptimizer.getWelcomeMessage()}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="p-6">
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="roughPrompt" className="text-sm font-medium">
                Prompt *
              </Label>
              <Textarea
                id="roughPrompt"
                placeholder="Enter your rough prompt here..."
                value={roughPrompt}
                onChange={(e) => setRoughPrompt(e.target.value)}
                className="mt-1 min-h-[120px]"
              />
              {roughPrompt && suggestedMode !== levelOfDetail && hasUserChangedMode && (
                <p className="text-sm text-amber-600 mt-1">
                  💡 Suggested mode: {suggestedMode} (based on complexity)
                </p>
              )}
              {roughPrompt && suggestedMode === levelOfDetail && !hasUserChangedMode && suggestedMode === 'DETAIL' && (
                <p className="text-sm text-green-600 mt-1">
                  ✨ Auto-switched to DETAIL mode for better results with complex prompts
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
                onChange={(e) => handleModeChange(e.target.value as LevelOfDetail)}
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

            {isLoading && (
              <div className="flex items-center justify-center gap-2 pt-4 text-sm text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                Optimizing...
              </div>
            )}
          </div>
        </Card>

        {/* Results Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            {result && (
              <Button 
                onClick={handleReset}
                variant="outline"
                size="sm"
              >
                Clear
              </Button>
            )}
          </div>
          
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
              <div className="text-4xl mb-2">📝</div>
              <p className="text-sm">Your optimized prompt will appear here as you type.</p>
              <p className="text-xs mt-2 text-gray-400">The optimizer analyzes your input and provides structured, effective prompts for better AI results.</p>
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
