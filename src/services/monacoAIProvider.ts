/**
 * Monaco Editor AI Completion Provider
 * Integrates AI-powered completions into Monaco Editor
 */

import { aiCompletionService } from '@/services/aiCompletion';

export function registerAICompletionProvider(monaco: any, language: string) {
  console.log('[AI] Registering completion provider for language:', language);
  
  return monaco.languages.registerCompletionItemProvider(language, {
    triggerCharacters: ['.', '(', ' ', '\n', '\t'],
    
    provideCompletionItems: async (model: any, position: any) => {
      console.log('[AI] provideCompletionItems called for:', language, 'at position:', position);
      
      // Don't provide AI suggestions if API key is not configured
      if (!aiCompletionService.isConfigured()) {
        console.log('[AI] API key not configured, skipping');
        return { suggestions: [] };
      }

      const code = model.getValue();
      const cursorPosition = {
        line: position.lineNumber,
        column: position.column,
      };

      console.log('[AI] Code length:', code.length, 'Position:', cursorPosition);

      try {
        // Get AI completions
        const completions = await aiCompletionService.getCompletions({
          code,
          language,
          cursorPosition,
        });

        console.log('[AI] Got completions:', completions.length);

        if (completions.length === 0) {
          console.log('[AI] No completions returned');
          return { suggestions: [] };
        }

        // Convert to Monaco completion items
        const suggestions = completions.map((completion, index) => {
          const suggestion = {
            label: `✨ ${completion.text.split('\n')[0]}`, // First line as label with AI icon
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: completion.text,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: '🤖 ' + (completion.detail || 'AI Suggestion'),
            documentation: {
              value: completion.documentation || 'AI-powered code completion',
              isTrusted: true,
            },
            sortText: `!${index}`, // Sort AI suggestions first (! comes before letters)
            filterText: completion.text,
            preselect: index === 0, // Preselect first suggestion
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            },
          };
          
          console.log('[AI] Created suggestion:', suggestion.label);
          return suggestion;
        });

        console.log('[AI] Returning', suggestions.length, 'suggestions to Monaco');
        return { suggestions };
      } catch (error) {
        console.error('[AI] Error providing AI completions:', error);
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
