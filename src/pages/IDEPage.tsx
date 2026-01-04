import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/layouts/Header';
import { FileTree } from '@/components/editor/FileTree';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { OutputPanel } from '@/components/editor/OutputPanel';
import { InputPanel } from '@/components/editor/InputPanel';
import { Toolbar } from '@/components/editor/Toolbar';
import { LanguageSelector } from '@/components/editor/LanguageSelector';
import { VersionHistory } from '@/components/editor/VersionHistory';
import { ShareDialog } from '@/components/editor/ShareDialog';
import { ShareProjectDialog } from '@/components/editor/ShareProjectDialog';
import { ProjectSelector } from '@/components/editor/ProjectSelector';
import { AISettingsDialog } from '@/components/editor/AISettingsDialog';
import { projectsApi, filesApi, versionsApi } from '@/services/database';
import { executeCode, getMonacoLanguage } from '@/services/codeExecution';
import type { Project, CodeFile, ConsoleOutput } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
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
  const [renameDialog, setRenameDialog] = useState<{
    open: boolean;
    type: 'project' | 'file';
    id: string;
    currentName: string;
  }>({ open: false, type: 'project', id: '', currentName: '' });
  const [renameName, setRenameName] = useState('');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [aiSettingsOpen, setAiSettingsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [inputHistory, setInputHistory] = useState<string[]>([]);

  const { toast } = useToast();
  const debouncedCode = useDebounce(code, 1000);
  const hasLoadedRef = useRef(false);
  const lastSavedContentRef = useRef('');

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
        // Update file content and language
        await filesApi.update(selectedFile.id, { 
          content: debouncedCode,
          language 
        });
        
        // Create version checkpoint if content changed significantly
        if (lastSavedContentRef.current !== debouncedCode) {
          await versionsApi.create(selectedFile.id, debouncedCode, 'Auto-saved version');
          lastSavedContentRef.current = debouncedCode;
        }
        
        setSelectedFile({ ...selectedFile, content: debouncedCode, language });
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    autoSave();
  }, [debouncedCode, selectedFile, language]);

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
    setLanguage(file.language || 'javascript');
    lastSavedContentRef.current = file.content;
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

  const handleNewFileFromToolbar = () => {
    if (!selectedProject) {
      toast({
        title: 'No Project Selected',
        description: 'Please select or create a project first',
        variant: 'destructive',
      });
      return;
    }
    handleCreateFile(selectedProject.id);
  };

  const handleDownloadFile = () => {
    if (!selectedFile) {
      toast({
        title: 'No File Selected',
        description: 'Please select a file to download',
        variant: 'destructive',
      });
      return;
    }

    try {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Success',
        description: `Downloaded ${selectedFile.name}`,
      });
    } catch (error) {
      console.error('Failed to download file:', error);
      toast({
        title: 'Error',
        description: 'Failed to download file',
        variant: 'destructive',
      });
    }
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
        const newProject = await projectsApi.create(
          newItemName, 
          newProjectDesc || undefined,
          user?.id
        );
        setProjects([newProject, ...projects]);
        setSelectedProject(newProject);
        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
      } else if (createDialog.projectId) {
        // Determine file extension and language
        const fileName = newItemName.includes('.') ? newItemName : `${newItemName}.js`;
        const ext = fileName.split('.').pop() || 'js';
        const langMap: Record<string, string> = {
          js: 'javascript',
          py: 'python',
          cpp: 'cpp',
          c: 'c',
          java: 'java',
          ts: 'typescript',
          go: 'go',
          rs: 'rust',
          rb: 'ruby',
          php: 'php',
        };
        const fileLang = langMap[ext] || 'javascript';
        
        const newFile = await filesApi.create(
          createDialog.projectId,
          fileName,
          '// Write your code here\n',
          fileLang
        );
        setFiles([...files, newFile]);
        setSelectedFile(newFile);
        setCode(newFile.content);
        setLanguage(fileLang);
        toast({
          title: 'Success',
          description: 'File created successfully',
        });
      }
      setCreateDialog({ open: false, type: 'project' });
      setNewItemName('');
      setNewProjectDesc('');
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

  const handleRenameProject = (projectId: string, currentName: string) => {
    setRenameDialog({
      open: true,
      type: 'project',
      id: projectId,
      currentName,
    });
    setRenameName(currentName);
  };

  const handleRenameFile = (fileId: string, currentName: string) => {
    setRenameDialog({
      open: true,
      type: 'file',
      id: fileId,
      currentName,
    });
    setRenameName(currentName);
  };

  const handleConfirmRename = async () => {
    if (!renameName.trim()) {
      toast({
        title: 'Error',
        description: 'Name cannot be empty',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (renameDialog.type === 'project') {
        await projectsApi.update(renameDialog.id, { name: renameName });
        setProjects(projects.map(p => 
          p.id === renameDialog.id ? { ...p, name: renameName } : p
        ));
        if (selectedProject?.id === renameDialog.id) {
          setSelectedProject({ ...selectedProject, name: renameName });
        }
        toast({
          title: 'Success',
          description: 'Project renamed successfully',
        });
      } else {
        await filesApi.update(renameDialog.id, { name: renameName });
        setFiles(files.map(f => 
          f.id === renameDialog.id ? { ...f, name: renameName } : f
        ));
        if (selectedFile?.id === renameDialog.id) {
          setSelectedFile({ ...selectedFile, name: renameName });
        }
        toast({
          title: 'Success',
          description: 'File renamed successfully',
        });
      }
      setRenameDialog({ open: false, type: 'project', id: '', currentName: '' });
    } catch (error) {
      console.error('Failed to rename:', error);
      toast({
        title: 'Error',
        description: `Failed to rename ${renameDialog.type}`,
        variant: 'destructive',
      });
    }
  };

  const handleRunCode = useCallback(async () => {
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

    try {
      // Pass userInput as stdin for languages that support it
      const result = await executeCode(code, language, userInput || undefined);
      
      const newOutputs: ConsoleOutput[] = [];
      
      if (result.stdout) {
        newOutputs.push({
          type: 'log',
          message: result.stdout,
          timestamp: Date.now(),
        });
      }
      
      if (result.stderr) {
        newOutputs.push({
          type: 'error',
          message: result.stderr,
          timestamp: Date.now(),
        });
      }
      
      if (result.executionTime) {
        newOutputs.push({
          type: 'info',
          message: `Execution time: ${result.executionTime}ms`,
          timestamp: Date.now(),
        });
      }
      
      setOutputs(newOutputs);
      
      if (result.exitCode === 0 && newOutputs.length > 0) {
        toast({
          title: 'Success',
          description: 'Code executed successfully',
        });
      } else if (result.exitCode !== 0) {
        toast({
          title: 'Execution Error',
          description: 'Code execution failed',
          variant: 'destructive',
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutputs([
        {
          type: 'error',
          message: errorMessage,
          timestamp: Date.now(),
        },
      ]);
      toast({
        title: 'Error',
        description: 'Failed to execute code',
        variant: 'destructive',
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, language, userInput, toast]);

  const handleClearOutput = () => {
    setOutputs([]);
  };

  const handleSendInput = (input: string) => {
    setInputHistory([...inputHistory, input]);
    setOutputs([...outputs, {
      type: 'info',
      message: `📥 Input: ${input}`,
      timestamp: Date.now(),
    }]);
    // Store input for code execution
    setUserInput(input);
  };

  const handleClearInput = () => {
    setUserInput('');
    setInputHistory([]);
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);
    if (selectedFile) {
      try {
        await filesApi.update(selectedFile.id, { language: newLanguage });
        setSelectedFile({ ...selectedFile, language: newLanguage });
      } catch (error) {
        console.error('Failed to update language:', error);
      }
    }
  };

  const handleRestoreVersion = (content: string) => {
    setCode(content);
    if (selectedFile) {
      lastSavedContentRef.current = content;
    }
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

  const handleNewFile = () => {
    if (!selectedProject) {
      toast({
        title: 'No Project Selected',
        description: 'Please select a project first',
        variant: 'destructive',
      });
      return;
    }
    handleCreateFile(selectedProject.id);
  };

  const handleDownloadProject = () => {
    if (!selectedProject) {
      toast({
        title: 'No Project Selected',
        description: 'Please select a project to download',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Get all files for the current project
      const projectFiles = files.filter(f => f.project_id === selectedProject.id);
      
      if (projectFiles.length === 0) {
        toast({
          title: 'No Files',
          description: 'This project has no files to download',
          variant: 'destructive',
        });
        return;
      }

      // Create a JSON structure with all project files
      const projectData = {
        name: selectedProject.name,
        description: selectedProject.description,
        files: projectFiles.map(file => ({
          name: file.name,
          content: file.content,
          language: file.language,
        })),
        exportedAt: new Date().toISOString(),
      };

      // Create a blob and download
      const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedProject.name.replace(/\s+/g, '_')}_project.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Success',
        description: 'Project downloaded successfully',
      });
    } catch (error) {
      console.error('Failed to download project:', error);
      toast({
        title: 'Error',
        description: 'Failed to download project',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      
      <div className="flex items-center justify-between border-b bg-card/50 backdrop-blur-sm gap-3 px-4 py-2">
        <div className="flex items-center gap-3">
          <ProjectSelector
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
          />
        </div>
        
        <div className="flex-1">
          <Toolbar
            onRun={handleRunCode}
            onClear={handleClearOutput}
            onSave={handleSave}
            onFormat={handleFormat}
            onNewFile={handleNewFile}
            onDownload={handleDownloadProject}
            onShare={selectedProject ? () => setShareDialogOpen(true) : undefined}
            onAISettings={() => setAiSettingsOpen(true)}
            isRunning={isRunning}
            isSaving={isSaving}
            currentFileName={selectedFile?.name}
          />
        </div>
        
        <div className="flex items-center gap-2">
          {selectedFile && (
            <>
              <LanguageSelector
                value={language}
                onChange={handleLanguageChange}
                disabled={!selectedFile}
              />
              <VersionHistory
                fileId={selectedFile.id}
                onRestore={handleRestoreVersion}
              />
              <ShareDialog
                fileId={selectedFile.id}
                fileName={selectedFile.name}
                content={code}
                language={language}
              />
            </>
          )}
        </div>
      </div>

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
            onRenameFile={handleRenameFile}
            onRenameProject={handleRenameProject}
          />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full bg-background">
            {selectedFile ? (
              <CodeEditor 
                value={code} 
                onChange={setCode} 
                language={getMonacoLanguage(language)} 
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground p-8">
                <div className="text-center max-w-md">
                  <div className="mb-6 text-6xl opacity-20">⚡</div>
                  <p className="text-xl font-semibold mb-4">Welcome to Athena's Code Chambers</p>
                  {projects.length === 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">Get started by creating your first project</p>
                      <div className="flex flex-col gap-2 items-center mt-4">
                        <Button onClick={handleCreateProject} className="gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Create Your First Project
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          Or click the + button next to "FILES" in the sidebar
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {selectedProject 
                          ? 'Create a file in your project to start coding'
                          : 'Select a project from the sidebar'}
                      </p>
                      {selectedProject && (
                        <Button onClick={handleNewFile} className="gap-2">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Create New File
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={30} minSize={20}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} minSize={30}>
              <InputPanel 
                onSendInput={handleSendInput}
                onClear={handleClearInput}
                placeholder="Enter input for your code (e.g., for prompt() or stdin)..."
              />
            </ResizablePanel>
            
            <ResizableHandle />
            
            <ResizablePanel defaultSize={50} minSize={30}>
              <OutputPanel outputs={outputs} onClear={handleClearOutput} />
            </ResizablePanel>
          </ResizablePanelGroup>
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

      <Dialog open={renameDialog.open} onOpenChange={(open) => setRenameDialog({ ...renameDialog, open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Rename {renameDialog.type === 'project' ? 'Project' : 'File'}
            </DialogTitle>
            <DialogDescription>
              Enter a new name for "{renameDialog.currentName}".
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rename-name">Name</Label>
              <Input
                id="rename-name"
                value={renameName}
                onChange={(e) => setRenameName(e.target.value)}
                placeholder={`Enter ${renameDialog.type} name`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleConfirmRename();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameDialog({ ...renameDialog, open: false })}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRename}>Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Project Dialog */}
      {selectedProject && (
        <ShareProjectDialog
          projectId={selectedProject.id}
          projectName={selectedProject.name}
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
        />
      )}

      {/* AI Settings Dialog */}
      <AISettingsDialog
        open={aiSettingsOpen}
        onOpenChange={setAiSettingsOpen}
      />
    </div>
  );
}
