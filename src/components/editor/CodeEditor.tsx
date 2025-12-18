import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '@/hooks/useTheme';
import { Loader2 } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
}

export function CodeEditor({ value, onChange, language = 'javascript', readOnly = false }: CodeEditorProps) {
  const { theme } = useTheme();
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          readOnly,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          formatOnPaste: true,
          formatOnType: true,
          // Enhanced IntelliSense settings
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: 'on',
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          quickSuggestionsDelay: 10,
          parameterHints: {
            enabled: true,
          },
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showClasses: true,
            showFunctions: true,
            showVariables: true,
            showModules: true,
            showProperties: true,
            showValues: true,
            showConstants: true,
          },
          folding: true,
          foldingStrategy: 'indentation',
          showFoldingControls: 'always',
          matchBrackets: 'always',
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoIndent: 'full',
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
        }}
        loading={
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      />
    </div>
  );
}
