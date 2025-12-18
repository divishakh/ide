import { LogOut, User } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm shadow-organic transition-smooth">
      <div className="flex items-center justify-between px-6 py-3">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 hover:opacity-80 transition-smooth group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden shadow-organic group-hover:shadow-organic-lg transition-smooth">
            <img 
              src="/images/logo-owl.png" 
              alt="Athena's Code Chambers" 
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-none gradient-text">Athena's Code Chambers</h1>
            <p className="text-xs text-muted-foreground">Where wisdom meets elegant code</p>
          </div>
        </button>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full transition-smooth hover:scale-110 hover:rotate-12"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </Button>

          {user && profile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 transition-smooth hover:scale-105">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{profile.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled>
                  <span className="text-xs text-muted-foreground">
                    {profile.role === 'admin' ? '👑 Admin' : '👤 User'}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
