import { Code2 } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm shadow-organic transition-smooth">
      <div className="flex items-center justify-between px-6 py-3">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-smooth group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent shadow-organic group-hover:shadow-organic-lg transition-smooth">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none gradient-text">Athena's Code Chambers</h1>
            <p className="text-xs text-muted-foreground">Where wisdom meets elegant code</p>
          </div>
        </button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full transition-smooth hover:scale-110 hover:rotate-12"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </Button>
      </div>
    </header>
  );
}
