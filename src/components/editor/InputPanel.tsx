import { useState } from 'react';
import { Send, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InputPanelProps {
  onSendInput: (input: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export function InputPanel({ onSendInput, onClear, placeholder }: InputPanelProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendInput(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border-l border-border shadow-organic">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-organic" />
          <h3 className="text-sm font-semibold text-foreground">Input</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={onClear}
          className="h-7 px-2 text-xs hover:bg-muted transition-smooth"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>

      {/* Input Area */}
      <div className="flex-1 flex flex-col p-4 gap-3">
        <div className="flex-1">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "Enter input for your code...\n\nPress Ctrl+Enter to send"}
            className="h-full resize-none font-mono text-sm bg-background/50 border-border focus:border-primary transition-smooth organic-border"
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Ctrl+Enter to send
          </p>
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            size="sm"
            className="gap-2 transition-smooth shadow-organic hover:shadow-organic-lg hover:scale-105"
          >
            <Send className="h-3 w-3" />
            Send Input
          </Button>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 py-3 border-t border-border bg-muted/20">
        <p className="text-xs text-muted-foreground">
          💡 Enter input here first, then click "Run Code". This input will be used for <code className="px-1 py-0.5 rounded bg-muted text-foreground">input()</code> in Python or stdin in other languages.
        </p>
      </div>
    </div>
  );
}
