import type { ExecutionResult, Language } from '@/types';

const PISTON_API_URL = 'https://emkc.org/api/v2/piston';

// Supported languages with their Piston identifiers
export const SUPPORTED_LANGUAGES: Record<string, { pistonId: string; version: string; monacoId: string }> = {
  javascript: { pistonId: 'javascript', version: '18.15.0', monacoId: 'javascript' },
  python: { pistonId: 'python', version: '3.10.0', monacoId: 'python' },
  cpp: { pistonId: 'c++', version: '10.2.0', monacoId: 'cpp' },
  c: { pistonId: 'c', version: '10.2.0', monacoId: 'c' },
  java: { pistonId: 'java', version: '15.0.2', monacoId: 'java' },
  typescript: { pistonId: 'typescript', version: '5.0.3', monacoId: 'typescript' },
  go: { pistonId: 'go', version: '1.16.2', monacoId: 'go' },
  rust: { pistonId: 'rust', version: '1.68.2', monacoId: 'rust' },
  ruby: { pistonId: 'ruby', version: '3.0.1', monacoId: 'ruby' },
  php: { pistonId: 'php', version: '8.2.3', monacoId: 'php' },
};

/**
 * Execute JavaScript code in the browser (legacy method)
 */
export function executeJavaScriptInBrowser(code: string): ExecutionResult {
  const output: string[] = [];
  const errors: string[] = [];

  // Override console methods
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
  };

  console.log = (...args: unknown[]) => {
    output.push(args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' '));
    originalConsole.log(...args);
  };

  console.error = (...args: unknown[]) => {
    errors.push(args.map(arg => String(arg)).join(' '));
    originalConsole.error(...args);
  };

  console.warn = (...args: unknown[]) => {
    output.push(`⚠️ ${args.map(arg => String(arg)).join(' ')}`);
    originalConsole.warn(...args);
  };

  console.info = (...args: unknown[]) => {
    output.push(`ℹ️ ${args.map(arg => String(arg)).join(' ')}`);
    originalConsole.info(...args);
  };

  try {
    // Execute the code
    // eslint-disable-next-line no-eval
    eval(code);

    // Restore console
    Object.assign(console, originalConsole);

    return {
      stdout: output.join('\n'),
      stderr: errors.join('\n'),
      output: output.join('\n'),
      exitCode: 0,
    };
  } catch (error) {
    // Restore console
    Object.assign(console, originalConsole);

    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      stdout: output.join('\n'),
      stderr: errorMessage,
      output: output.join('\n'),
      exitCode: 1,
    };
  }
}

/**
 * Execute code using Piston API (supports multiple languages)
 */
export async function executeCodeWithPiston(
  code: string,
  language: string,
  stdin?: string
): Promise<ExecutionResult> {
  const startTime = Date.now();

  try {
    const langConfig = SUPPORTED_LANGUAGES[language];
    if (!langConfig) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const requestBody: any = {
      language: langConfig.pistonId,
      version: langConfig.version,
      files: [
        {
          name: `main.${getFileExtension(language)}`,
          content: code,
        },
      ],
    };

    // Add stdin if provided
    if (stdin) {
      requestBody.stdin = stdin;
    }

    const response = await fetch(`${PISTON_API_URL}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Piston API error: ${response.statusText}`);
    }

    const result = await response.json();
    const executionTime = Date.now() - startTime;

    return {
      stdout: result.run?.stdout || '',
      stderr: result.run?.stderr || result.compile?.stderr || '',
      output: result.run?.output || result.run?.stdout || '',
      exitCode: result.run?.code || 0,
      executionTime,
    };
  } catch (error) {
    const executionTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      stdout: '',
      stderr: errorMessage,
      output: '',
      exitCode: 1,
      executionTime,
    };
  }
}

/**
 * Execute code based on language (browser for JS, Piston for others)
 */
export async function executeCode(
  code: string,
  language: string,
  stdin?: string
): Promise<ExecutionResult> {
  // Use browser execution for JavaScript (faster, no API limits)
  if (language === 'javascript') {
    return executeJavaScriptInBrowser(code);
  }

  // Use Piston API for other languages
  return executeCodeWithPiston(code, language, stdin);
}

/**
 * Get available languages from Piston API
 */
export async function getAvailableLanguages(): Promise<Language[]> {
  try {
    const response = await fetch(`${PISTON_API_URL}/runtimes`);
    if (!response.ok) {
      throw new Error('Failed to fetch available languages');
    }

    const runtimes = await response.json();
    return runtimes.map((runtime: { language: string; version: string; aliases: string[] }) => ({
      id: runtime.language,
      name: runtime.language.charAt(0).toUpperCase() + runtime.language.slice(1),
      version: runtime.version,
      aliases: runtime.aliases,
    }));
  } catch (error) {
    console.error('Error fetching languages:', error);
    // Return default supported languages
    return Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => ({
      id: key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      version: value.version,
      aliases: [value.pistonId],
    }));
  }
}

/**
 * Get file extension for a language
 */
function getFileExtension(language: string): string {
  const extensions: Record<string, string> = {
    javascript: 'js',
    python: 'py',
    cpp: 'cpp',
    c: 'c',
    java: 'java',
    typescript: 'ts',
    go: 'go',
    rust: 'rs',
    ruby: 'rb',
    php: 'php',
  };

  return extensions[language] || 'txt';
}

/**
 * Get Monaco Editor language ID
 */
export function getMonacoLanguage(language: string): string {
  return SUPPORTED_LANGUAGES[language]?.monacoId || 'plaintext';
}

/**
 * Get language display name
 */
export function getLanguageDisplayName(language: string): string {
  const names: Record<string, string> = {
    javascript: 'JavaScript',
    python: 'Python',
    cpp: 'C++',
    c: 'C',
    java: 'Java',
    typescript: 'TypeScript',
    go: 'Go',
    rust: 'Rust',
    ruby: 'Ruby',
    php: 'PHP',
  };

  return names[language] || language;
}
