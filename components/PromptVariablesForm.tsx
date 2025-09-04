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
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 sm:p-6">
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-semibold text-gray-800">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder={initialData.company}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-semibold text-gray-800">Industry</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => handleInputChange("industry", e.target.value)}
            placeholder={initialData.industry}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="offer" className="text-sm font-semibold text-gray-800">Offer</Label>
          <Input
            id="offer"
            value={formData.offer}
            onChange={(e) => handleInputChange("offer", e.target.value)}
            placeholder={initialData.offer}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="icp" className="text-sm font-semibold text-gray-800">ICP (Ideal Customer Profile)</Label>
          <Input
            id="icp"
            value={formData.icp}
            onChange={(e) => handleInputChange("icp", e.target.value)}
            placeholder={initialData.icp}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand_tone" className="text-sm font-semibold text-gray-800">Brand Tone</Label>
          <Input
            id="brand_tone"
            value={formData.brand_tone}
            onChange={(e) => handleInputChange("brand_tone", e.target.value)}
            placeholder={initialData.brand_tone}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stack" className="text-sm font-semibold text-gray-800">Tech Stack</Label>
          <Input
            id="stack"
            value={formData.stack}
            onChange={(e) => handleInputChange("stack", e.target.value)}
            placeholder={initialData.stack?.join(", ")}
            className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-1 mt-4 sm:mt-6">
        <Button onClick={handleReset} variant="outline" size="sm" className="shrink-0 text-xs sm:text-sm">
          Reset to Defaults
        </Button>
      </div>
    </div>
    
  );
}
