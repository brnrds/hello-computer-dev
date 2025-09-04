"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { substituteVariablesWithHighlighting } from "@/utils/prompt-highlighting";

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

  async function copy() {
    // Get the plain text version (no HTML) for copying
    const { plainText } = substituteVariablesWithHighlighting(prompt, formData);
    await navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const handleOptimize = () => {
    if (onOptimizePrompt) {
      const { plainText } = substituteVariablesWithHighlighting(prompt, formData);
      onOptimizePrompt(plainText);
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
