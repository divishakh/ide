/**
 * AI-powered code completion service
 * Provides intelligent code suggestions using OpenAI API
 */

interface CompletionRequest {
  code: string;
  language: string;
  cursorPosition: { line: number; column: number };
  fileName?: string;
}

interface CompletionSuggestion {
  text: string;
  detail?: string;
  documentation?: string;
  kind?: string;
}

class AICompletionService {
  private apiKey: string | null = null;
  private apiEndpoint = 'https://api.openai.com/v1/chat/completions';
  private model = 'gpt-3.5-turbo';
  private cache: Map<string, CompletionSuggestion[]> = new Map();
  private requestQueue: Map<string, Promise<CompletionSuggestion[]>> = new Map();

  constructor() {
    // Try to get API key from environment or localStorage
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('openai_api_key');
  }

  /**
   * Set the OpenAI API key
   */
  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('openai_api_key', key);
  }

  /**
   * Get the current API key
   */
  getApiKey(): string | null {
    return this.apiKey;
  }

  /**
   * Check if API key is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey.length > 0;
  }

  /**
   * Generate cache key for request
   */
  private getCacheKey(request: CompletionRequest): string {
    const { code, language, cursorPosition } = request;
    const contextWindow = 200; // Characters before cursor
    const startPos = Math.max(0, code.length - contextWindow);
    const context = code.substring(startPos);
    return `${language}:${cursorPosition.line}:${cursorPosition.column}:${context}`;
  }

  /**
   * Get code completions from AI
   */
  async getCompletions(request: CompletionRequest): Promise<CompletionSuggestion[]> {
    if (!this.isConfigured()) {
      console.warn('OpenAI API key not configured. AI completions disabled.');
      return [];
    }

    const cacheKey = this.getCacheKey(request);

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Check if request is already in progress
    if (this.requestQueue.has(cacheKey)) {
      return this.requestQueue.get(cacheKey)!;
    }

    // Create new request
    const requestPromise = this.fetchCompletions(request);
    this.requestQueue.set(cacheKey, requestPromise);

    try {
      const suggestions = await requestPromise;
      this.cache.set(cacheKey, suggestions);
      
      // Clean up old cache entries (keep last 50)
      if (this.cache.size > 50) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }

      return suggestions;
    } finally {
      this.requestQueue.delete(cacheKey);
    }
  }

  /**
   * Fetch completions from OpenAI API
   */
  private async fetchCompletions(request: CompletionRequest): Promise<CompletionSuggestion[]> {
    const { code, language, cursorPosition } = request;

    // Get context around cursor (last 500 characters)
    const contextWindow = 500;
    const startPos = Math.max(0, code.length - contextWindow);
    const context = code.substring(startPos);

    // Build prompt for AI
    const prompt = this.buildPrompt(context, language, cursorPosition);

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert code completion assistant. Provide concise, accurate code suggestions. Return only the completion text without explanations.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 100,
          temperature: 0.3,
          n: 3, // Get 3 suggestions
          stop: ['\n\n', '```'],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('OpenAI API error:', error);
        return [];
      }

      const data = await response.json();
      return this.parseCompletions(data, language);
    } catch (error) {
      console.error('Error fetching AI completions:', error);
      return [];
    }
  }

  /**
   * Build prompt for AI completion
   */
  private buildPrompt(context: string, language: string, cursorPosition: { line: number; column: number }): string {
    return `Complete the following ${language} code. Provide only the next logical code completion:

\`\`\`${language}
${context}█
\`\`\`

Provide 1-3 short, relevant completions for the cursor position (marked with █). Return only the completion text.`;
  }

  /**
   * Parse AI response into completion suggestions
   */
  private parseCompletions(data: any, language: string): CompletionSuggestion[] {
    const suggestions: CompletionSuggestion[] = [];

    if (data.choices && Array.isArray(data.choices)) {
      for (const choice of data.choices) {
        const text = choice.message?.content?.trim();
        if (text && text.length > 0) {
          // Clean up the completion text
          const cleanText = this.cleanCompletionText(text);
          if (cleanText) {
            suggestions.push({
              text: cleanText,
              detail: 'AI Suggestion',
              documentation: `AI-powered completion for ${language}`,
              kind: 'ai',
            });
          }
        }
      }
    }

    return suggestions;
  }

  /**
   * Clean up completion text
   */
  private cleanCompletionText(text: string): string {
    // Remove markdown code blocks
    text = text.replace(/```[\w]*\n?/g, '');
    
    // Remove leading/trailing whitespace
    text = text.trim();
    
    // Remove explanatory text (lines starting with //, #, etc.)
    const lines = text.split('\n');
    const codeLines = lines.filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0 && 
             !trimmed.startsWith('//') && 
             !trimmed.startsWith('#') &&
             !trimmed.startsWith('/*') &&
             !trimmed.toLowerCase().startsWith('explanation:') &&
             !trimmed.toLowerCase().startsWith('note:');
    });
    
    return codeLines.join('\n').trim();
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }
}

// Export singleton instance
export const aiCompletionService = new AICompletionService();
