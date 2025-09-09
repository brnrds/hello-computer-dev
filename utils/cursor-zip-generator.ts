/**
 * Utility functions for generating stack-agnostic Project Blueprints
 * Produces documentation-only blueprints for AI agents
 */

export interface CursorRule {
  filename: string;
  content: string;
}

export interface ZipRequest {
  prd: string;
  rules: CursorRule[];
}

// New Blueprint Request Interface
export interface BlueprintRequest {
  projectName: string; // used for zip filename and top-level folder
  prdContent: string;  // raw PRD content (optional; if empty, use template)
  adrSeedDecisions?: Array<{
    title: string;        // e.g., "Core Architecture Style"
    status?: "Proposed" | "Accepted" | "Superseded";
    owner?: string;       // e.g., "AI Agent"
    context?: string;
    decision?: string;
    consequences?: { pros?: string[]; cons?: string[]; notes?: string[] };
    supersedes?: string;  // "ADR-0001" optional
  }>;
  folderStructureSpec?: Array<{ path: string; description?: string }>;
  workflowGuidelines?: {
    development?: string[];  // bullet points
    testing?: string[];      // bullet points
    agents?: string[];       // bullet points
    documentation?: string[];// bullet points
  };
}

/**
 * Generates README.md content for the blueprint
 */
export function generateReadme(): string {
  return `# Project Blueprint

A documentation-only blueprint for AI coding agents. Use \`.cursor/rules/*.mdc\` as the global ruleset, and create executable tasks under \`tasks/\`.

## How to Use
1. Fill \`PRD.mdc\` collaboratively (or via interviews) until clear.
2. Create task files from \`tasks/task-template.mdc\` for each atomic unit of work.
3. Keep ADRs up-to-date after significant decisions.
4. Run agents in parallel with scoped contexts (global rules + relevant task).

## Files
- \`.cursor/rules/PRD.mdc\` — Product Requirements
- \`.cursor/rules/ADR.mdc\` — Architecture decisions and index
- \`.cursor/rules/folder-structure.mdc\` — Planned repository layout
- \`.cursor/rules/workflow.mdc\` — Development/testing methodology
- \`tasks/task-template.mdc\` — Single-task template for agents

## Planning Agent Prompt (paste into your IDE/agent)

\`\`\`
You are a planning agent. Do NOT implement code. Generate the full, ordered set of tasks only, then STOP.

Context to load (read-only):
- .cursor/rules/PRD.mdc
- .cursor/rules/ADR.mdc
- .cursor/rules/folder-structure.mdc
- .cursor/rules/workflow.mdc
- tasks/task-template.mdc

Objective
- Produce a complete, end-to-end task plan that an implementation agent could execute to build the project.
- Write all task files under ./tasks/ using the provided template and STOP. Do not implement any of the tasks.

Ordering requirements (critical)
- Create a total ordering of tasks that respects dependencies (topological order).
- Number tasks with a zero‑padded sequence prefix to enforce execution order (e.g., 001-..., 002-...).
- The Task Index must be sorted by execution order. Each task lists its explicit dependencies (if any).
- If a dependency cycle is detected, break it by splitting tasks and re-numbering to preserve acyclic order.

Ground rules
- PRD is the product truth; ADRs are the architectural truth. Align with both.
- Keep it stack-agnostic; do not introduce vendors beyond what PRD/ADR explicitly require.
- Make tasks atomic, information-dense, and verifiable with acceptance criteria.
- Each task must declare dependencies, beginning context files, end-state artifacts, and low-level steps with exact paths/signatures where applicable.
- Respect folder-structure.mdc for directories and naming; do not create code—only task files.

Deliverables (this session only)
1) Ordered Task Index (overview table):
   - Columns: seq, id, title, status=planned, priority, dependencies.
   - Sorted by seq ascending; seq matches filename order.
2) Task Files (ordered):
   - Create one file per task in ./tasks/, filename prefixed with the sequence number (e.g., tasks/001-init-repo.mdc).
   - Use tasks/task-template.mdc fully: fill objective, assumptions, dependencies, context plan (beginning/end), low-level steps, acceptance criteria, testing strategy.
3) Summary:
   - Count of tasks created and a short rationale for the breakdown.

Procedure
1) Read PRD.mdc, ADR.mdc, folder-structure.mdc, workflow.mdc.
2) Derive a work breakdown that covers the entire MVP scope and prerequisites.
3) Produce an ordered Task Index (topological order, numbered).
4) Create all required ./tasks/<seq>-<name>.mdc files populated from the template, in the same order.
5) STOP. Do not execute any task or modify non-task files.

Response format
- Brief scope summary (≤5 bullets).
- Ordered Task Index table (sorted by seq).
- For each created task file, print: seq, filename, one-line purpose.
- STOP after all task files are written.

Constraints
- No code edits outside ./tasks/.
- No vendor/tool specifics unless explicitly present in PRD/ADR.
- Keep tasks small enough to be executed independently; use dependencies to order them.

Begin by confirming the rule files were loaded and summarizing (in 3–5 bullets) the MVP scope from PRD.mdc. Then produce the ordered Task Index and write all ./tasks/*.mdc files. STOP after the last task file is written.
\`\`\`
`;
}

