import { useState, useEffect } from 'react';
import { History, RotateCcw, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { versionsApi } from '@/services/database';
import type { FileVersion } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface VersionHistoryProps {
  fileId: string;
  onRestore: (content: string) => void;
}

export function VersionHistory({ fileId, onRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const loadVersions = async () => {
    try {
      setLoading(true);
      const data = await versionsApi.getByFile(fileId);
      setVersions(data);
    } catch (error) {
      console.error('Error loading versions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load version history',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVersions();
  }, [fileId]);

  const handleRestore = (version: FileVersion) => {
    onRestore(version.content);
    toast({
      title: 'Version Restored',
      description: `Restored to version ${version.version_number}`,
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await versionsApi.delete(deleteId);
      setVersions(versions.filter((v) => v.id !== deleteId));
      toast({
        title: 'Version Deleted',
        description: 'Version has been removed from history',
      });
    } catch (error) {
      console.error('Error deleting version:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete version',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" onClick={loadVersions}>
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Version History</SheetTitle>
            <SheetDescription>
              View and restore previous versions of this file
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-120px)] mt-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-muted-foreground">Loading versions...</div>
              </div>
            ) : versions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No version history yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Versions are created when you save your file
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {versions.map((version) => (
                  <div
                    key={version.id}
                    className="border rounded-lg p-4 hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            Version {version.version_number}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(version.created_at)}
                          </span>
                        </div>
                        {version.description && (
                          <p className="text-sm text-muted-foreground">
                            {version.description}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {version.content.split('\n').length} lines
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRestore(version)}
                          title="Restore this version"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(version.id)}
                          title="Delete this version"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Version</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this version? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
