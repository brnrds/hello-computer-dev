"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = { 
  prompt: string;
  formData: {
    company: string;
    industry: string;
    offer: string;
    icp: string;
    brand_tone: string;
    stack: string;
  };
  onOptimizePrompt?: (prompt: string) => void;
};

export default function PromptActions({ prompt, formData, onOptimizePrompt }: Props) {
  const [copied, setCopied] = useState(false);

  function substituteVariables(prompt: string, formData: any): string {
    let substitutedPrompt = prompt;
    
    // Replace basic variables in the prompt with form data
    substitutedPrompt = substitutedPrompt.replace(/\{company\}/g, formData.company || "{company}");
    substitutedPrompt = substitutedPrompt.replace(/\{industry\}/g, formData.industry || "{industry}");
    substitutedPrompt = substitutedPrompt.replace(/\{offer\}/g, formData.offer || "{offer}");
    substitutedPrompt = substitutedPrompt.replace(/\{icp\}/g, formData.icp || "{icp}");
    substitutedPrompt = substitutedPrompt.replace(/\{brand_tone\}/g, formData.brand_tone || "{brand_tone}");
    substitutedPrompt = substitutedPrompt.replace(/\{stack\}/g, formData.stack || "{stack}");
    
    // Handle nested kpis variables
    substitutedPrompt = substitutedPrompt.replace(/\{kpis\.reply_rate_target\}/g, "5");
    substitutedPrompt = substitutedPrompt.replace(/\{kpis\.meetings_per_month\}/g, "10");
    substitutedPrompt = substitutedPrompt.replace(/\{kpis\.cpl_target\}/g, "150");
    substitutedPrompt = substitutedPrompt.replace(/\{kpis\}/g, "{ reply_rate_target: 5, meetings_per_month: 10, cpl_target: 150 }");
    
    // Handle other variables with default values
    substitutedPrompt = substitutedPrompt.replace(/\{deadline\}/g, "2025-09-30");
    substitutedPrompt = substitutedPrompt.replace(/\{compliance_notes\}/g, "GDPR");
    substitutedPrompt = substitutedPrompt.replace(/\{assets_folder\}/g, "https://example.com/assets");
    
    return substitutedPrompt;
  }

  async function copy() {
    const substitutedPrompt = substituteVariables(prompt, formData);
    await navigator.clipboard.writeText(substitutedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const handleOptimize = () => {
    if (onOptimizePrompt) {
      const substitutedPrompt = substituteVariables(prompt, formData);
      onOptimizePrompt(substitutedPrompt);
    }
  };

  const hasVariables = prompt.includes("{") && prompt.includes("}");

  return (
    <div className="flex items-center gap-2">
      <Button onClick={copy} size="sm">
        {copied ? "Copied!" : "Copy Prompt"}
      </Button>
      {onOptimizePrompt && (
        <Button onClick={handleOptimize} size="sm" variant="outline">
          🚀 Quick Optimize
        </Button>
      )}
    </div>
  );
}
