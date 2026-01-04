# Athena's Code Chambers 🦉

A beautiful, browser-based online code editor and execution environment inspired by the wisdom of Athena. Write, test, and share code with an elegant interface featuring deep blue and gold aesthetics.

![Athena's Code Chambers](public/images/hero.jpg)

## 🌟 Features

### Core Functionality
- **Multi-Language Code Editor** - Write code with syntax highlighting powered by Monaco Editor
- **Code Execution** - Run JavaScript, Python, C++, Java, Go, Rust, and more
- **File Management** - Create, save, rename, and delete code files
- **Project Organization** - Group files into projects with descriptions
- **Version History** - Track changes and restore previous versions
- **Input/Output Panels** - Separate panels for stdin input and execution output

### Advanced Features
- **AI Code Suggestions** - Intelligent code completions powered by OpenAI (optional)
- **User Authentication** - Secure sign up and login system
- **Project Sharing** - Generate shareable links with view-only or edit permissions
- **Code Formatting** - Automatic code beautification
- **Language Detection** - Auto-detect language from file extensions
- **Responsive Design** - Works beautifully on desktop and mobile devices
- **Dark/Light Mode** - Theme switching with persistent preferences
- **Real-time Saving** - Auto-save your work as you type

### User Experience
- **Beautiful UI** - Organic design with smooth transitions and shadows
- **Project Selector** - Quick dropdown to switch between projects
- **Keyboard Shortcuts** - Efficient workflow with keyboard support
- **Download Projects** - Export your entire project as a ZIP file
- **Search Projects** - Find projects quickly with search functionality

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible UI components
- **Monaco Editor** - VS Code's editor (for JavaScript)
- **CodeMirror** - Alternative lightweight editor
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
  - PostgreSQL database
  - Row Level Security (RLS) for data protection
  - Authentication system
  - Real-time subscriptions (not currently used)
  - Edge Functions (for future features)

### Code Execution
- **Piston API** - Secure code execution engine
  - Supports 40+ programming languages
  - Sandboxed execution environment
  - stdin/stdout support
- **Browser Execution** - JavaScript runs directly in browser for speed

### State Management
- **React Context API** - Global state management
- **React Hooks** - useState, useEffect, useCallback, etc.
- **Custom Hooks** - useDebounce, useToast, useAuth

### Routing
- **React Router v6** - Client-side routing
- **Protected Routes** - Authentication-based access control

### Development Tools
- **ESLint** - Code linting and quality checks
- **TypeScript Compiler** - Type checking
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install with: `npm install -g pnpm`
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** - [Sign up](https://supabase.com/) (free tier available)

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
# Clone the repository (replace with your actual repo URL)
git clone <your-repo-url>
cd app-8baywyxqb8xt
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
pnpm install
```

This will install all required dependencies including React, TypeScript, Vite, Tailwind CSS, shadcn/ui components, and more.

### Step 3: Set Up Supabase

#### 3.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/) and sign in
2. Click "New Project"
3. Fill in the details:
   - **Name**: Athena Code Chambers (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for setup to complete

#### 3.2 Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

#### 3.3 Run Database Migrations

You have two options to set up the database:

**Option A: Using Supabase SQL Editor (Recommended)**

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of each migration file in order:
   - First: `supabase/migrations/00001_create_code_files_and_projects.sql`
   - Second: `supabase/migrations/00002_add_versions_and_sharing.sql`
   - Third: `supabase/migrations/00003_add_auth_and_sharing.sql`
5. Click **Run** for each migration
6. Verify tables were created in **Database** → **Tables**

**Option B: Using Supabase CLI**

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref <your-project-ref>

# Push migrations
supabase db push
```

#### 3.4 Verify Database Setup

After running migrations, you should see these tables in your Supabase dashboard:

- `profiles` - User profiles
- `projects` - Code projects
- `code_files` - Individual code files
- `file_versions` - Version history
- `shared_snippets` - Shared code snippets
- `shares` - Project share links

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Create .env file
touch .env
```

Add the following content (replace with your actual Supabase credentials):

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# App Configuration
VITE_APP_ID=athena-code-chambers
VITE_API_ENV=production

# OpenAI Configuration (Optional - for AI code suggestions)
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
```

**Important**: 
- Replace `your-project-id` with your actual Supabase project ID
- Replace `your-anon-key-here` with your actual anon key from Supabase
- OpenAI API key is optional - see [AI Code Suggestions](#-ai-code-suggestions-optional) section
- Never commit the `.env` file to version control (it's already in `.gitignore`)

### Step 5: Configure Authentication

#### 5.1 Disable Email Confirmation (for development)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Click on **Email** provider
3. Scroll down to **Email Confirmation**
4. Toggle OFF "Enable email confirmations"
5. Click **Save**

#### 5.2 Configure Email Templates (optional)

If you want to enable email confirmation later:

1. Go to **Authentication** → **Email Templates**
2. Customize the confirmation email template
3. Add your site URL in **Authentication** → **URL Configuration**

### Step 6: Run the Development Server

```bash
# Start the development server
pnpm run dev
```

The application will open at `http://localhost:5173`

You should see:
- ✅ Vite dev server running
- ✅ Application accessible in browser
- ✅ No console errors

### Step 7: Create Your First Account

1. Open `http://localhost:5173` in your browser
2. Click **"Get Started"** or **"Sign Up"**
3. Fill in the registration form:
   - Username (will be used as email: `username@miaoda.com`)
   - Password (minimum 6 characters)
4. Click **"Sign Up"**
5. You'll be automatically logged in

**Note**: The first user to sign up becomes an admin automatically.

## 🤖 AI Code Suggestions (Optional)

Athena's Code Chambers includes AI-powered code suggestions that provide intelligent completions as you type, similar to GitHub Copilot.

### Quick Setup

1. **Get an OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Sign up or log in
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Configure in the App**:
   - Click the **"AI Settings"** button in the toolbar
   - Paste your OpenAI API key
   - Click **"Save API Key"**

3. **Start Coding**:
   - AI suggestions will appear automatically as you type
   - Look for "AI Suggestion" in the autocomplete menu
   - Press Tab or Enter to accept

### Features

- ✨ Context-aware code completions
- 🌍 Supports 15+ programming languages
- ⚡ Real-time suggestions as you type
- 🔒 API key stored locally (never sent to our servers)
- 💰 Usage-based pricing (~$0.0002-0.0004 per suggestion)

### Alternative Configuration

You can also add the API key to your `.env` file:

```env
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
```

**For detailed documentation**, see [AI_CODE_SUGGESTIONS.md](./AI_CODE_SUGGESTIONS.md)

## 📖 Usage Guide

### Creating Your First Project

1. After logging in, you'll be redirected to the IDE
2. Click the **"+"** button in the top-left (Files panel)
3. Enter a project name and description
4. Click **"Create"**

### Creating Files

1. Select a project from the dropdown at the top
2. Click **"New File"** button in the toolbar
3. Enter filename with extension (e.g., `script.py`, `main.js`)
4. Click **"Create"**
5. The file appears in the left sidebar and opens in the editor

### Writing and Running Code

#### JavaScript Example:
```javascript
console.log("Hello from Athena's Code Chambers!");
const sum = (a, b) => a + b;
console.log("2 + 3 =", sum(2, 3));
```

Click **"Run Code"** button to execute.

#### Python with Input Example:
```python
name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}, you are {age} years old!")
```

**Steps**:
1. Write the code in the editor
2. Go to the **Input panel** (bottom-right)
3. Enter your input (one value per line):
   ```
   Alice
   25
   ```
4. Click **"Send Input"**
5. Click **"Run Code"**
6. See output in the Output panel

### Switching Between Projects

Use the **Project Selector** dropdown at the top of the IDE:
1. Click the dropdown showing current project name
2. Search or scroll to find your project
3. Click to switch

### Sharing Projects

1. Select a project
2. Click the **"Share Project"** button in the toolbar
3. Choose link type:
   - **View-Only**: Recipients can only view the code
   - **Edit**: Recipients can view and edit (changes sync)
4. Click **"Generate Link"**
5. Copy the link and share it

### Formatting Code

1. Write or paste unformatted code
2. Click the **"Format"** button (magic wand icon)
3. Code will be automatically formatted

### Downloading Projects

1. Select a project
2. Click the **"Download"** button (download icon)
3. A ZIP file will be downloaded with all project files

### Version History

1. Select a file
2. Click the **"History"** button (clock icon)
3. View all previous versions
4. Click **"Restore"** to revert to a previous version

## 🎨 Customization

### Typography

The website uses a cohesive Greek-inspired font combination:

- **Body Text**: Philosopher - Ancient Greek-inspired elegant serif
- **Headings**: Cinzel Decorative - Greek/classical decorative font

Both fonts share classical heritage, creating a unified aesthetic that perfectly matches the Athena theme.

See [FONT_IMPLEMENTATION.md](./FONT_IMPLEMENTATION.md) for detailed font documentation.

To change fonts, edit `src/index.css`:

```css
body {
  font-family: 'YourFont', serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'YourHeadingFont', serif;
}
```

### Changing Theme Colors

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 220 70% 50%;        /* Deep blue */
  --secondary: 45 90% 60%;       /* Gold */
  --accent: 220 60% 95%;         /* Light blue */
  /* ... more colors ... */
}

.dark {
  --primary: 220 70% 60%;        /* Lighter blue for dark mode */
  --secondary: 45 90% 65%;       /* Brighter gold */
  /* ... more colors ... */
}
```

### Adding New Languages

Edit `src/services/codeExecution.ts`:

```typescript
export const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', version: '18.15.0' },
  { value: 'python', label: 'Python', version: '3.10.0' },
  // Add your language here
  { value: 'ruby', label: 'Ruby', version: '3.0.1' },
];
```

### Customizing Editor Settings

Edit `src/components/editor/CodeEditor.tsx`:

```typescript
const editorOptions = {
  fontSize: 14,              // Change font size
  tabSize: 2,                // Change tab width
  minimap: { enabled: true }, // Show/hide minimap
  // ... more options
};
```

## 🧪 Testing

### Run Linting

```bash
# Check for code quality issues
pnpm run lint

# Auto-fix issues
pnpm run lint --fix
```

### Manual Testing Checklist

- [ ] User can sign up and log in
- [ ] User can create projects
- [ ] User can create files
- [ ] User can write and edit code
- [ ] JavaScript code executes in browser
- [ ] Python code executes with Piston API
- [ ] Input panel works with Python `input()`
- [ ] Output panel shows results
- [ ] Code formatting works
- [ ] File renaming works
- [ ] File deletion works
- [ ] Project switching works
- [ ] Share links generate correctly
- [ ] Version history saves and restores
- [ ] Theme switching works
- [ ] Project download works

## 🏗️ Building for Production

### Build the Application

```bash
# Create production build
pnpm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
# Preview the production build locally
pnpm run preview
```

### Deploy to Hosting

#### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

#### Option 3: Static Hosting

Upload the contents of `dist/` folder to any static hosting service:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting

**Important**: Set environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_ID`
- `VITE_API_ENV`

## 📁 Project Structure

```
app-8baywyxqb8xt/
├── public/                      # Static assets
│   └── images/                  # Images (logo, hero)
├── src/
│   ├── components/              # React components
│   │   ├── editor/              # Editor-specific components
│   │   │   ├── CodeEditor.tsx   # Monaco editor wrapper
│   │   │   ├── FileTree.tsx     # File/project tree
│   │   │   ├── InputPanel.tsx   # Stdin input panel
│   │   │   ├── OutputPanel.tsx  # Execution output
│   │   │   ├── ProjectSelector.tsx  # Project dropdown
│   │   │   ├── ShareProjectDialog.tsx  # Share dialog
│   │   │   ├── Toolbar.tsx      # Editor toolbar
│   │   │   └── ...              # More editor components
│   │   ├── layouts/             # Layout components
│   │   │   └── Header.tsx       # App header
│   │   └── ui/                  # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── ...              # More UI components
│   ├── contexts/                # React contexts
│   │   └── AuthContext.tsx      # Authentication context
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-debounce.ts      # Debounce hook
│   │   └── use-toast.ts         # Toast notifications
│   ├── lib/                     # Utility libraries
│   │   ├── supabase.ts          # Supabase client
│   │   └── utils.ts             # Helper functions
│   ├── pages/                   # Page components
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── IDEPage.tsx          # Main IDE interface
│   │   ├── LoginPage.tsx        # Login/signup page
│   │   └── SharePage.tsx        # Shared project viewer
│   ├── services/                # API services
│   │   ├── codeExecution.ts     # Code execution logic
│   │   └── database.ts          # Supabase API calls
│   ├── types/                   # TypeScript types
│   │   └── index.ts             # Type definitions
│   ├── App.tsx                  # Root component
│   ├── index.css                # Global styles & theme
│   ├── main.tsx                 # App entry point
│   └── routes.tsx               # Route definitions
├── supabase/
│   └── migrations/              # Database migrations
│       ├── 00001_create_code_files_and_projects.sql
│       ├── 00002_add_versions_and_sharing.sql
│       └── 00003_add_auth_and_sharing.sql
├── .env                         # Environment variables (create this)
├── .env.example                 # Environment template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
├── tailwind.config.mjs          # Tailwind config
├── components.json              # shadcn/ui config
└── README.md                    # This file
```

## 🔧 Troubleshooting

### Issue: "Cannot connect to Supabase"

**Solution**:
1. Check `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
2. Verify Supabase project is active (not paused)
3. Check browser console for specific error messages
4. Ensure you're using `https://` in the URL

### Issue: "Failed to create project/file"

**Solution**:
1. Check if you're logged in (look for user icon in header)
2. Verify database migrations ran successfully
3. Check Supabase dashboard → Database → Tables exist
4. Check RLS policies are enabled
5. Look at browser console for error details

### Issue: "Code execution fails"

**Solution**:
1. **For JavaScript**: Check browser console for errors
2. **For other languages**: 
   - Verify Piston API is accessible
   - Check network tab for API call failures
   - Try a simple "Hello World" program first
3. Check if language is supported in `SUPPORTED_LANGUAGES`

### Issue: "Input not working with Python"

**Solution**:
1. Make sure you enter input in the **Input panel** first
2. Click **"Send Input"** button
3. Then click **"Run Code"**
4. Input should be one value per line for multiple `input()` calls

### Issue: "Share links not generating" or "Buttons not clickable"

**LATEST FIX APPLIED** (Most Aggressive - All Buttons Fixed):
- **ALL buttons** now have 4 event handlers: onClick, onMouseDown, onMouseUp, onPointerDown
- This includes: Generate buttons, Copy buttons, and Open in New Tab buttons
- Extreme z-index values (9999 for dialog, 100 for buttons)
- Explicit pointer-events on all elements
- Modified Dialog component to ensure no blocking
- Updated dark theme to blue-teal palette (#213448, #547792, #94B4C1, #ECEFCA)
- **Share page fully implemented** - links now work correctly

**To test Generate buttons:**
1. **MUST open browser console first** (F12)
2. Click "Generate View-Only Link" or "Generate Edit Link"
3. **You should see 4 console messages**:
   - "POINTER DOWN!"
   - "MOUSE DOWN!"
   - "MOUSE UP!"
   - "CLICKED!"
4. Then see "handleGenerateLink called with permission: view/edit"
5. Button text changes to "Generating..."
6. Link appears after a moment

**To test Copy buttons:**
1. After generating a link, click the copy button (icon next to link)
2. **You should see 4 console messages**:
   - "View Copy button POINTER DOWN!"
   - "View Copy button MOUSE DOWN!"
   - "View Copy button MOUSE UP!"
   - "View Copy button CLICKED!"
3. Icon changes to checkmark (✓)
4. Toast shows "Copied to clipboard!"
5. Press Ctrl+V to paste - link should appear
6. See [COPY_BUTTON_FIX.md](./COPY_BUTTON_FIX.md) for detailed copy button debugging

**To test Share links:**
1. After generating a link, click "Open in New Tab"
2. Or paste the link in a browser
3. The shared project opens with:
   - Project name and description in header
   - File list in left sidebar
   - Code editor in main area
   - "View Only" or "Can Edit" badge showing permissions
4. For view-only links: editor is read-only
5. For edit links: you can edit and save changes
6. See [SHARE_FEATURE_GUIDE.md](./SHARE_FEATURE_GUIDE.md) for complete documentation

**If you see NO console messages**:
- Something is blocking clicks from reaching the button
- Try clicking different parts of the button
- Try disabling browser extensions
- Try incognito/private mode
- Try a different browser
- See [AGGRESSIVE_BUTTON_FIX.md](./AGGRESSIVE_BUTTON_FIX.md) for detailed debugging

**If copy doesn't work but console shows messages**:
- Clipboard API may require HTTPS (localhost should work)
- Check browser permissions for clipboard access
- Try manually selecting text in input field and pressing Ctrl+C

**If share link shows error**:
- Check browser console for error messages
- Verify the share was created successfully
- Check Supabase connection
- Verify RLS policies on shares, projects, and files tables

**Database setup**:
1. Verify `shares` table exists in Supabase
2. Check RLS policies on `shares` table
3. Ensure you're logged in
4. Verify the project belongs to you

### Issue: "Build fails"

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try building again
pnpm run build
```

### Issue: "TypeScript errors"

**Solution**:
```bash
# Check for type errors
pnpm run type-check

# If using VS Code, reload window
# Cmd/Ctrl + Shift + P → "Reload Window"
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run linting**: `pnpm run lint`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new files
- Follow existing component structure
- Use functional components with hooks
- Add proper TypeScript types
- Use Tailwind CSS for styling
- Follow shadcn/ui patterns for UI components
- Add comments for complex logic
- Keep functions small and focused

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Athena** - Greek goddess of wisdom, inspiration for the theme
- **Monaco Editor** - VS Code's powerful editor
- **Piston API** - Secure code execution engine
- **Supabase** - Amazing backend platform
- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Team** - For the amazing library

## 📧 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing GitHub issues
3. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS information

## 🗺️ Roadmap

Future enhancements planned:

- [ ] Real-time collaborative editing
- [ ] Code snippets library
- [ ] Integrated terminal
- [ ] Git integration
- [ ] Plugin system
- [ ] AI code suggestions
- [ ] Mobile app
- [ ] Code playground templates
- [ ] Social features (follow users, like projects)
- [ ] Code execution statistics

## 🌟 Star History

If you find this project useful, please consider giving it a star on GitHub! ⭐

---

**Built with ❤️ and wisdom from Athena**

*May your code be bug-free and your logic be sound!* 🦉