/**
 * Generates ADR.mdc content with optional seed decisions
 */
export function generateADR(seedDecisions?: BlueprintRequest['adrSeedDecisions']): string {
  let adrContent = `---
description: Architectural Decision Records
globs:
alwaysApply: false
---

# Architecture Decision Log

<!--
ADR_AGENT_PROTOCOL v1.0
INVARIANTS
- Keep this exact file structure and headings.
- All ADR entries use H2 headings: "## ADR-XXXX — <Title>" (4-digit zero-padded ID).
- Allowed Status values: Proposed | Accepted | Superseded
- Date format: YYYY-MM-DD
- New entries must be appended to the END of the file.
- The Index table between the INDEX markers must always reflect the latest state and be sorted by ID desc (newest on top).
- Each ADR MUST contain: Date, Status, Owner, Context, Decision, Consequences.
- Each ADR must include an explicit anchor \`<a id="adr-XXXX"></a>\` so links remain stable.
- Concurrency: if duplicate IDs happen, recompute next ID and rename accordingly, then retry once.
END ADR_AGENT_PROTOCOL
-->

## Index

<!-- BEGIN:ADR_INDEX -->
| ID   | Title | Date | Status | Supersedes | Superseded by |
| ---- | ----- | ---- | ------ | ---------- | ------------- |`;

  // Add seed decisions to index if provided
  if (seedDecisions && seedDecisions.length > 0) {
    seedDecisions.forEach((decision, index) => {
      const id = String(index + 1).padStart(4, '0');
      const status = decision.status || 'Proposed';
      const supersedes = decision.supersedes || '—';
      const date = new Date().toISOString().split('T')[0];
      adrContent += `\n| ${id} | [${decision.title}](#adr-${id}) | ${date} | ${status} | ${supersedes} | — |`;
    });
  }

  adrContent += `
<!-- END:ADR_INDEX -->

---

## New ADR Entry Template (copy for each new decision)

> Replace placeholders, keep section headers. Keep prose concise.

\`\`\`
## ADR-XXXX — <Short, specific title>

<a id="adr-XXXX"></a>
**Date**: YYYY-MM-DD
**Status**: Proposed | Accepted | Superseded
**Owner**: <Name>

### Context
<1–3 sentences>

### Alternatives
- <Alt 1>
- <Alt 2>

### Decision
<Single clear decision in active voice>

### Consequences
* **Pros**: <benefit 1>, <benefit 2>
* **Cons / risks**: <cost 1>, <risk 1>
* **Supersedes**: ADR-NNNN (if any)
* **Superseded by**: ADR-MMMM (later if replaced)

### (Optional) Compliance / Verification
<How we'll verify or enforce>
\`\`\``;

  // Add seed decision entries if provided
  if (seedDecisions && seedDecisions.length > 0) {
    seedDecisions.forEach((decision, index) => {
      const id = String(index + 1).padStart(4, '0');
      const status = decision.status || 'Proposed';
      const owner = decision.owner || 'AI Agent';
      const date = new Date().toISOString().split('T')[0];
      
      adrContent += `

---

## ADR-${id} — ${decision.title}

<a id="adr-${id}"></a>
**Date**: ${date}
**Status**: ${status}
**Owner**: ${owner}

### Context
${decision.context || 'Context to be filled in.'}

### Alternatives
- Alternative options to be documented

### Decision
${decision.decision || 'Decision to be documented.'}

### Consequences
* **Pros**: ${decision.consequences?.pros?.join(', ') || 'Benefits to be documented'}
* **Cons / risks**: ${decision.consequences?.cons?.join(', ') || 'Risks to be documented'}
* **Supersedes**: ${decision.supersedes || '—'}
* **Superseded by**: —

### Compliance / Verification
${decision.consequences?.notes?.join('. ') || 'Verification method to be documented.'}`;
    });
  }

  return adrContent;
}

