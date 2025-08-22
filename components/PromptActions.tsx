"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = { prompt: string };

export default function PromptActions({ prompt }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={copy} size="sm">
        {copied ? "Copied!" : "Copy Prompt"}
      </Button>
      {/* Hook up to your agent runner as needed */}
    </div>
  );
}
