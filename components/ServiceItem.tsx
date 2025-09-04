import PromptActions from "./PromptActions";
import { substituteVariablesWithHighlighting } from "@/utils/prompt-highlighting";

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

export default function ServiceItem({ name, description, buildPrompt, formData, onOptimizePrompt }: Props) {
  const { highlightedHtml, plainText } = substituteVariablesWithHighlighting(buildPrompt, formData);

  return (
    <article className="rounded-lg border bg-white/50 p-4 shadow-sm">
      <h4 className="text-sm font-semibold tracking-tight">{name}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      
      {/* Display the actual prompt with highlighting */}
      <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <div className="text-xs font-medium text-gray-700 mb-2">Prompt Template:</div>
        <div 
          className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed prompt-container"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </div>
      
      <div className="mt-3">
        <PromptActions prompt={buildPrompt} formData={formData} onOptimizePrompt={onOptimizePrompt} />
      </div>
    </article>
  );
}