/**
 * Generates PRD.mdc content using provided content or template
 */
export function generatePRD(prdContent?: string): string {
  if (prdContent && prdContent.trim()) {
    // Use provided content but ensure it has frontmatter
    if (!prdContent.startsWith('---')) {
      return `---
description: Product Requirements Document
globs:
alwaysApply: false
---

${prdContent}`;
    }
    return prdContent;
  }

  // Use template if no content provided
  return `---
description: Product Requirements Document
globs:
alwaysApply: false
---

# <Product / Feature Name>

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
}

/**
 * Generates folder-structure.mdc content
 */
export function generateFolderStructure(folderStructureSpec?: Array<{ path: string; description?: string }>): string {
  let content = `---
description: Repository layout and naming conventions for AI agents
globs:
alwaysApply: false
---

# Folder Structure Blueprint

> This is a documentation-only plan to guide implementation agents. Do not include source code here.

## High-Level Layout (example)
- \`/app/\` — application modules and features
- \`/api/\` — service endpoints or handlers
- \`/docs/\` — human + AI documentation
- \`/infra/\` — infrastructure as code, deploy configs
- \`/tests/\` — integration and e2e tests
- \`/scripts/\` — developer tools and automation

## Conventions
- One class/module per file, meaningful names, deterministic exports.
- Keep implementation decoupled; follow separation of concerns.
- Co-locate tests alongside features or centralize under \`/tests/\`.

## Planned Modules
- <List modules/features and their responsibilities>`;

  if (folderStructureSpec && folderStructureSpec.length > 0) {
    content += `

## Additions from Input`;
    folderStructureSpec.forEach(spec => {
      content += `\n- \`${spec.path}\`${spec.description ? ` — ${spec.description}` : ''}`;
    });
  }

  return content;
}

/**
 * Generates workflow.mdc content
 */
export function generateWorkflow(workflowGuidelines?: BlueprintRequest['workflowGuidelines']): string {
  let content = `---
description: AI-first development workflow for agents
globs:
alwaysApply: false
---

# Workflow for AI Agents

## Development Principles
- Documentation as single source of truth (PRD, ADR, tasks)
- Parallel agents with scoped contexts
- Incremental, test-first changes with verifiable outputs

## Testing Philosophy
- Prefer integration tests that call real services/CLIs where applicable
- Verify outputs on disk and state transitions end-to-end
- Avoid mocks for critical paths

## Agent Orchestration
- Use \`.cursor/rules/*.mdc\` as global context
- For new work, create a task under \`tasks/\` and work from it
- Update ADR after major decisions`;

  if (workflowGuidelines) {
    if (workflowGuidelines.development && workflowGuidelines.development.length > 0) {
      content += `

## Development Guidelines`;
      workflowGuidelines.development.forEach(guideline => {
        content += `\n- ${guideline}`;
      });
    }

    if (workflowGuidelines.testing && workflowGuidelines.testing.length > 0) {
      content += `

## Testing Guidelines`;
      workflowGuidelines.testing.forEach(guideline => {
        content += `\n- ${guideline}`;
      });
    }

    if (workflowGuidelines.agents && workflowGuidelines.agents.length > 0) {
      content += `

## Agent Guidelines`;
      workflowGuidelines.agents.forEach(guideline => {
        content += `\n- ${guideline}`;
      });
    }

    if (workflowGuidelines.documentation && workflowGuidelines.documentation.length > 0) {
      content += `

## Documentation Guidelines`;
      workflowGuidelines.documentation.forEach(guideline => {
        content += `\n- ${guideline}`;
      });
    }
  }

  return content;
}

/**
 * Generates task-template.mdc content
 */
