"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Download, Loader2 } from 'lucide-react';
import { type ZipRequest, type CursorRule } from '@/utils/cursor-zip-generator';

interface CursorZipGeneratorProps {
  className?: string;
}

export default function CursorZipGenerator({ className }: CursorZipGeneratorProps) {
  const [prd, setPrd] = useState('');
  const [rules, setRules] = useState<CursorRule[]>([
    { filename: 'components.mdc', content: '' }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRule = () => {
    setRules([...rules, { filename: '', content: '' }]);
  };

  const removeRule = (index: number) => {
    if (rules.length > 1) {
      setRules(rules.filter((_, i) => i !== index));
    }
  };

  const updateRule = (index: number, field: keyof CursorRule, value: string) => {
    const updatedRules = [...rules];
    updatedRules[index] = { ...updatedRules[index], [field]: value };
    setRules(updatedRules);
  };

  const generateZip = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Validate inputs
      if (!prd.trim()) {
        throw new Error('PRD content is required');
      }

      const validRules = rules.filter(rule => rule.filename.trim() && rule.content.trim());
      if (validRules.length === 0) {
        throw new Error('At least one rule with filename and content is required');
      }

      const request: ZipRequest = {
        prd: prd.trim(),
        rules: validRules.map(rule => ({
          filename: rule.filename.trim(),
          content: rule.content.trim()
        }))
      };

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
      const filename = filenameMatch?.[1] || 'cursor-project.zip';
      
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
      console.error('Error generating zip:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate zip file');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Cursor Project Generator
        </CardTitle>
        <CardDescription>
          Generate a downloadable .zip file with Cursor-compliant project structure including PRD and rules.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* PRD Section */}
        <div className="space-y-2">
          <Label htmlFor="prd" className="text-sm font-semibold">
            Product Requirements Document (PRD) *
          </Label>
          <Textarea
            id="prd"
            value={prd}
            onChange={(e) => setPrd(e.target.value)}
            placeholder="Enter your product requirements document content here..."
            className="min-h-[120px] font-mono text-sm"
            required
          />
          <p className="text-xs text-muted-foreground">
            This will be saved as PRD.md at the repository root.
          </p>
        </div>

        {/* Rules Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Cursor Rules</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRule}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Rule
            </Button>
          </div>
          
          {rules.map((rule, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Label htmlFor={`filename-${index}`} className="text-xs font-medium">
                    Filename (.mdc will be added automatically)
                  </Label>
                  <Input
                    id={`filename-${index}`}
                    value={rule.filename}
                    onChange={(e) => updateRule(index, 'filename', e.target.value)}
                    placeholder="e.g., components, api-routes, styling"
                    className="mt-1"
                  />
                </div>
                {rules.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRule(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div>
                <Label htmlFor={`content-${index}`} className="text-xs font-medium">
                  Rule Content
                </Label>
                <Textarea
                  id={`content-${index}`}
                  value={rule.content}
                  onChange={(e) => updateRule(index, 'content', e.target.value)}
                  placeholder="Enter the Cursor rule content (markdown format)..."
                  className="mt-1 min-h-[80px] font-mono text-sm"
                />
              </div>
            </div>
          ))}
          
          <p className="text-xs text-muted-foreground">
            Rules will be saved in .cursor/rules/ directory. An index.mdc file with alwaysApply: true will be automatically generated.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={generateZip}
          disabled={isGenerating || !prd.trim()}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Zip...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Generate & Download Zip
            </>
          )}
        </Button>

        {/* Info Section */}
        <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
          <p><strong>Generated structure:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>PRD.md (your product requirements)</li>
            <li>.cursor/rules/index.mdc (auto-generated with alwaysApply: true)</li>
            <li>.cursor/rules/*.mdc (your custom rules)</li>
            <li>.cursorignore (sensible defaults for file exclusions)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
