import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Code2, Eye, Edit3, Calendar, AlertCircle, Home, Lock, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sharesApi, projectsApi, filesApi } from '@/services/database';
import type { Share, Project, CodeFile } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import { CodeEditor } from '@/components/editor/CodeEditor';
import { cn } from '@/lib/utils';

export function SharePage() {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [share, setShare] = useState<Share | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedProject = async () => {
      if (!shareId) {
        setError('Invalid share link');
        setLoading(false);
        return;
      }

      try {
        console.log('Loading share with token:', shareId);
        
        // Get share by token
        const shareData = await sharesApi.getByToken(shareId);
        console.log('Share data:', shareData);

        if (!shareData) {
          setError('Share link not found or has expired');
          setLoading(false);
          return;
        }

        setShare(shareData);

        // Load the project
        const projectData = await projectsApi.getById(shareData.project_id);
        console.log('Project data:', projectData);

        if (!projectData) {
          setError('Project not found');
          setLoading(false);
          return;
        }

        setProject(projectData);

        // Load project files
        const filesData = await filesApi.getByProject(shareData.project_id);
        console.log('Files data:', filesData);
        
        setFiles(filesData);
        
        // Select first file by default
        if (filesData.length > 0) {
          setSelectedFile(filesData[0]);
        }
      } catch (err) {
        console.error('Error loading shared project:', err);
        setError('Failed to load shared project');
      } finally {
        setLoading(false);
      }
    };

    loadSharedProject();
  }, [shareId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleFileSelect = (file: CodeFile) => {
    setSelectedFile(file);
  };

  const handleCodeChange = async (newContent: string) => {
    if (!selectedFile || !share || share.permission !== 'edit') {
      return;
    }

    // Update file content
    try {
      await filesApi.update(selectedFile.id, { content: newContent });
      setSelectedFile({ ...selectedFile, content: newContent });
      
      // Update files list
      setFiles(files.map(f => 
        f.id === selectedFile.id ? { ...f, content: newContent } : f
      ));
    } catch (err) {
      console.error('Error updating file:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading shared project...</p>
        </div>
      </div>
    );
  }

  if (error || !share || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertCircle className="h-6 w-6" />
              <CardTitle>Error</CardTitle>
            </div>
            <CardDescription>{error || 'Project not found'}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate('/')} className="w-full">
              <Home className="h-4 w-4 mr-2" />
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isViewOnly = share.permission === 'view';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold">{project.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {project.description || 'Shared from Athena\'s Code Chambers'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isViewOnly ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm">
                  <Eye className="h-4 w-4" />
                  <span>View Only</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 text-primary text-sm">
                  <Edit3 className="h-4 w-4" />
                  <span>Can Edit</span>
                </div>
              )}
              <Button variant="outline" onClick={() => navigate('/ide')}>
                <Home className="h-4 w-4 mr-2" />
                Open My IDE
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Tree Sidebar */}
        <aside className="w-64 border-r bg-card shrink-0 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Project Files
            </h2>
            {files.length === 0 ? (
              <p className="text-sm text-muted-foreground">No files in this project</p>
            ) : (
              <div className="space-y-1">
                {files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => handleFileSelect(file)}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                      selectedFile?.id === file.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <File className="h-4 w-4 shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Editor Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {selectedFile ? (
            <>
              {/* File Header */}
              <div className="border-b bg-card px-4 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{selectedFile.name}</span>
                  {isViewOnly && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Read-only
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedFile.content.split('\n').length} lines
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  value={selectedFile.content}
                  onChange={handleCodeChange}
                  language={selectedFile.language}
                  readOnly={isViewOnly}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Code2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a file to view</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer Info */}
      <footer className="border-t bg-card shrink-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Shared on {formatDate(share.created_at)}</span>
              </div>
              {share.expires_at && (
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <AlertCircle className="h-3 w-3" />
                  <span>Expires on {formatDate(share.expires_at)}</span>
                </div>
              )}
            </div>
            <div>
              <span className="font-semibold text-primary">Athena's Code Chambers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
