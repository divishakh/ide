import { useState, useEffect, useCallback, useRef } from 'react';
import { FileTree } from '@/components/editor/FileTree';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { OutputPanel } from '@/components/editor/OutputPanel';
import { Toolbar } from '@/components/editor/Toolbar';
import { projectsApi, filesApi } from '@/services/database';
import type { Project, CodeFile, ConsoleOutput } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export default function IDEPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [code, setCode] = useState('');
  const [outputs, setOutputs] = useState<ConsoleOutput[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [createDialog, setCreateDialog] = useState<{
    open: boolean;
    type: 'project' | 'file';
    projectId?: string;
  }>({ open: false, type: 'project' });
  const [newItemName, setNewItemName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const { toast } = useToast();
  const debouncedCode = useDebounce(code, 1000);
  const hasLoadedRef = useRef(false);

  // Load projects and files
  useEffect(() => {
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    const loadData = async () => {
      try {
        const loadedProjects = await projectsApi.getAll();
        setProjects(loadedProjects);

        if (loadedProjects.length > 0) {
          const firstProject = loadedProjects[0];
          setSelectedProject(firstProject);

          const projectFiles = await filesApi.getByProject(firstProject.id);
          setFiles(projectFiles);

          if (projectFiles.length > 0) {
            const firstFile = projectFiles[0];
            setSelectedFile(firstFile);
            setCode(firstFile.content);
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load projects and files',
          variant: 'destructive',
        });
      }
    };

    loadData();
  }, [toast]);

  // Auto-save when code changes
  useEffect(() => {
    if (!selectedFile || !debouncedCode || debouncedCode === selectedFile.content) return;

    const autoSave = async () => {
      try {
        await filesApi.autoSave(selectedFile.id, debouncedCode);
        setSelectedFile({ ...selectedFile, content: debouncedCode });
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    autoSave();
  }, [debouncedCode, selectedFile]);

  const handleSelectProject = async (project: Project) => {
    setSelectedProject(project);
    try {
      const projectFiles = await filesApi.getByProject(project.id);
      setFiles(projectFiles);
    } catch (error) {
      console.error('Failed to load files:', error);
      toast({
        title: 'Error',
        description: 'Failed to load project files',
        variant: 'destructive',
      });
    }
  };

  const handleSelectFile = (file: CodeFile) => {
    setSelectedFile(file);
    setCode(file.content);
  };

  const handleCreateProject = () => {
    setCreateDialog({ open: true, type: 'project' });
    setNewItemName('');
    setNewProjectDesc('');
  };

  const handleCreateFile = (projectId: string) => {
    setCreateDialog({ open: true, type: 'file', projectId });
    setNewItemName('');
  };

  const handleConfirmCreate = async () => {
    if (!newItemName.trim()) {
      toast({
        title: 'Error',
        description: 'Name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (createDialog.type === 'project') {
        const newProject = await projectsApi.create(newItemName, newProjectDesc || undefined);
        setProjects([newProject, ...projects]);
        setSelectedProject(newProject);
        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
      } else if (createDialog.projectId) {
        const newFile = await filesApi.create(
          createDialog.projectId,
          newItemName.endsWith('.js') ? newItemName : `${newItemName}.js`,
          '// Write your code here\n',
          'javascript'
        );
        setFiles([...files, newFile]);
        setSelectedFile(newFile);
        setCode(newFile.content);
        toast({
          title: 'Success',
          description: 'File created successfully',
        });
      }
      setCreateDialog({ open: false, type: 'project' });
    } catch (error) {
      console.error('Failed to create:', error);
      toast({
        title: 'Error',
        description: `Failed to create ${createDialog.type}`,
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await filesApi.delete(fileId);
      setFiles(files.filter((f) => f.id !== fileId));
      if (selectedFile?.id === fileId) {
        setSelectedFile(null);
        setCode('');
      }
      toast({
        title: 'Success',
        description: 'File deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete file:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete file',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await projectsApi.delete(projectId);
      setProjects(projects.filter((p) => p.id !== projectId));
      if (selectedProject?.id === projectId) {
        setSelectedProject(null);
        setSelectedFile(null);
        setCode('');
        setFiles([]);
      }
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    }
  };

  const handleRunCode = useCallback(() => {
    if (!code.trim()) {
      toast({
        title: 'Warning',
        description: 'No code to run',
        variant: 'destructive',
      });
      return;
    }

    setIsRunning(true);
    setOutputs([]);

    const newOutputs: ConsoleOutput[] = [];

    // Override console methods
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    const addOutput = (type: ConsoleOutput['type'], ...args: any[]) => {
      const message = args
        .map((arg) => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
        .join(' ');

      newOutputs.push({
        type,
        message,
        timestamp: Date.now(),
      });
    };

    console.log = (...args) => {
      originalConsole.log(...args);
      addOutput('log', ...args);
    };
    console.error = (...args) => {
      originalConsole.error(...args);
      addOutput('error', ...args);
    };
    console.warn = (...args) => {
      originalConsole.warn(...args);
      addOutput('warn', ...args);
    };
    console.info = (...args) => {
      originalConsole.info(...args);
      addOutput('info', ...args);
    };

    try {
      // Execute the code
      // eslint-disable-next-line no-eval
      eval(code);
    } catch (error) {
      addOutput('error', error instanceof Error ? error.message : String(error));
    } finally {
      // Restore console methods
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

      setOutputs(newOutputs);
      setIsRunning(false);
    }
  }, [code, toast]);

  const handleClearOutput = () => {
    setOutputs([]);
  };

  const handleSave = async () => {
    if (!selectedFile) {
      toast({
        title: 'Warning',
        description: 'No file selected',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      await filesApi.update(selectedFile.id, { content: code });
      setSelectedFile({ ...selectedFile, content: code });
      toast({
        title: 'Success',
        description: 'File saved successfully',
      });
    } catch (error) {
      console.error('Failed to save:', error);
      toast({
        title: 'Error',
        description: 'Failed to save file',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFormat = () => {
    try {
      // Simple formatting for JavaScript
      const formatted = code
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
      setCode(formatted);
      toast({
        title: 'Success',
        description: 'Code formatted',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to format code',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <Toolbar
        onRun={handleRunCode}
        onClear={handleClearOutput}
        onSave={handleSave}
        onFormat={handleFormat}
        isRunning={isRunning}
        isSaving={isSaving}
        currentFileName={selectedFile?.name}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileTree
            projects={projects}
            files={files}
            selectedFileId={selectedFile?.id || null}
            selectedProjectId={selectedProject?.id || null}
            onSelectFile={handleSelectFile}
            onSelectProject={handleSelectProject}
            onCreateFile={handleCreateFile}
            onCreateProject={handleCreateProject}
            onDeleteFile={handleDeleteFile}
            onDeleteProject={handleDeleteProject}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full bg-background">
            {selectedFile ? (
              <CodeEditor value={code} onChange={setCode} language={selectedFile.language} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg font-semibold">Welcome to Athena's Code Chambers</p>
                  <p className="mt-2 text-sm">Select a file to start coding</p>
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20}>
          <OutputPanel outputs={outputs} onClear={handleClearOutput} />
        </ResizablePanel>
      </ResizablePanelGroup>

      <Dialog open={createDialog.open} onOpenChange={(open) => setCreateDialog({ ...createDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Create New {createDialog.type === 'project' ? 'Project' : 'File'}
            </DialogTitle>
            <DialogDescription>
              Enter a name for your new {createDialog.type}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder={createDialog.type === 'project' ? 'My Project' : 'script.js'}
                onKeyDown={(e) => e.key === 'Enter' && handleConfirmCreate()}
              />
            </div>

            {createDialog.type === 'project' && (
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="A brief description of your project"
                  rows={3}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialog({ ...createDialog, open: false })}>
              Cancel
            </Button>
            <Button onClick={handleConfirmCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
