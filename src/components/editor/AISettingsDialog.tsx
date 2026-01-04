import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { aiCompletionService } from '@/services/aiCompletion';
import { Sparkles, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface AISettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISettingsDialog({ open, onOpenChange }: AISettingsDialogProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (open) {
      const currentKey = aiCompletionService.getApiKey();
      setApiKey(currentKey || '');
      setIsSaved(aiCompletionService.isConfigured());
      setTestResult(null);
    }
  }, [open]);

  const handleSave = () => {
    if (apiKey.trim()) {
      aiCompletionService.setApiKey(apiKey.trim());
      setIsSaved(true);
      setTimeout(() => {
        onOpenChange(false);
      }, 1000);
    }
  };

  const handleRemove = () => {
    aiCompletionService.setApiKey('');
    setApiKey('');
    setIsSaved(false);
    setTestResult(null);
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      console.log('[AI Test] Testing API key...');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: 'Say "API key is working!"' }
          ],
          max_tokens: 10,
        }),
      });

      console.log('[AI Test] Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('[AI Test] Response data:', data);
        setTestResult({
          success: true,
          message: 'API key is valid and working! ✅',
        });
      } else {
        const error = await response.json();
        console.error('[AI Test] Error:', error);
        setTestResult({
          success: false,
          message: `API Error: ${error.error?.message || 'Invalid API key'}`,
        });
      }
    } catch (error) {
      console.error('[AI Test] Exception:', error);
      setTestResult({
        success: false,
        message: `Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Code Suggestions
          </DialogTitle>
          <DialogDescription>
            Configure OpenAI API key to enable AI-powered code completions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertDescription>
              AI suggestions provide intelligent code completions as you type, similar to GitHub Copilot.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Your API key is stored locally and never sent to our servers.
            </p>
          </div>

          <div className="space-y-2">
            <Label>How to get an API key:</Label>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Visit OpenAI Platform</li>
              <li>Sign up or log in to your account</li>
              <li>Navigate to API Keys section</li>
              <li>Create a new API key</li>
              <li>Copy and paste it above</li>
            </ol>
            <Button
              variant="link"
              className="h-auto p-0 text-sm"
              onClick={() => window.open('https://platform.openai.com/api-keys', '_blank')}
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Get API Key from OpenAI
            </Button>
          </div>

          {isSaved && (
            <Alert className="bg-success/10 border-success">
              <Sparkles className="h-4 w-4 text-success" />
              <AlertDescription className="text-success-foreground">
                API key saved! AI suggestions are now enabled.
              </AlertDescription>
            </Alert>
          )}

          {testResult && (
            <Alert className={testResult.success ? 'bg-success/10 border-success' : 'bg-destructive/10 border-destructive'}>
              <Sparkles className={`h-4 w-4 ${testResult.success ? 'text-success' : 'text-destructive'}`} />
              <AlertDescription className={testResult.success ? 'text-success-foreground' : 'text-destructive-foreground'}>
                {testResult.message}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter className="gap-2">
          {apiKey.trim() && (
            <Button 
              variant="secondary" 
              onClick={handleTest}
              disabled={isTesting}
            >
              {isTesting ? 'Testing...' : 'Test API Key'}
            </Button>
          )}
          {aiCompletionService.isConfigured() && (
            <Button variant="outline" onClick={handleRemove}>
              Remove Key
            </Button>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!apiKey.trim()}>
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
