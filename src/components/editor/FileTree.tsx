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

  return (
    <>
      <div className="flex h-full flex-col bg-sidebar">
        <div className="flex items-center justify-between border-b border-sidebar-border p-4">
          <h2 className="text-sm font-semibold text-sidebar-foreground">Projects</h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={onCreateProject}
            className="h-7 w-7 p-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {projects.map((project) => {
              const isExpanded = expandedProjects.has(project.id);
              const projectFiles = files.filter((f) => f.project_id === project.id);
              const isSelected = selectedProjectId === project.id;

              return (
                <div key={project.id} className="mb-1">
                  <div
                    className={cn(
                      'group flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent',
                      isSelected && 'bg-sidebar-accent'
                    )}
                  >
                    <button
                      onClick={() => {
                        toggleProject(project.id);
                        onSelectProject(project);
                      }}
                      className="flex flex-1 items-center gap-2 text-sidebar-foreground"
                    >
                      {isExpanded ? (
                        <FolderOpen className="h-4 w-4 text-sidebar-primary" />
                      ) : (
                        <Folder className="h-4 w-4 text-sidebar-primary" />
                      )}
                      <span className="truncate">{project.name}</span>
                    </button>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCreateFile(project.id);
                        }}
                        className="h-6 w-6 p-0 text-sidebar-foreground hover:bg-sidebar-accent-foreground/10"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteDialog({
                            open: true,
                            type: 'project',
                            id: project.id,
                            name: project.name,
                          });
                        }}
                        className="h-6 w-6 p-0 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {projectFiles.map((file) => (
                        <div
                          key={file.id}
                          className={cn(
                            'group flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent',
                            selectedFileId === file.id && 'bg-sidebar-accent'
                          )}
                        >
                          <button
                            onClick={() => onSelectFile(file)}
                            className="flex flex-1 items-center gap-2 text-sidebar-foreground"
                          >
                            <File className="h-3.5 w-3.5" />
                            <span className="truncate">{file.name}</span>
                          </button>
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
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-sidebar-foreground hover:bg-destructive hover:text-destructive-foreground"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
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
