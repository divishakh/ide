import { useState } from 'react';
import { Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sharingApi } from '@/services/database';
import { useToast } from '@/hooks/use-toast';

interface ShareDialogProps {
  fileId: string;
  fileName: string;
  content: string;
  language: string;
}

export function ShareDialog({ fileId, fileName, content, language }: ShareDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [expiresIn, setExpiresIn] = useState<string>('never');
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      setLoading(true);

      const expiresInDays = expiresIn === 'never' ? undefined : Number.parseInt(expiresIn);

      const snippet = await sharingApi.create(
        fileId,
        fileName,
        content,
        language,
        expiresInDays
      );

      const url = `${window.location.origin}/share/${snippet.share_id}`;
      setShareUrl(url);

      toast({
        title: 'Snippet Shared',
        description: 'Your code snippet has been shared successfully',
      });
    } catch (error) {
      console.error('Error sharing snippet:', error);
      toast({
        title: 'Error',
        description: 'Failed to share snippet',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: 'Copied',
        description: 'Share link copied to clipboard',
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const handleOpenInNewTab = () => {
    window.open(shareUrl, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Code Snippet</DialogTitle>
          <DialogDescription>
            Create a shareable link for this code snippet
          </DialogDescription>
        </DialogHeader>

        {!shareUrl ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="expires">Link Expiration</Label>
              <Select value={expiresIn} onValueChange={setExpiresIn}>
                <SelectTrigger id="expires">
                  <SelectValue placeholder="Select expiration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="1">1 Day</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleShare} disabled={loading} className="w-full">
              {loading ? 'Creating Share Link...' : 'Create Share Link'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="share-url">Share Link</Label>
              <div className="flex gap-2">
                <Input
                  id="share-url"
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  title="Copy link"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleOpenInNewTab}
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {expiresIn === 'never' ? (
                <p>This link will never expire</p>
              ) : (
                <p>This link will expire in {expiresIn} day{expiresIn !== '1' ? 's' : ''}</p>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setShareUrl('');
                setExpiresIn('never');
              }}
              className="w-full"
            >
              Create Another Link
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
