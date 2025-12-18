import { Button } from '@/components/ui/button';
import { Play, RotateCcw, FileText, Sparkles } from 'lucide-react';

interface ToolbarProps {
  onRun: () => void;
  onClear: () => void;
  onSave: () => void;
  onFormat: () => void;
  isRunning?: boolean;
  isSaving?: boolean;
  currentFileName?: string;
}

export function Toolbar({
  onRun,
  onClear,
  onFormat,
  isRunning = false,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-3 border-b bg-card px-6 py-3">
      <Button
        size="default"
        onClick={onRun}
        disabled={isRunning}
        className="bg-success text-success-foreground hover:bg-success/90 font-medium rounded-lg px-6"
      >
        <Play className="mr-2 h-4 w-4 fill-current" />
        Run Code
      </Button>

      <Button 
        size="default" 
        variant="outline" 
        onClick={() => {/* Handle new file */}}
        className="rounded-lg font-medium"
      >
        <FileText className="mr-2 h-4 w-4" />
        New File
      </Button>

      <Button 
        size="default" 
        variant="outline" 
        onClick={onFormat}
        className="rounded-lg font-medium"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Format
      </Button>

      <Button 
        size="default" 
        variant="outline" 
        onClick={onClear}
        className="rounded-lg font-medium"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Clear Output
      </Button>

      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-muted-foreground font-medium">Ready</span>
        </div>
      </div>
    </div>
  );
}
