import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code2, Sparkles, Zap, Shield, Users, ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LandingPage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [authDialog, setAuthDialog] = useState<'signin' | 'login' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = () => {
    // For now, just navigate to IDE
    // TODO: Implement actual authentication
    navigate('/ide');
  };

  const handleGetStarted = () => {
    navigate('/ide');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Athena's Code Chambers</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setAuthDialog('login')}
              >
                Log In
              </Button>
              <Button
                onClick={() => setAuthDialog('signin')}
                className="rounded-full"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Where wisdom meets elegant code</span>
          </div>
          
          <h1 className="mb-6 text-6xl font-bold tracking-tight">
            Code Smarter,
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
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
              className="rounded-full px-8 text-lg group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setAuthDialog('signin')}
              className="rounded-full px-8 text-lg"
            >
              Sign Up Free
            </Button>
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
            <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Multi-Language Support</h3>
              <p className="text-muted-foreground">
                Write code in 10+ programming languages including Python, JavaScript, C++, and more.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <Sparkles className="h-6 w-6 text-success" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Intelligent Autocomplete</h3>
              <p className="text-muted-foreground">
                Get smart code suggestions and completions powered by Monaco Editor's IntelliSense.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-chart-2/10">
                <Zap className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Instant Execution</h3>
              <p className="text-muted-foreground">
                Run your code instantly with our fast execution engine and see results in real-time.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/10">
                <Shield className="h-6 w-6 text-chart-3" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Version Control</h3>
              <p className="text-muted-foreground">
                Never lose your work with automatic version history and one-click restore.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-chart-4/10">
                <Users className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Sharing</h3>
              <p className="text-muted-foreground">
                Share your code with unique URLs and collaborate with others effortlessly.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group rounded-2xl border bg-card p-8 transition-all hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-chart-5/10">
                <Code2 className="h-6 w-6 text-chart-5" />
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
        <div className="mx-auto max-w-4xl rounded-3xl border bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-4xl font-bold">
            Ready to start coding?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Join thousands of developers using Athena's Code Chambers
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="rounded-full px-8 text-lg"
          >
            Launch IDE
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2025 Athena's Code Chambers. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Dialog */}
      <Dialog open={authDialog !== null} onOpenChange={() => setAuthDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {authDialog === 'signin' ? 'Create an account' : 'Welcome back'}
            </DialogTitle>
            <DialogDescription>
              {authDialog === 'signin'
                ? 'Sign up to save your projects and access them anywhere'
                : 'Log in to access your projects and continue coding'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button onClick={handleAuth} className="w-full">
              {authDialog === 'signin' ? 'Sign Up' : 'Log In'}
            </Button>
            <Button
              variant="ghost"
              onClick={handleGetStarted}
              className="w-full"
            >
              Continue without account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
