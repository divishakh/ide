// File extension utilities

export const languageExtensions: Record<string, string> = {
  javascript: '.js',
  typescript: '.ts',
  python: '.py',
  java: '.java',
  cpp: '.cpp',
  c: '.c',
  csharp: '.cs',
  go: '.go',
  rust: '.rs',
  ruby: '.rb',
  php: '.php',
  html: '.html',
  css: '.css',
  json: '.json',
  xml: '.xml',
  yaml: '.yaml',
  markdown: '.md',
  sql: '.sql',
  shell: '.sh',
  powershell: '.ps1',
};

export const extensionToLanguage: Record<string, string> = {
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.py': 'python',
  '.java': 'java',
  '.cpp': 'cpp',
  '.cc': 'cpp',
  '.cxx': 'cpp',
  '.c': 'c',
  '.h': 'c',
  '.cs': 'csharp',
  '.go': 'go',
  '.rs': 'rust',
  '.rb': 'ruby',
  '.php': 'php',
  '.html': 'html',
  '.htm': 'html',
  '.css': 'css',
  '.scss': 'css',
  '.sass': 'css',
  '.json': 'json',
  '.xml': 'xml',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.md': 'markdown',
  '.sql': 'sql',
  '.sh': 'shell',
  '.bash': 'shell',
  '.ps1': 'powershell',
};

/**
 * Get file extension for a language
 */
export function getExtensionForLanguage(language: string): string {
  return languageExtensions[language.toLowerCase()] || '.txt';
}

/**
 * Get language from file extension
 */
export function getLanguageFromExtension(filename: string): string {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  return extensionToLanguage[ext] || 'javascript';
}

/**
 * Ensure filename has correct extension for language
 */
export function ensureCorrectExtension(filename: string, language: string): string {
  const currentExt = filename.substring(filename.lastIndexOf('.'));
  const correctExt = getExtensionForLanguage(language);
  
  // If filename has no extension or wrong extension, add/replace it
  if (!currentExt || currentExt === filename) {
    return filename + correctExt;
  }
  
  // If extension doesn't match language, replace it
  const currentLang = getLanguageFromExtension(filename);
  if (currentLang !== language) {
    return filename.substring(0, filename.lastIndexOf('.')) + correctExt;
  }
  
  return filename;
}

/**
 * Validate filename
 */
export function validateFilename(filename: string): { valid: boolean; error?: string } {
  if (!filename || filename.trim() === '') {
    return { valid: false, error: 'Filename cannot be empty' };
  }
  
  if (filename.includes('/') || filename.includes('\\')) {
    return { valid: false, error: 'Filename cannot contain slashes' };
  }
  
  if (filename.startsWith('.')) {
    return { valid: false, error: 'Filename cannot start with a dot' };
  }
  
  if (filename.length > 255) {
    return { valid: false, error: 'Filename is too long' };
  }
  
  return { valid: true };
}
