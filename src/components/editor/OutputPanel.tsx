import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash2, Terminal } from 'lucide-react';
import type { ConsoleOutput } from '@/types';
import { cn } from '@/lib/utils';

interface OutputPanelProps {
  outputs: ConsoleOutput[];
  onClear: () => void;
}

export function OutputPanel({ outputs, onClear }: OutputPanelProps) {
  const getOutputIcon = (type: ConsoleOutput['type']) => {
    switch (type) {
      case 'error':
        return '❌';
      case 'warn':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '▶';
    }
  };

  const getOutputColor = (type: ConsoleOutput['type']) => {
    switch (type) {
      case 'error':
        return 'text-destructive';
      case 'warn':
        return 'text-secondary';
      case 'info':
        return 'text-primary';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="flex h-full flex-col border-l border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Console Output</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClear}
          className="h-7 px-2 text-muted-foreground hover:text-foreground"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 font-mono text-sm">
          {outputs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p>No output yet. Run your code to see results here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {outputs.map((output, index) => (
                <div
                  key={`${output.timestamp}-${index}`}
                  className={cn(
                    'flex items-start gap-2 rounded-md border border-border bg-background p-2',
                    output.type === 'error' && 'border-destructive/50 bg-destructive/5'
                  )}
                >
                  <span className="mt-0.5 text-base">{getOutputIcon(output.type)}</span>
                  <div className="flex-1">
                    <pre className={cn('whitespace-pre-wrap break-words', getOutputColor(output.type))}>
                      {output.message}
                    </pre>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {new Date(output.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
