import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Save, Sparkles, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Separator } from '@/components/ui/separator';

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
  onSave,
  onFormat,
  isRunning = false,
  isSaving = false,
  currentFileName,
}: ToolbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-secondary" />
          <h1 className="text-lg font-bold text-foreground">Athena's Code Chambers</h1>
        </div>
        {currentFileName && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground">{currentFileName}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={onRun}
          disabled={isRunning}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Play className="mr-2 h-4 w-4" />
          Run Code
        </Button>

        <Button size="sm" variant="outline" onClick={onFormat}>
          <Sparkles className="mr-2 h-4 w-4" />
          Format
        </Button>

        <Button size="sm" variant="outline" onClick={onSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save'}
        </Button>

        <Button size="sm" variant="outline" onClick={onClear}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear Output
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button size="sm" variant="ghost" onClick={toggleTheme}>
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
