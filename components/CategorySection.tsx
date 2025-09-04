import ServiceItem from "./ServiceItem";
import PromptActions from "./PromptActions";

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
  const substitutedPrompt = buildPrompt ? substituteVariables(buildPrompt, formData) : null;

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
      {buildPrompt && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <div className="text-sm font-medium text-blue-800 mb-2">Category Prompt Template:</div>
          <pre className="text-sm text-blue-900 whitespace-pre-wrap font-mono leading-relaxed">
            {substitutedPrompt}
          </pre>
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