export function generateTaskTemplate(): string {
  return `---
description:
globs:
alwaysApply: false
---

# INSTRUCTIONS — READ THIS FIRST WHEN CREATING NEW TASKS

This file is a single, self-contained TASK for an AI agent. **One task = one file.**
Follow the steps below when creating new tasks.

1. Name your file under \`./tasks/\` using kebab-case.
2. Fill the metadata block completely (\`id\`, \`title\`, \`status\`, ...).
3. Use information-dense keywords (exact file paths, function signatures, types).
4. Define types first if introducing new structures.
5. Order steps so later steps reference earlier artifacts by exact name.
6. Keep scope tight; split large work into multiple task files with dependencies.
7. Acceptance criteria must be unambiguous and testable.
8. Context plan must list beginning/end artifacts and read-only inputs.

---
id: "<unique-id-or-ticket>"
title: "<short, action-oriented task title>"
status: "planned"        # planned | in-progress | blocked | done
priority: "P1"           # P0 | P1 | P2
labels: ["feature"]      # free-form tags
dependencies: ["<other-task-file>"]
created: "YYYY-MM-DD"

# 1) High-Level Objective
<One sentence end state>

# 2) Background / Context
<Why this exists; links to PRD/ADRs>

# 3) Assumptions & Constraints
- ASSUMPTION: <...>
- Constraint: <...>

# 4) Dependencies (Other Tasks or Artifacts)
- tasks/<other-task>.md
- files/<required-existing-file-or-schema>

# 5) Context Plan
**Beginning (add to context):**
- <files to read/consider>

**End state (must exist after completion):**
- <files expected after completion>

# 6) Low-Level Steps (Ordered, information-dense)
> Include exact file paths, APIs, signatures, params, return types.

1. <step>

# 7) Types & Interfaces (if applicable)
\`\`\`ts
// Example types here if needed
\`\`\`

# 8) Acceptance Criteria
- <explicit checks with paths>

# 9) Testing Strategy
- <integration-first strategy>

# 10) Notes / Links
- <references>
`;
}

/**
 * Validates that rule filenames use .mdc extension
 */
export function validateRuleFilename(filename: string): boolean {
  return filename.endsWith('.mdc');
}

/**
 * Sanitizes filename to ensure it's safe for zip creation
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^_|_$/g, '');
}

/**
 * Generates the complete blueprint zip structure data
 */
export function generateBlueprintStructure(request: BlueprintRequest): {
  files: Array<{ path: string; content: string }>;
} {
  const files: Array<{ path: string; content: string }> = [];
  const sanitizedProjectName = sanitizeFilename(request.projectName);

  // Add README.md at root
  files.push({
    path: `${sanitizedProjectName}/README.md`,
    content: generateReadme()
  });

  // Add .cursor/rules/*.mdc files
  files.push({
    path: `${sanitizedProjectName}/.cursor/rules/ADR.mdc`,
    content: generateADR(request.adrSeedDecisions)
  });

  files.push({
    path: `${sanitizedProjectName}/.cursor/rules/PRD.mdc`,
    content: generatePRD(request.prdContent)
  });

  files.push({
    path: `${sanitizedProjectName}/.cursor/rules/folder-structure.mdc`,
    content: generateFolderStructure(request.folderStructureSpec)
  });

  files.push({
    path: `${sanitizedProjectName}/.cursor/rules/workflow.mdc`,
    content: generateWorkflow(request.workflowGuidelines)
  });

  // Add task template
  files.push({
    path: `${sanitizedProjectName}/tasks/task-template.mdc`,
    content: generateTaskTemplate()
  });

  return { files };
}

/**
 * Generates the complete zip structure data (legacy function for backward compatibility)
 */
export function generateZipStructure(request: ZipRequest): {
  files: Array<{ path: string; content: string }>;
} {
  const files: Array<{ path: string; content: string }> = [];

  // Add PRD.md at root
  files.push({
    path: 'PRD.md',
    content: request.prd
  });

  // Add index.mdc rule (always apply) - keeping for backward compatibility
  files.push({
    path: '.cursor/rules/index.mdc',
    content: `---
alwaysApply: true
---

# Repository-wide Cursor Rules

This is the main rule file for the project. It automatically applies to all files and includes the Product Requirements Document as context.

## Project Context

@file PRD.md

## General Guidelines

- Follow the specifications outlined in the PRD
- Maintain consistency with existing code patterns
- Write clean, well-documented code
- Follow TypeScript best practices when applicable
- Ensure all changes align with the project requirements`
  });

  // Add custom rules
  request.rules.forEach(rule => {
    let filename = rule.filename;
    
    // Ensure .mdc extension
    if (!validateRuleFilename(filename)) {
      filename = filename.replace(/\.[^.]*$/, '') + '.mdc';
    }
    
    // Sanitize filename
    filename = sanitizeFilename(filename);
    
    files.push({
      path: `.cursor/rules/${filename}`,
      content: rule.content
    });
  });

  return { files };
}

/**
 * Generates a safe project name for the zip file
 */
export function generateZipFilename(projectName?: string): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
  const safeName = projectName ? sanitizeFilename(projectName) : 'project-blueprint';
  return `${safeName}-${timestamp}.zip`;
}
