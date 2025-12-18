import { useState } from 'react';
import { Share2, Copy, Check, Eye, Edit3, Link as LinkIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    console.log('handleGenerateLink called with permission:', perm);
    console.log('User:', user);
    
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
      console.log('Creating share for project:', projectId);

      const share = await sharesApi.create(
        projectId,
        perm,
        user.id
      );

      console.log('Share created:', share);

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
      <DialogContent className="sm:max-w-[550px] z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Project: {projectName}
          </DialogTitle>
          <DialogDescription>
            Generate share links for viewing or collaborative editing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 relative z-10">
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
              <button
                type="button"
                onClick={(e) => {
                  console.log('View-Only button clicked!');
                  e.preventDefault();
                  e.stopPropagation();
                  handleGenerateLink('view');
                }}
                disabled={loading}
                className="w-full px-4 py-2 bg-background border border-input rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="flex items-center justify-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  {loading ? 'Generating...' : 'Generate View-Only Link'}
                </span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={viewShareUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopy(viewShareUrl, 'view');
                    }}
                    className="h-9 w-9 inline-flex items-center justify-center border border-input bg-background rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                    style={{ pointerEvents: 'auto' }}
                    title="Copy to clipboard"
                  >
                    {copiedView ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenLink(viewShareUrl);
                  }}
                  className="w-full h-8 px-3 text-xs rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                  style={{ pointerEvents: 'auto' }}
                >
                  Open in New Tab
                </button>
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
              <button
                type="button"
                onClick={(e) => {
                  console.log('Edit button clicked!');
                  e.preventDefault();
                  e.stopPropagation();
                  handleGenerateLink('edit');
                }}
                disabled={loading}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors shadow"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="flex items-center justify-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  {loading ? 'Generating...' : 'Generate Edit Link'}
                </span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={editShareUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleCopy(editShareUrl, 'edit');
                    }}
                    className="h-9 w-9 inline-flex items-center justify-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 cursor-pointer transition-colors shadow"
                    style={{ pointerEvents: 'auto' }}
                    title="Copy to clipboard"
                  >
                    {copiedEdit ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenLink(editShareUrl);
                  }}
                  className="w-full h-8 px-3 text-xs rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                  style={{ pointerEvents: 'auto' }}
                >
                  Open in New Tab
                </button>
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
