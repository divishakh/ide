import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code2, Sparkles, Zap, Shield, Users, ArrowRight, LogIn } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/contexts/AuthContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate('/ide');
    } else {
      navigate('/login');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50 shadow-organic">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden">
                <img 
                  src="/images/logo-owl.png" 
                  alt="Athena's Code Chambers" 
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold gradient-text">Athena's Code Chambers</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="rounded-full transition-smooth hover:scale-110"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user.email?.split('@')[0]}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                  <Button
                    onClick={() => navigate('/ide')}
                    className="rounded-full shadow-organic hover:shadow-organic-lg transition-smooth hover:scale-105"
                  >
                    Go to IDE
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                  <Button
                    onClick={() => navigate('/login')}
                    className="rounded-full shadow-organic hover:shadow-organic-lg transition-smooth hover:scale-105"
                  >
                    Sign Up Free
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section className="relative container mx-auto px-6 py-24 overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 dark:opacity-30">
          <img 
            src="/images/hero-chamber.png" 
            alt="Athena's Code Chamber" 
            className="w-full max-w-4xl object-contain"
            style={{
              filter: theme === 'dark' 
                ? 'brightness(0.8) saturate(1.2) hue-rotate(10deg)' 
                : 'brightness(1.1) saturate(0.9) hue-rotate(-10deg)'
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm shadow-organic">
            <Sparkles className="h-4 w-4" />
            <span>Where wisdom meets elegant code</span>
          </div>
          
          <h1 className="mb-6 text-6xl font-bold tracking-tight">
            Code Smarter,
            <br />
            <span className="gradient-text">
              Build Faster
            </span>
          </h1>
          
          <p className="mb-8 text-xl text-muted-foreground">
            A powerful online IDE with multi-language support, intelligent code completion,
            and seamless collaboration. Start coding in seconds.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={handleGetStarted}
              className="rounded-full px-8 text-lg group shadow-organic hover:shadow-organic-lg transition-smooth hover:scale-105"
            >
              {user ? 'Launch IDE' : 'Get Started'}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            {!user && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="rounded-full px-8 text-lg organic-border transition-smooth hover:scale-105"
              >
                Sign Up Free
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">
            Everything you need to code
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-2xl border bg-card p-8 transition-smooth hover:shadow-organic organic-border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Multi-Language Support</h3>
              <p className="text-muted-foreground">
                Write code in JavaScript and more languages with syntax highlighting and IntelliSense.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border bg-card p-8 transition-smooth hover:shadow-organic organic-border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Intelligent Autocomplete</h3>
              <p className="text-muted-foreground">
                Get smart code suggestions and completions powered by Monaco Editor's IntelliSense.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border bg-card p-8 transition-smooth hover:shadow-organic organic-border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Instant Execution</h3>
              <p className="text-muted-foreground">
                Run your code instantly with our fast execution engine and see results in real-time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border bg-card p-8 transition-smooth hover:shadow-organic organic-border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your code is stored securely with authentication and row-level security policies.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl border bg-card p-8 transition-smooth hover:shadow-organic organic-border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Share your code with unique URLs for viewing or collaborative editing.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-2xl border bg-card p-8 transition-smooth hover:shadow-organic organic-border">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Code2 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Beautiful Interface</h3>
              <p className="text-muted-foreground">
                Enjoy a clean, modern interface with light and dark modes for comfortable coding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-12 text-center backdrop-blur-sm shadow-organic organic-border">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to start coding?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Join developers using Athena's Code Chambers to build amazing projects
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="rounded-full px-8 text-lg shadow-organic hover:shadow-organic-lg transition-smooth hover:scale-105"
          >
            {user ? 'Launch IDE' : 'Get Started Free'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="/images/logo-owl.png" 
                alt="Logo" 
                className="h-8 w-8 object-contain"
              />
              <p className="text-sm text-muted-foreground">
                © 2025 Athena's Code Chambers. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
