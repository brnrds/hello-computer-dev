import ServiceItem from "./ServiceItem";
import PromptActions from "./PromptActions";
import { substituteVariablesWithHighlighting } from "@/utils/prompt-highlighting";

type Service = { Name: string; Description: string; BuildPrompt: string };
type Deliverable = { Name: string; Description: string };

type Props = {
  title: string;
  description: string;
  buildPrompt?: string;
  services: Service[];
  deliverables?: Deliverable[];
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

export default function CategorySection({
  title,
  description,
  buildPrompt,
  services,
  deliverables,
  formData,
  onOptimizePrompt
}: Props) {
  const promptData = buildPrompt ? substituteVariablesWithHighlighting(buildPrompt, formData) : null;

  return (
    <section className="space-y-4 rounded-xl border bg-background p-6">
      <header className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
        {buildPrompt ? <PromptActions prompt={buildPrompt} formData={formData} onOptimizePrompt={onOptimizePrompt} /> : null}
      </header>

      {/* Display category-level prompt if it exists */}
      {buildPrompt && promptData && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="text-sm font-medium text-blue-800 mb-2">Category Prompt Template:</div>
          <div 
            className="text-sm text-blue-700 whitespace-pre-wrap font-mono leading-relaxed prompt-container"
            dangerouslySetInnerHTML={{ __html: promptData.highlightedHtml }}
          />
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {services.map((s) => (
          <ServiceItem
            key={s.Name}
            name={s.Name}
            description={s.Description}
            buildPrompt={s.BuildPrompt}
            formData={formData}
            onOptimizePrompt={onOptimizePrompt}
          />
        ))}
      </div>

      {deliverables?.length ? (
        <div>
          <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Example Deliverables
          </h3>
          <ul className="mt-2 grid gap-2 md:grid-cols-2">
            {deliverables.map((d) => (
              <li key={d.Name} className="rounded-md border p-3 text-sm">
                <span className="font-medium">{d.Name}:</span>{" "}
                <span className="text-muted-foreground">{d.Description}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

    </section>
  );
}
