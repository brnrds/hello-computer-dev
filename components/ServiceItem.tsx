import PromptActions from "./PromptActions";

type Props = {
  name: string;
  description: string;
  buildPrompt: string;
};

export default function ServiceItem({ name, description, buildPrompt }: Props) {
  return (
    <article className="rounded-lg border bg-white/50 p-4 shadow-sm">
      <h4 className="text-sm font-semibold tracking-tight">{name}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-3">
        <PromptActions prompt={buildPrompt} />
      </div>
    </article>
  );
}
