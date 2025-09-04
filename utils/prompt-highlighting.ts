/**
 * Utility functions for highlighting dynamic content in prompt templates
 */

/**
 * Escapes HTML characters to prevent XSS attacks
 * Works in both server and client environments
 */
function escapeHtml(text: string): string {
  const htmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  
  return text.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
}

/**
 * Substitutes variables in a prompt template with highlighted HTML
 * @param prompt - The original prompt template
 * @param formData - Form data containing variable values
 * @returns Object with highlighted HTML and plain text versions
 */
export function substituteVariablesWithHighlighting(prompt: string, formData: any): {
  highlightedHtml: string;
  plainText: string;
} {
  let highlightedPrompt = prompt;
  let plainPrompt = prompt;
  
  // Replace basic variables in the prompt with form data
  const variables = [
    { key: 'company', value: formData.company },
    { key: 'industry', value: formData.industry },
    { key: 'offer', value: formData.offer },
    { key: 'icp', value: formData.icp },
    { key: 'brand_tone', value: formData.brand_tone },
    { key: 'stack', value: formData.stack }
  ];

  variables.forEach(({ key, value }) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    if (value && value.trim()) {
      const escapedValue = escapeHtml(value);
      highlightedPrompt = highlightedPrompt.replace(
        regex, 
        `<span class="prompt-highlight">${escapedValue}</span>`
      );
      plainPrompt = plainPrompt.replace(regex, value);
    } else {
      // Keep placeholder if no value
      highlightedPrompt = highlightedPrompt.replace(
        regex, 
        `<span class="prompt-placeholder">{${key}}</span>`
      );
      plainPrompt = plainPrompt.replace(regex, `{${key}}`);
    }
  });
  
  // Handle nested kpis variables with default values
  const kpisVariables = [
    { key: 'kpis\\.reply_rate_target', value: '5' },
    { key: 'kpis\\.meetings_per_month', value: '10' },
    { key: 'kpis\\.cpl_target', value: '150' },
    { key: 'kpis', value: '{ reply_rate_target: 5, meetings_per_month: 10, cpl_target: 150 }' }
  ];

  kpisVariables.forEach(({ key, value }) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    highlightedPrompt = highlightedPrompt.replace(
      regex, 
      `<span class="prompt-highlight">${escapeHtml(value)}</span>`
    );
    plainPrompt = plainPrompt.replace(regex, value);
  });
  
  // Handle other variables with default values
  const defaultVariables = [
    { key: 'deadline', value: '2025-09-30' },
    { key: 'compliance_notes', value: 'GDPR' },
    { key: 'assets_folder', value: 'https://example.com/assets' }
  ];

  defaultVariables.forEach(({ key, value }) => {
    const regex = new RegExp(`\\{${key}\\}`, 'g');
    highlightedPrompt = highlightedPrompt.replace(
      regex, 
      `<span class="prompt-highlight">${escapeHtml(value)}</span>`
    );
    plainPrompt = plainPrompt.replace(regex, value);
  });
  
  return {
    highlightedHtml: highlightedPrompt,
    plainText: plainPrompt
  };
}

/**
 * Strips HTML tags from a string to get plain text
 */
export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}
