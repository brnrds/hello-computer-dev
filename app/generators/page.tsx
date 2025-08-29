"use client";

import CategorySection from "@/components/CategorySection";
import { HELLO_COMPUTER_DATA } from "@/data/hello-computer";
import { Offerings } from "@/types/offerings";
import { useState } from "react";
import { PromptVariablesForm } from "@/components/PromptVariablesForm";

export default function Page() {
  const data = HELLO_COMPUTER_DATA as Offerings;

  const { _meta, ...categories } = data;
  const metaVars = _meta?.PromptVariables;

  // State to store form data
  const [formData, setFormData] = useState({
    company: metaVars?.company || "",
    industry: metaVars?.industry || "",
    offer: metaVars?.offer || "",
    icp: metaVars?.icp || "",
    brand_tone: metaVars?.brand_tone || "",
    stack: metaVars?.stack?.join(", ") || ""
  });

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Hello Computer — Products & Services</h1>
        <p className="text-muted-foreground">
          A human-friendly catalogue. Copy any prompt to brief an AI agent with your
          variables (company, ICP, offer) substituted in.
        </p>

        {metaVars ? (
          <PromptVariablesForm 
            initialData={metaVars} 
            formData={formData}
            setFormData={setFormData}
          />
        ) : null}
      </header>

      <div className="space-y-8">
        {Object.entries(categories).map(([title, cat]: any) => (
          <CategorySection
            key={title}
            title={title}
            description={cat.Description}
            buildPrompt={cat.BuildPrompt}
            services={cat.Services || []}
            deliverables={cat["Example Deliverables"] || []}
            packages={cat.Packages}
            formData={formData}
          />
        ))}
      </div>

      <footer className="pt-8 text-center text-xs text-muted-foreground">
        Data version {_meta?.version ?? "—"}
      </footer>
    </main>
  );
}
