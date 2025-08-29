import ServiceItem from "./ServiceItem";
import PackageTable from "./PackageTable";
import PromptActions from "./PromptActions";

type Service = { Name: string; Description: string; BuildPrompt: string };
type Deliverable = { Name: string; Description: string };

type Props = {
  title: string;
  description: string;
  buildPrompt?: string;
  services: Service[];
  deliverables?: Deliverable[];
  packages?: Record<string, { Price: string; Includes: string }>;
  formData: {
    company: string;
    industry: string;
    offer: string;
    icp: string;
    brand_tone: string;
    stack: string;
  };
};

export default function CategorySection({
  title,
  description,
  buildPrompt,
  services,
  deliverables,
  packages,
  formData
}: Props) {
  return (
    <section className="space-y-4 rounded-xl border bg-background p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
        {buildPrompt ? <PromptActions prompt={buildPrompt} formData={formData} /> : null}
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {services.map((s) => (
          <ServiceItem
            key={s.Name}
            name={s.Name}
            description={s.Description}
            buildPrompt={s.BuildPrompt}
            formData={formData}
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

      {packages ? (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Packages
          </h3>
          <PackageTable packages={packages} />
        </div>
      ) : null}
    </section>
  );
}
