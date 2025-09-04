import PromptActions from "./PromptActions";

type Props = {
  name: string;
  description: string;
  buildPrompt: string;
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

export default function ServiceItem({ name, description, buildPrompt, formData, onOptimizePrompt }: Props) {
  const substitutedPrompt = substituteVariables(buildPrompt, formData);

  return (
    <article className="rounded-lg border bg-white/50 p-4 shadow-sm">
      <h4 className="text-sm font-semibold tracking-tight">{name}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      
      {/* Display the actual prompt */}
      <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <div className="text-xs font-medium text-gray-700 mb-2">Prompt Template:</div>
        <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono leading-relaxed">
          {substitutedPrompt}
        </pre>
      </div>
      
      <div className="mt-3">
        <PromptActions prompt={buildPrompt} formData={formData} onOptimizePrompt={onOptimizePrompt} />
      </div>
    </article>
  );
}
