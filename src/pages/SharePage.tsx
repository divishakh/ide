import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Code2, Eye, Calendar, AlertCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { sharingApi } from '@/services/database';
import { getMonacoLanguage, getLanguageDisplayName } from '@/services/codeExecution';
import type { SharedSnippet } from '@/types';
import { useTheme } from '@/hooks/useTheme';

export function SharePage() {
  const { shareId } = useParams<{ shareId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [snippet, setSnippet] = useState<SharedSnippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSnippet = async () => {
      if (!shareId) {
        setError('Invalid share link');
        setLoading(false);
        return;
      }

      try {
        const data = await sharingApi.getByShareId(shareId);

        if (!data) {
          setError('Snippet not found');
          setLoading(false);
          return;
        }

        if (sharingApi.isExpired(data)) {
          setError('This snippet has expired');
          setLoading(false);
          return;
        }

        setSnippet(data);
      } catch (err) {
        console.error('Error loading snippet:', err);
        setError('Failed to load snippet');
      } finally {
        setLoading(false);
      }
    };

    loadSnippet();
  }, [shareId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading snippet...</p>
        </div>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertCircle className="h-6 w-6" />
              <CardTitle>Error</CardTitle>
            </div>
            <CardDescription>{error || 'Snippet not found'}</CardDescription>
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Code2 className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <p className="text-sm text-muted-foreground">
                  Shared from Athena's Code Chambers
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />
              Open IDE
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Metadata */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {getLanguageDisplayName(snippet.language)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Shared on {formatDate(snippet.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>{snippet.view_count} views</span>
                </div>
                {snippet.expires_at && (
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                    <AlertCircle className="h-4 w-4" />
                    <span>Expires on {formatDate(snippet.expires_at)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Code Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Code</CardTitle>
              <CardDescription>
                {snippet.content.split('\n').length} lines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Editor
                  height="600px"
                  language={getMonacoLanguage(snippet.language)}
                  value={snippet.content}
                  theme={theme === 'dark' ? 'vs-dark' : 'light'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    lineNumbers: 'on',
                    renderWhitespace: 'selection',
                    automaticLayout: true,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Powered by{' '}
            <span className="font-semibold text-primary">Athena's Code Chambers</span>
          </p>
          <p className="mt-1">A browser-based code editor for learning and sharing</p>
        </div>
      </footer>
    </div>
  );
}
