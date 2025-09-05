/**
 * Utility functions for generating Cursor-compliant project zips
 * Follows 2025 Cursor conventions with .cursor/rules/*.mdc structure
 */

export interface CursorRule {
  filename: string;
  content: string;
}

export interface ZipRequest {
  prd: string;
  rules: CursorRule[];
}

/**
 * Generates the default index.mdc rule that references the PRD
 * This rule has alwaysApply: true and includes the PRD as context
 */
export function generateIndexRule(prdFilename: string = 'PRD.md'): string {
  return `---
alwaysApply: true
---

# Repository-wide Cursor Rules

This is the main rule file for the project. It automatically applies to all files and includes the Product Requirements Document as context.

## Project Context

@file ${prdFilename}

## General Guidelines

- Follow the specifications outlined in the PRD
- Maintain consistency with existing code patterns
- Write clean, well-documented code
- Follow TypeScript best practices when applicable
- Ensure all changes align with the project requirements

## Code Quality

- Use meaningful variable and function names
- Add comments for complex logic
- Follow established naming conventions
- Maintain proper error handling
- Write testable code when possible

## Architecture

- Follow the established project structure
- Maintain separation of concerns
- Use appropriate design patterns
- Keep components focused and reusable
- Follow the established data flow patterns
`;
}

/**
 * Generates a default .cursorignore file
 * Only include if we need to exclude specific files from indexing
 */
export function generateCursorIgnore(): string {
  return `# Cursor ignore file
# Files and directories to exclude from Cursor's indexing

# Dependencies
node_modules/
.pnpm-store/

# Build outputs
.next/
dist/
build/

# Environment files
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
pnpm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# Temporary folders
tmp/
temp/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/

# Cache directories
.cache/
.parcel-cache/
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
 * Generates the complete zip structure data
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

  // Add index.mdc rule (always apply)
  files.push({
    path: '.cursor/rules/index.mdc',
    content: generateIndexRule('PRD.md')
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

  // Add .cursorignore if we have specific exclusions
  // For now, we'll always include it with sensible defaults
  files.push({
    path: '.cursorignore',
    content: generateCursorIgnore()
  });

  return { files };
}

/**
 * Generates a safe project name for the zip file
 */
export function generateZipFilename(projectName?: string): string {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
  const safeName = projectName ? sanitizeFilename(projectName) : 'cursor-project';
  return `${safeName}-${timestamp}.zip`;
}
