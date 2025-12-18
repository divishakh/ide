import { ScrollArea } from '@/components/ui/scroll-area';
import { Terminal } from 'lucide-react';
import type { ConsoleOutput } from '@/types';
import { cn } from '@/lib/utils';

interface OutputPanelProps {
  outputs: ConsoleOutput[];
  onClear: () => void;
}

export function OutputPanel({ outputs }: OutputPanelProps) {
  const getOutputColor = (type: ConsoleOutput['type']) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'warn':
        return 'text-yellow-400';
      case 'info':
        return 'text-blue-400';
      default:
        return 'text-console-foreground';
    }
  };

  return (
    <div className="flex h-full flex-col bg-console-background text-console-foreground">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success">
          <Terminal className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-sm font-semibold">Console Output</h3>
        <span className="text-xs text-muted-foreground">Live execution results</span>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 font-mono text-sm">
          {outputs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              {/* Cloud illustration */}
              <div className="relative mb-6">
                <svg className="h-24 w-24 text-gray-600" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M80,50 Q80,35 65,35 Q65,25 55,25 Q45,25 45,35 Q30,35 30,50 Q30,65 45,65 L75,65 Q80,65 80,50 Z" />
                  <circle cx="25" cy="70" r="8" opacity="0.6" />
                  <circle cx="35" cy="75" r="6" opacity="0.4" />
                </svg>
              </div>
              <p className="text-gray-400 italic mb-2">
                Output will appear here when you run your code...
              </p>
              <p className="text-gray-500 text-xs">
                Press the "Run Code" button to execute
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {outputs.map((output, index) => (
                <div
                  key={`${output.timestamp}-${index}`}
                  className="flex items-start gap-2"
                >
                  <span className="text-gray-500 select-none">&gt;</span>
                  <pre className={cn('whitespace-pre-wrap break-words flex-1', getOutputColor(output.type))}>
                    {output.message}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
