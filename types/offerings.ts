export type KPIs = {
    reply_rate_target?: number;
    meetings_per_month?: number;
    cpl_target?: number;
  };
  
  export type Meta = {
    version: string;
    PromptVariables: {
      company: string;
      industry: string;
      offer: string;
      icp: string;
      brand_tone: string;
      stack: string[];
      kpis?: KPIs;
      deadline?: string;
      compliance_notes?: string;
      assets_folder?: string;
    };
  };
  
  export type Deliverable = { Name: string; Description: string };
  
  export type PackageTier = {
    Price: string;
    Includes: string;
  };
  
  export type Service = {
    Name: string;
    Description: string;
    BuildPrompt: string;
  };
  
  export type Category = {
    Description: string;
    BuildPrompt?: string;
    Services: Service[];
    "Example Deliverables"?: Deliverable[];
    Packages?: Record<string, PackageTier>;
  };
  
  export type Offerings = {
    _meta: Meta;
    [categoryName: string]: any; // categories keyed by name, plus _meta
  };
  