# Reverse Engineering Prompt: Extract Project Blueprint from Existing Codebase

## Objective
You are tasked with analyzing an existing project and extracting the essential documentation that would allow the **Project Blueprint Generator** to recreate a "clean" version of this project. Your goal is to reverse-engineer the project into its core architectural decisions, requirements, and structure.

## Context
The Project Blueprint Generator creates documentation-only blueprints with:
- `README.md` — Project overview and usage
- `.cursor/rules/PRD.mdc` — Product Requirements Document
- `.cursor/rules/ADR.mdc` — Architectural Decision Records with protocol
- `.cursor/rules/folder-structure.mdc` — Repository layout plan
- `.cursor/rules/workflow.mdc` — Development methodology
- `tasks/task-template.mdc` — Task template for agents

## Your Analysis Process

### 1. **Project Requirements Analysis (PRD Generation)**

Examine the existing project and create a PRD that captures:

**Product Overview:**
- What does this application/system do?
- Who are the primary users/personas?
- What core value does it provide?

**Jobs-to-be-Done (JTBD):**
- When [situation], users want [motivation], so they can [outcome]
- Identify 2-3 key user workflows

**Success Metrics:**
- What defines success for this project?
- What would you measure to validate it's working?

**Scope Definition:**
- Must-have features (what's already implemented)
- Nice-to-have features (what could be added)
- Explicitly out-of-scope (what this project doesn't do)

**Definition of Done:**
- Clear acceptance criteria that describe the current working state

### 2. **Architectural Decision Records (ADR Generation)**

Identify the key architectural decisions made in this project:

**For each significant decision, document:**
- **Title:** Short, specific decision name
- **Status:** Accepted (for implemented decisions)
- **Context:** Why was this decision needed? What forces drove it?
- **Alternatives:** What other options were considered?
- **Decision:** What was chosen and why?
- **Consequences:** 
  - Pros: Benefits realized
  - Cons/Risks: Trade-offs made
  - Notes: Implementation details or verification methods

**Common decisions to look for:**
- Framework/technology choices (React, Next.js, etc.)
- Architecture patterns (client-server, microservices, etc.)
- Database/storage decisions
- Authentication/authorization approach
- Styling/UI library choices
- Testing strategy
- Deployment/hosting decisions
- State management approach
- API design patterns

### 3. **Folder Structure Analysis**

Document the current repository structure:

**Analyze and document:**
- Top-level directories and their purposes
- Key file locations and naming conventions
- How different concerns are separated
- Where tests, components, utilities, etc. are located
- Any special configuration files or directories

**Focus on:**
- Logical organization principles
- Naming conventions used
- Co-location vs separation strategies
- Public vs private module boundaries

### 4. **Workflow Guidelines Extraction**

Observe and document the development practices:

**Development Guidelines:**
- Package manager used (npm, yarn, pnpm)
- Build tools and scripts
- Code style and linting rules
- TypeScript usage patterns
- Environment setup requirements

**Testing Guidelines:**
- Testing frameworks used
- Test organization strategy
- Types of tests (unit, integration, e2e)
- Testing conventions and patterns

**Documentation Guidelines:**
- How code is documented
- README structure and content
- API documentation approach
- Comment and JSDoc usage

**Deployment/Operations:**
- How the project is built and deployed
- Environment configuration
- CI/CD practices (if observable)

## Analysis Instructions

### Step 1: Codebase Exploration
```bash
# Examine the project structure
find . -type f -name "*.json" -o -name "*.md" -o -name "*.config.*" | head -20
ls -la
cat package.json
cat README.md
```

### Step 2: Technology Stack Identification
Look for:
- `package.json` dependencies
- Configuration files (`next.config.js`, `tailwind.config.js`, etc.)
- Framework-specific directories (`app/`, `pages/`, `src/`, etc.)
- Build and deployment files

### Step 3: Code Pattern Analysis
Examine:
- Component organization and patterns
- State management approach
- API route structure
- Styling methodology
- Testing setup

### Step 4: Documentation Synthesis
Create the blueprint documentation that would generate a clean version of this project.

## Output Format

Provide your analysis in this structure:

```markdown
# Project Blueprint Analysis: [Project Name]

## Product Requirements Document (PRD)

### Product Overview
[Description of what the application does]

### Users & Value
- **Primary user/persona:** [who specifically]
- **Jobs-to-be-done (JTBD):**
  - When [situation], I want [motivation], so I can [outcome]
  - [Additional JTBDs]

### Success Metrics
- **Primary Goal:** [what success looks like]
- **Success Criteria:** [measurable criteria]

### Scope
| Must-have (Implemented) | Nice-to-have (Future) | Explicitly Out |
|------------------------|----------------------|----------------|
| [feature]              | [feature]            | [feature]      |

### Definition of Done
- [ ] [acceptance criterion 1]
- [ ] [acceptance criterion 2]

## Architectural Decision Records

### ADR-0001 — [Decision Title]
- **Status:** Accepted
- **Context:** [why needed]
- **Decision:** [what was chosen]
- **Consequences:** 
  - Pros: [benefits]
  - Cons: [trade-offs]

[Additional ADRs...]

## Folder Structure Specification

### Current Structure
- `/path` — Description of purpose
- `/path` — Description of purpose

### Conventions Observed
- [naming convention]
- [organization principle]

## Workflow Guidelines

### Development
- [guideline based on observed practices]

### Testing
- [testing approach used]

### Documentation
- [documentation patterns observed]

## Blueprint Generator Input

Based on this analysis, here's what should be input into the Project Blueprint Generator:

**Project Name:** `[sanitized-project-name]`

**PRD Content:** 
```
[The PRD content above]
```

**ADR Seed Decisions:**
```json
[
  {
    "title": "[Decision Title]",
    "status": "Accepted",
    "owner": "Development Team",
    "context": "[context]",
    "decision": "[decision]",
    "consequences": {
      "pros": ["[benefit]"],
      "cons": ["[trade-off]"],
      "notes": ["[note]"]
    }
  }
]
```

**Folder Structure Spec:**
```json
[
  {"path": "/path", "description": "Description"}
]
```

**Workflow Guidelines:**
```json
{
  "development": ["[guideline]"],
  "testing": ["[guideline]"],
  "agents": ["[guideline]"],
  "documentation": ["[guideline]"]
}
```
```

## Quality Checklist

Before submitting your analysis, verify:

- [ ] PRD captures the actual user value and use cases
- [ ] ADRs explain the "why" behind major technology choices
- [ ] Folder structure reflects the actual organization
- [ ] Workflow guidelines match observable practices
- [ ] All content is stack-agnostic and focuses on decisions, not implementation details
- [ ] The generated blueprint would enable recreating the project's essential structure and decisions

## Notes

- Focus on **decisions and patterns**, not specific code implementations
- Capture the **intent and rationale** behind choices, not just what was chosen
- Think about what a **new developer** would need to understand to work on this project
- Consider what would be **essential to preserve** in a clean rewrite
- Document **trade-offs and constraints** that influenced the current design

This analysis will create a blueprint that preserves the essential architectural DNA of the project while enabling a clean, well-documented implementation.
