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
        <Terminal className="h-4 w-4" />
        <h3 className="text-sm font-semibold">Console</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 font-mono text-sm">
          {outputs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
              <div className="mb-4 text-4xl">⚡</div>
              <p className="text-sm text-gray-400">
                Run your code to see output here
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
