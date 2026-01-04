/**
 * Monaco Editor AI Completion Provider
 * Integrates AI-powered completions into Monaco Editor
 */

import { aiCompletionService } from '@/services/aiCompletion';

export function registerAICompletionProvider(monaco: any, language: string) {
  return monaco.languages.registerCompletionItemProvider(language, {
    triggerCharacters: ['.', '(', ' ', '\n'],
    
    provideCompletionItems: async (model: any, position: any) => {
      // Don't provide AI suggestions if API key is not configured
      if (!aiCompletionService.isConfigured()) {
        return { suggestions: [] };
      }

      const code = model.getValue();
      const cursorPosition = {
        line: position.lineNumber,
        column: position.column,
      };

      try {
        // Get AI completions
        const completions = await aiCompletionService.getCompletions({
          code,
          language,
          cursorPosition,
        });

        // Convert to Monaco completion items
        const suggestions = completions.map((completion, index) => ({
          label: completion.text.split('\n')[0], // First line as label
          kind: monaco.languages.CompletionItemKind.Text,
          insertText: completion.text,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          detail: completion.detail || 'AI Suggestion',
          documentation: {
            value: completion.documentation || 'AI-powered code completion',
            isTrusted: true,
          },
          sortText: `0${index}`, // Sort AI suggestions first
          preselect: index === 0, // Preselect first suggestion
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          },
        }));

        return { suggestions };
      } catch (error) {
        console.error('Error providing AI completions:', error);
        return { suggestions: [] };
      }
    },
  });
}

/**
 * Register AI completion providers for all supported languages
 */
export function registerAllAICompletionProviders(monaco: any) {
  const languages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'cpp',
    'c',
    'csharp',
    'go',
    'rust',
    'php',
    'ruby',
    'swift',
    'kotlin',
    'scala',
    'html',
    'css',
    'json',
    'yaml',
    'sql',
  ];

  const disposables: any[] = [];

  for (const language of languages) {
    try {
      const disposable = registerAICompletionProvider(monaco, language);
      disposables.push(disposable);
    } catch (error) {
      console.warn(`Failed to register AI completion provider for ${language}:`, error);
    }
  }

  return disposables;
}
