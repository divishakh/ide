import { useState } from 'react';
import { File, Folder, Plus, Trash2, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import type { Project, CodeFile } from '@/types';
import { cn } from '@/lib/utils';

interface FileTreeProps {
  projects: Project[];
  files: CodeFile[];
  selectedFileId: string | null;
  selectedProjectId: string | null;
  onSelectFile: (file: CodeFile) => void;
  onSelectProject: (project: Project) => void;
  onCreateFile: (projectId: string) => void;
  onCreateProject: () => void;
  onDeleteFile: (fileId: string) => void;
  onDeleteProject: (projectId: string) => void;
}

export function FileTree({
  projects,
  files,
  selectedFileId,
  selectedProjectId,
  onSelectFile,
  onSelectProject,
  onCreateFile,
  onCreateProject,
  onDeleteFile,
  onDeleteProject,
}: FileTreeProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set(selectedProjectId ? [selectedProjectId] : [])
  );
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    type: 'file' | 'project';
    id: string;
    name: string;
  } | null>(null);

  const toggleProject = (projectId: string) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
    }
    setExpandedProjects(newExpanded);
  };

  const handleDelete = () => {
    if (!deleteDialog) return;
    
    if (deleteDialog.type === 'file') {
      onDeleteFile(deleteDialog.id);
    } else {
      onDeleteProject(deleteDialog.id);
    }
    setDeleteDialog(null);
  };

  const totalFiles = files.length;

  return (
    <>
      <div className="flex h-full flex-col bg-sidebar-background">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wide flex items-center gap-2">
            <Folder className="h-4 w-4" />
            FILES
          </h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onCreateProject}
            className="h-8 w-8 p-0 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 pb-4">
            {projects.map((project) => {
              const isExpanded = expandedProjects.has(project.id);
              const projectFiles = files.filter((f) => f.project_id === project.id);

              return (
                <div key={project.id}>
                  {projectFiles.map((file) => (
                    <div
                      key={file.id}
                      className={cn(
                        'group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm cursor-pointer transition-all',
                        selectedFileId === file.id 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                          : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'
                      )}
                      onClick={() => {
                        onSelectFile(file);
                        onSelectProject(project);
                        if (!expandedProjects.has(project.id)) {
                          toggleProject(project.id);
                        }
                      }}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <File className="h-4 w-4 text-primary" />
                        </div>
                        <span className="truncate font-medium">{file.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteDialog({
                            open: true,
                            type: 'file',
                            id: file.id,
                            name: file.name,
                          });
                        }}
                        className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-destructive-foreground shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="border-t border-sidebar-border px-4 py-3">
          <p className="text-xs text-muted-foreground">
            {totalFiles} file{totalFiles !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <AlertDialog open={deleteDialog?.open} onOpenChange={(open) => !open && setDeleteDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deleteDialog?.type === 'project' ? 'the project' : 'the file'}{' '}
              <span className="font-semibold">{deleteDialog?.name}</span>
              {deleteDialog?.type === 'project' && ' and all its files'}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
