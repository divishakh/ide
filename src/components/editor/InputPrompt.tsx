import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Terminal } from 'lucide-react';

interface InputPromptProps {
  open: boolean;
  onSubmit: (value: string) => void;
  onCancel: () => void;
  prompt?: string;
}

export function InputPrompt({ open, onSubmit, onCancel, prompt = 'Enter input:' }: InputPromptProps) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Program Input Required
          </DialogTitle>
          <DialogDescription>
            {prompt}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your input here..."
            autoFocus
            className="font-mono"
          />
        </div>
        
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
