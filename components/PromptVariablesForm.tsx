"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type PromptVariables = {
  company: string;
  industry: string;
  offer: string;
  icp: string;
  brand_tone: string;
  stack?: string[];
};

type Props = {
  initialData: PromptVariables;
  formData: {
    company: string;
    industry: string;
    offer: string;
    icp: string;
    brand_tone: string;
    stack: string;
  };
  setFormData: (data: any) => void;
  onReset?: () => void;
};

export function PromptVariablesForm({ initialData, formData, setFormData, onReset }: Props) {
  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      // Fallback to default behavior if no custom reset handler
      setFormData({
        company: initialData.company || "",
        industry: initialData.industry || "",
        offer: initialData.offer || "",
        icp: initialData.icp || "",
        brand_tone: initialData.brand_tone || "",
        stack: initialData.stack?.join(", ") || ""
      });
    }
  };

  return (
    <div className="rounded-lg border bg-muted/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">Prompt Variables</div>
        <Button onClick={handleReset} variant="outline" size="sm">
          Reset to Defaults
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder={initialData.company}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            placeholder={initialData.industry}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="offer">Offer</Label>
          <Input
            id="offer"
            value={formData.offer}
            onChange={(e) => handleInputChange("offer", e.target.value)}
            placeholder={initialData.offer}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icp">ICP</Label>
          <Input
            id="icp"
            value={formData.icp}
            onChange={(e) => handleInputChange("icp", e.target.value)}
            placeholder={initialData.icp}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand_tone">Tone</Label>
          <Input
            id="brand_tone"
            value={formData.brand_tone}
            onChange={(e) => handleInputChange("brand_tone", e.target.value)}
            placeholder={initialData.brand_tone}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stack">Stack</Label>
          <Input
            id="stack"
            value={formData.stack}
            onChange={(e) => handleInputChange("stack", e.target.value)}
            placeholder={initialData.stack?.join(", ")}
          />
        </div>
      </div>
    </div>
  );
}
