import CategorySection from "@/components/CategorySection";
import { HELLO_COMPUTER_DATA } from "@/data/hello-computer";
import { Offerings } from "@/types/offerings";

export default function Page() {
  const data = HELLO_COMPUTER_DATA as Offerings;

  const { _meta, ...categories } = data;
  const metaVars = _meta?.PromptVariables;

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Hello Computer — Products & Services</h1>
        <p className="text-muted-foreground">
          A human-friendly catalogue. Copy any prompt to brief an AI agent with your
          variables (company, ICP, offer) substituted in.
        </p>

        {metaVars ? (
          <div className="rounded-lg border bg-muted/40 p-4 text-sm">
            <div className="font-medium">Prompt Variables</div>
            <div className="mt-1 grid gap-1 md:grid-cols-2">
              <div><span className="text-muted-foreground">Company:</span> {metaVars.company}</div>
              <div><span className="text-muted-foreground">Industry:</span> {metaVars.industry}</div>
              <div><span className="text-muted-foreground">Offer:</span> {metaVars.offer}</div>
              <div><span className="text-muted-foreground">ICP:</span> {metaVars.icp}</div>
              <div><span className="text-muted-foreground">Tone:</span> {metaVars.brand_tone}</div>
              <div><span className="text-muted-foreground">Stack:</span> {metaVars.stack?.join(", ")}</div>
            </div>
          </div>
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
          />
        ))}
      </div>

      <footer className="pt-8 text-center text-xs text-muted-foreground">
        Data version {_meta?.version ?? "—"}
      </footer>
    </main>
  );
}
