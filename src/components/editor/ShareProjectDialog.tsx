import { useState } from 'react';
import { Share2, Copy, Check, Eye, Edit3, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { sharesApi } from '@/services/database';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface ShareProjectDialogProps {
  projectId: string;
  projectName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareProjectDialog({ 
  projectId, 
  projectName, 
  open, 
  onOpenChange 
}: ShareProjectDialogProps) {
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState<'view' | 'edit'>('view');
  const [viewShareUrl, setViewShareUrl] = useState('');
  const [editShareUrl, setEditShareUrl] = useState('');
  const [copiedView, setCopiedView] = useState(false);
  const [copiedEdit, setCopiedEdit] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleGenerateLink = async (perm: 'view' | 'edit') => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to share projects',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);

      const share = await sharesApi.create(
        projectId,
        perm,
        user.id
      );

      const url = `${window.location.origin}/share/${share.share_token}`;
      
      if (perm === 'view') {
        setViewShareUrl(url);
      } else {
        setEditShareUrl(url);
      }

      toast({
        title: 'Success',
        description: `${perm === 'view' ? 'View-only' : 'Edit'} link generated successfully`,
      });
    } catch (error) {
      console.error('Error generating share link:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate share link',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (url: string, type: 'view' | 'edit') => {
    try {
      await navigator.clipboard.writeText(url);
      if (type === 'view') {
        setCopiedView(true);
        setTimeout(() => setCopiedView(false), 2000);
      } else {
        setCopiedEdit(true);
        setTimeout(() => setCopiedEdit(false), 2000);
      }
      toast({
        title: 'Copied!',
        description: 'Share link copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Project: {projectName}
          </DialogTitle>
          <DialogDescription>
            Generate share links for viewing or collaborative editing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* View-Only Link */}
          <div className="space-y-3 rounded-lg border p-4 organic-border">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <Label className="text-base font-semibold">View-Only Link</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Recipients can view the project but cannot make changes
            </p>
            
            {!viewShareUrl ? (
              <Button
                onClick={() => handleGenerateLink('view')}
                disabled={loading}
                className="w-full"
                variant="outline"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Generate View-Only Link
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={viewShareUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleCopy(viewShareUrl, 'view')}
                  >
                    {copiedView ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleOpenLink(viewShareUrl)}
                  className="w-full"
                >
                  Open in New Tab
                </Button>
              </div>
            )}
          </div>

          {/* Edit Link */}
          <div className="space-y-3 rounded-lg border p-4 organic-border bg-accent/5">
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-primary" />
              <Label className="text-base font-semibold">Edit Link</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Recipients can view and edit the project. Changes sync to the original.
            </p>
            
            {!editShareUrl ? (
              <Button
                onClick={() => handleGenerateLink('edit')}
                disabled={loading}
                className="w-full"
              >
                <LinkIcon className="mr-2 h-4 w-4" />
                Generate Edit Link
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={editShareUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="icon"
                    onClick={() => handleCopy(editShareUrl, 'edit')}
                  >
                    {copiedEdit ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleOpenLink(editShareUrl)}
                  className="w-full"
                >
                  Open in New Tab
                </Button>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            <p className="font-medium mb-1">💡 Tip:</p>
            <p>Share links never expire and remain active until you deactivate them.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
