"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// Note: Select component not available, using regular select for now
import { Plus, Trash2, Download, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { type BlueprintRequest } from '@/utils/cursor-zip-generator';

const DEFAULT_PRD_BODY = `# <Product / Feature Name>

<TL;DR: 1–2 sentences: For [target user], build [capability] so they can [value].>

---

## Users & Value
- **Primary user/persona:** <who specifically>
- **Secondary personas:** <optional>
- **Jobs-to-be-done (JTBD):**
  - When <situation>, I want <motivation>, so I can <outcome>.
  - When <situation>, I want <motivation>, so I can <outcome>.

## Key Scenarios / User Flows
1) <Flow name> — <one-liner>
   - Trigger: <what starts it>
   - Steps: <brief ordered list>
   - Result: <end state>
2) <Flow name> — <one-liner>

---

## Success Metrics
- **Primary Goal:** <what success looks like in plain words>
- **North-star metric:** <name and direction>
- **Success Criteria:** <measurable formula> (target: <value>, timeframe: <T>)
- **Guardrails:** <negative outcomes to avoid>

---

## Scope

| Must‑have (MVP) | Nice‑to‑have (Later) | Explicitly Out (Not now) |
| --------------- | -------------------- | ------------------------ |
| <bullet>        | <bullet>             | <bullet>                 |
| <bullet>        | <bullet>             | <bullet>                 |

- **Definition of Done (MVP):**
  - [ ] <clear acceptance criterion 1>
  - [ ] <clear acceptance criterion 2>
  - [ ] <clear acceptance criterion 3>

---

## Non‑Functional Requirements (NFRs)
- **Performance:** <latency, throughput targets>
- **Reliability:** <availability, recovery>
- **Security & Privacy:** <authn/authz posture, data handling>
- **Compliance:** <policies or standards if any>
- **Accessibility:** <target guidelines and expectations>
- **Internationalization:** <locales, timezones, formatting>

---

## Data & Domain Model (Conceptual)
- **Entities:** <list key entities/objects and 1–2 properties each>
- **Relationships:** <high-level connections>
- **Identifiers:** <how things are uniquely referenced>

---

## Interfaces (Abstract)
- **External Inputs:** <files, APIs, events, CLIs>
- **External Outputs:** <files, APIs, events, notifications>
- **Core Operations:**
  - \`<Operation name>(<inputs>) -> <outputs>\` — <one-line description>

---

## Risks, Assumptions, Constraints
- **Assumptions:** <what you assume to move forward>
- **Constraints:** <hard constraints: tech, time, org>
- **Risks & Mitigations:** <risk -> mitigation>

---

## Milestones & Release Plan
- **M0 — MVP**: <scope items; date target>
- **M1 — Usability**: <scope items; date target>
- **M2 — Scale/Hardening**: <scope items; date target>

---

## Open Questions
- <question 1>
- <question 2>

---

## Glossary (Optional)
- **<Term>:** <definition>
`;

interface ProjectBlueprintGeneratorProps {
  className?: string;
}

export default function ProjectBlueprintGenerator({ className }: ProjectBlueprintGeneratorProps) {
  const [projectName, setProjectName] = useState('');
  const [prdContent, setPrdContent] = useState(DEFAULT_PRD_BODY);
  const [adrSeedDecisions, setAdrSeedDecisions] = useState<BlueprintRequest['adrSeedDecisions']>([
    {
      title: 'Next.js App Router Architecture',
      status: 'Accepted' as const,
      owner: 'AI Agent',
      context: 'Modern Next.js applications should use the App Router for better performance, streaming, and developer experience.',
      decision: 'Use Next.js 15+ with App Router, TypeScript, and Turbopack for development.',
      consequences: { 
        pros: ['Better performance', 'Streaming support', 'Improved DX', 'Future-proof'], 
        cons: ['Learning curve for legacy developers'], 
        notes: ['Follows latest Next.js best practices', 'Enables React Server Components'] 
      }
    },
    {
      title: 'Tailwind CSS v4 for Styling',
      status: 'Accepted' as const,
      owner: 'AI Agent',
      context: 'Tailwind CSS v4 introduces CSS-first configuration, better performance, and native CSS features support.',
      decision: 'Use Tailwind CSS v4 with CSS-first theming approach via globals.css and @theme directive.',
      consequences: { 
        pros: ['CSS-first configuration', 'Better performance', 'Native CSS features', 'Simpler setup'], 
        cons: ['Different from v3 config approach'], 
        notes: ['Use @theme inline for custom variables', 'Leverage CSS variables for theming'] 
      }
    },
    {
      title: 'Component Library Strategy',
      status: 'Accepted' as const,
      owner: 'AI Agent',
      context: 'Need consistent, accessible UI components that integrate well with Tailwind and TypeScript.',
      decision: 'Use shadcn/ui components with components/ui structure for reusable UI primitives.',
      consequences: { 
        pros: ['Consistent design system', 'Accessible components', 'TypeScript support', 'Customizable'], 
        cons: ['Additional setup complexity'], 
        notes: ['Install with pnpm dlx shadcn@latest add', 'Keep components/ui for shadcn components'] 
      }
    }
  ]);
  const [folderStructureSpec, setFolderStructureSpec] = useState<Array<{ path: string; description?: string }>>([
    { path: '/app', description: 'Next.js App Router pages and layouts' },
    { path: '/app/globals.css', description: 'Tailwind v4 CSS-first configuration' },
    { path: '/app/api', description: 'API routes and server functions' },
    { path: '/components', description: 'Reusable React components' },
    { path: '/components/ui', description: 'shadcn/ui component library' },
    { path: '/lib', description: 'Utility functions and configurations' },
    { path: '/public', description: 'Static assets (images, icons, etc.)' },
    { path: '/types', description: 'TypeScript type definitions' }
  ]);
  const [workflowGuidelines, setWorkflowGuidelines] = useState<BlueprintRequest['workflowGuidelines']>({
    development: [
      'Use pnpm as package manager for better performance and disk efficiency',
      'Initialize projects with: pnpm create next-app@latest --ts --tailwind --no-eslint --app --turbopack --use-pnpm --no-src-dir --no-import-alias',
      'Setup shadcn/ui with: pnpm dlx shadcn@latest init && pnpm dlx shadcn@latest add <component-name>',
      'Use Turbopack for faster development builds',
      'Follow TypeScript strict mode and proper type definitions',
      'Implement CSS-first theming with Tailwind v4 @theme directive in globals.css'
    ],
    testing: [
      'Write integration tests that test real user workflows',
      'Test API routes with actual HTTP requests',
      'Use React Testing Library for component testing',
      'Avoid mocking external services in critical path tests',
      'Test responsive design across different viewport sizes'
    ],
    agents: [
      'Use .cursor/rules/*.mdc files as global context for all agents',
      'Create specific task files under tasks/ for focused work',
      'Update ADRs immediately after making architectural decisions',
      'Reference exact file paths and function signatures in tasks',
      'Keep agent contexts scoped to relevant files and dependencies'
    ],
    documentation: [
      'Keep README.md updated with setup and development instructions',
      'Document component APIs with TypeScript interfaces',
      'Use JSDoc comments for complex business logic',
      'Maintain ADRs for all significant architectural decisions',
      'Include examples in component documentation'
    ]
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    adr: true,
    folder: true,
    workflow: true
  });
  const [adrJson, setAdrJson] = useState<string>('');
  const [folderJson, setFolderJson] = useState<string>('');
  const [adrJsonError, setAdrJsonError] = useState<string | null>(null);
  const [folderJsonError, setFolderJsonError] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const addAdrDecision = () => {
    setAdrSeedDecisions(prev => [...(prev || []), {
      title: '',
      status: 'Proposed' as const,
      owner: 'AI Agent',
      context: '',
      decision: '',
      consequences: { pros: [], cons: [], notes: [] }
    }]);
  };

  const removeAdrDecision = (index: number) => {
    setAdrSeedDecisions(prev => prev?.filter((_, i) => i !== index) || []);
  };

  const updateAdrDecision = (index: number, field: string, value: any) => {
    setAdrSeedDecisions(prev => {
      const updated = [...(prev || [])];
      if (field.startsWith('consequences.')) {
        const consequenceField = field.split('.')[1];
        updated[index] = {
          ...updated[index],
          consequences: {
            ...updated[index].consequences,
            [consequenceField]: value
          }
        };
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return updated;
    });
  };

  const addFolderSpec = () => {
    setFolderStructureSpec(prev => [...prev, { path: '', description: '' }]);
  };

  const removeFolderSpec = (index: number) => {
    setFolderStructureSpec(prev => prev.filter((_, i) => i !== index));
  };

  const updateFolderSpec = (index: number, field: 'path' | 'description', value: string) => {
    setFolderStructureSpec(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addWorkflowGuideline = (category: keyof NonNullable<BlueprintRequest['workflowGuidelines']>) => {
    setWorkflowGuidelines(prev => ({
      ...prev,
      [category]: [...(prev?.[category] || []), '']
    }));
  };

  const removeWorkflowGuideline = (category: keyof NonNullable<BlueprintRequest['workflowGuidelines']>, index: number) => {
    setWorkflowGuidelines(prev => ({
      ...prev,
      [category]: prev?.[category]?.filter((_, i) => i !== index) || []
    }));
  };

  const updateWorkflowGuideline = (category: keyof NonNullable<BlueprintRequest['workflowGuidelines']>, index: number, value: string) => {
    setWorkflowGuidelines(prev => {
      const updated = { ...prev };
      if (updated[category]) {
        updated[category] = [...updated[category]];
        updated[category][index] = value;
      }
      return updated;
    });
  };

  const clearAdrDefaults = () => {
    setAdrSeedDecisions([]);
  };

  const clearFolderDefaults = () => {
    setFolderStructureSpec([]);
  };

  const clearWorkflowDefaults = () => {
    setWorkflowGuidelines({
      development: [],
      testing: [],
      agents: [],
      documentation: []
    });
  };

  const applyAdrJson = () => {
    setAdrJsonError(null);
    try {
      const parsed = JSON.parse(adrJson);
      if (!Array.isArray(parsed)) throw new Error('Must be a JSON array');
      const valid = parsed.every((d) =>
        d && typeof d.title === 'string' && d.title.trim().length > 0 &&
        (d.status === undefined || ['Proposed','Accepted','Superseded'].includes(d.status)) &&
        (d.owner === undefined || typeof d.owner === 'string') &&
        (d.context === undefined || typeof d.context === 'string') &&
        (d.decision === undefined || typeof d.decision === 'string') &&
        (d.consequences === undefined || typeof d.consequences === 'object') &&
        (d.consequences?.pros === undefined || Array.isArray(d.consequences.pros)) &&
        (d.consequences?.cons === undefined || Array.isArray(d.consequences.cons)) &&
        (d.consequences?.notes === undefined || Array.isArray(d.consequences.notes)) &&
        (d.supersedes === undefined || typeof d.supersedes === 'string')
      );
      if (!valid) throw new Error('Items must match ADR seed decision shape');
      setAdrSeedDecisions(parsed);
    } catch (e) {
      setAdrJsonError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const applyFolderJson = () => {
    setFolderJsonError(null);
    try {
      const parsed = JSON.parse(folderJson);
      if (!Array.isArray(parsed)) throw new Error('Must be a JSON array');
      const valid = parsed.every((r) => r && typeof r.path === 'string' && (r.description === undefined || typeof r.description === 'string'));
      if (!valid) throw new Error('Items must be { path: string; description?: string }');
      setFolderStructureSpec(parsed);
    } catch (e) {
      setFolderJsonError(e instanceof Error ? e.message : 'Invalid JSON');
    }
  };

  const generateBlueprint = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Validate inputs
      if (!projectName.trim()) {
        throw new Error('Project name is required');
      }

      const request: BlueprintRequest = {
        projectName: projectName.trim(),
        prdContent: prdContent.trim() || '',
        adrSeedDecisions: adrSeedDecisions?.filter(decision => decision.title.trim()) || undefined,
        folderStructureSpec: folderStructureSpec.filter(spec => spec.path.trim()) || undefined,
        workflowGuidelines: {
          development: workflowGuidelines?.development?.filter(g => g.trim()) || undefined,
          testing: workflowGuidelines?.testing?.filter(g => g.trim()) || undefined,
          agents: workflowGuidelines?.agents?.filter(g => g.trim()) || undefined,
          documentation: workflowGuidelines?.documentation?.filter(g => g.trim()) || undefined,
        }
      };

      // Clean up empty arrays
      if (request.workflowGuidelines) {
        Object.keys(request.workflowGuidelines).forEach(key => {
          const k = key as keyof NonNullable<BlueprintRequest['workflowGuidelines']>;
          if (!request.workflowGuidelines![k] || request.workflowGuidelines![k]!.length === 0) {
            delete request.workflowGuidelines![k];
          }
        });
        if (Object.keys(request.workflowGuidelines).length === 0) {
          request.workflowGuidelines = undefined;
        }
      }

      // Make API request
      const response = await fetch('/api/generate-cursor-zip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Get the blob and create download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Extract filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="([^"]+)"/);
      const filename = filenameMatch?.[1] || 'project-blueprint.zip';
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error('Error generating blueprint:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate blueprint');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Project Blueprint Generator
        </CardTitle>
        <CardDescription>
          Generate stack-agnostic Project Blueprints for AI agents. Documentation-only structure with PRD, ADRs, and task templates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Name Section */}
        <div className="space-y-2">
          <Label htmlFor="projectName" className="text-sm font-semibold">
            Project Name *
          </Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="my-awesome-project"
            className="font-mono text-sm"
            required
          />
          <p className="text-xs text-muted-foreground">
            Used for zip filename and top-level folder name.
          </p>
        </div>

        {/* PRD Section */}
        <div className="space-y-2">
          <Label htmlFor="prdContent" className="text-sm font-semibold">
            Product Requirements Document (PRD)
          </Label>
          <Textarea
            id="prdContent"
            value={prdContent}
            onChange={(e) => setPrdContent(e.target.value)}
            placeholder="Enter your PRD content here, or leave empty to use template..."
            className="min-h-[120px] font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Will be saved as .cursor/rules/PRD.mdc. If empty, uses a template.
          </p>
        </div>

        {/* ADR Seed Decisions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => toggleSection('adr')}
              className="flex items-center gap-2 p-0 h-auto font-semibold text-sm"
            >
              {expandedSections.adr ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              ADR Seed Decisions ({adrSeedDecisions?.length || 0})
            </Button>
            {expandedSections.adr && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearAdrDefaults}
                  className="text-xs text-muted-foreground"
                >
                  Clear Defaults
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAdrDecision}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Decision
                </Button>
              </div>
            )}
          </div>

          {expandedSections.adr && (
            <div className="space-y-3 pl-4 border-l-2 border-gray-200">
              {/* JSON Import */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Paste ADR JSON (array)</Label>
                <Textarea
                  value={adrJson}
                  onChange={(e) => setAdrJson(e.target.value)}
                  placeholder='[ { "title": "...", "status": "Accepted" } ]'
                  className="min-h-[80px] font-mono text-xs"
                />
                <div className="flex items-center gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={applyAdrJson}>Apply JSON</Button>
                  {adrJsonError && <span className="text-xs text-destructive">{adrJsonError}</span>}
                </div>
              </div>

              {adrSeedDecisions?.map((decision, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                      <Label className="text-xs font-medium">Title</Label>
                  <Input
                        value={decision.title}
                        onChange={(e) => updateAdrDecision(index, 'title', e.target.value)}
                        placeholder="e.g., Core Architecture Style"
                    className="mt-1"
                  />
                    </div>
                    <div className="w-32">
                      <Label className="text-xs font-medium">Status</Label>
                      <select 
                        value={decision.status} 
                        onChange={(e) => updateAdrDecision(index, 'status', e.target.value as 'Proposed' | 'Accepted' | 'Superseded')}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Proposed">Proposed</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Superseded">Superseded</option>
                      </select>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAdrDecision(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-medium">Context</Label>
                      <Textarea
                        value={decision.context || ''}
                        onChange={(e) => updateAdrDecision(index, 'context', e.target.value)}
                        placeholder="Why this decision is needed..."
                        className="mt-1 min-h-[60px] text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium">Decision</Label>
                      <Textarea
                        value={decision.decision || ''}
                        onChange={(e) => updateAdrDecision(index, 'decision', e.target.value)}
                        placeholder="What was decided..."
                        className="mt-1 min-h-[60px] text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {(!adrSeedDecisions || adrSeedDecisions.length === 0) && (
                <p className="text-sm text-muted-foreground italic">No ADR seed decisions added yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Folder Structure Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => toggleSection('folder')}
              className="flex items-center gap-2 p-0 h-auto font-semibold text-sm"
            >
              {expandedSections.folder ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              Folder Structure Spec ({folderStructureSpec.length})
            </Button>
            {expandedSections.folder && (
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={clearFolderDefaults}
                  className="text-xs text-muted-foreground"
                >
                  Clear Defaults
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFolderSpec}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Path
                </Button>
              </div>
            )}
          </div>

          {expandedSections.folder && (
            <div className="space-y-3 pl-4 border-l-2 border-gray-200">
              {/* JSON Import */}
              <div className="space-y-1">
                <Label className="text-xs font-medium">Paste Folder Spec JSON (array)</Label>
                <Textarea
                  value={folderJson}
                  onChange={(e) => setFolderJson(e.target.value)}
                  placeholder='[ { "path": "/app", "description": "..." } ]'
                  className="min-h-[80px] font-mono text-xs"
                />
                <div className="flex items-center gap-2">
                  <Button type="button" size="sm" variant="outline" onClick={applyFolderJson}>Apply JSON</Button>
                  {folderJsonError && <span className="text-xs text-destructive">{folderJsonError}</span>}
                </div>
              </div>

              {folderStructureSpec.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input
                      value={spec.path}
                      onChange={(e) => updateFolderSpec(index, 'path', e.target.value)}
                      placeholder="/src/components"
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      value={spec.description || ''}
                      onChange={(e) => updateFolderSpec(index, 'description', e.target.value)}
                      placeholder="Description (optional)"
                      className="text-sm"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFolderSpec(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {folderStructureSpec.length === 0 && (
                <p className="text-sm text-muted-foreground italic">No folder structure specifications added yet.</p>
              )}
            </div>
          )}
        </div>

        {/* Workflow Guidelines Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={() => toggleSection('workflow')}
              className="flex items-center gap-2 p-0 h-auto font-semibold text-sm"
            >
              {expandedSections.workflow ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              Workflow Guidelines
            </Button>
            {expandedSections.workflow && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearWorkflowDefaults}
                className="text-xs text-muted-foreground"
              >
                Clear Defaults
                  </Button>
                )}
              </div>
              
          {expandedSections.workflow && (
            <div className="space-y-4 pl-4 border-l-2 border-gray-200">
              {(['development', 'testing', 'agents', 'documentation'] as const).map((category) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium capitalize">{category}</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addWorkflowGuideline(category)}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  {workflowGuidelines?.[category]?.map((guideline, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={guideline}
                        onChange={(e) => updateWorkflowGuideline(category, index, e.target.value)}
                        placeholder={`Add ${category} guideline...`}
                        className="text-sm"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWorkflowGuideline(category, index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
              </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={generateBlueprint}
          disabled={isGenerating || !projectName.trim()}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Blueprint...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Generate & Download Blueprint
            </>
          )}
        </Button>

        {/* Info Section */}
        <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
          <p><strong>Generated structure:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>[project-name]/README.md</li>
            <li>[project-name]/.cursor/rules/ADR.mdc</li>
            <li>[project-name]/.cursor/rules/PRD.mdc</li>
            <li>[project-name]/.cursor/rules/folder-structure.mdc</li>
            <li>[project-name]/.cursor/rules/workflow.mdc</li>
            <li>[project-name]/tasks/task-template.mdc</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
