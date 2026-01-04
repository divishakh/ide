import { Button } from '@/components/ui/button';
import { Play, RotateCcw, FileText, Sparkles, Download, Share2 } from 'lucide-react';

interface ToolbarProps {
  onRun: () => void;
  onClear: () => void;
  onSave: () => void;
  onFormat: () => void;
  onNewFile?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  isRunning?: boolean;
  isSaving?: boolean;
  currentFileName?: string;
}

export function Toolbar({
  onRun,
  onClear,
  onFormat,
  onNewFile,
  onDownload,
  onShare,
  isRunning = false,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-3 border-b bg-card px-6 py-3 shadow-organic">
      <Button
        size="default"
        onClick={onRun}
        disabled={isRunning}
        className="bg-success text-success-foreground hover:bg-success/90 font-medium rounded-lg px-6 shadow-organic hover:shadow-organic-lg transition-smooth hover:scale-105"
      >
        <Play className="mr-2 h-4 w-4 fill-current" />
        Run Code
      </Button>

      {onNewFile && (
        <Button 
          size="default" 
          variant="outline" 
          onClick={onNewFile}
          className="rounded-lg font-medium transition-smooth hover:shadow-organic"
        >
          <FileText className="mr-2 h-4 w-4" />
          New File
        </Button>
      )}

      <Button 
        size="default" 
        variant="outline" 
        onClick={onFormat}
        className="rounded-lg font-medium transition-smooth hover:shadow-organic"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        Format
      </Button>

      <Button 
        size="default" 
        variant="outline" 
        onClick={onClear}
        className="rounded-lg font-medium transition-smooth hover:shadow-organic"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Clear Output
      </Button>

      {onDownload && (
        <Button 
          size="default" 
          variant="outline" 
          onClick={onDownload}
          className="rounded-lg font-medium transition-smooth hover:shadow-organic"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      )}

      {onShare && (
        <Button 
          size="default" 
          variant="outline" 
          onClick={onShare}
          className="rounded-lg font-medium transition-smooth hover:shadow-organic"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Project
        </Button>
      )}

      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse shadow-organic" />
          <span className="text-muted-foreground font-medium">Ready</span>
        </div>
      </div>
    </div>
  );
}
