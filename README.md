# Athena's Code Chambers

A browser-based online code editing and execution environment inspired by Athena, the goddess of wisdom. This platform provides users with a streamlined environment for writing, testing, and learning code in multiple programming languages.

## ✨ Features

### Core Features
- **Monaco Editor Integration**: Professional code editor with syntax highlighting, IntelliSense, and code completion
- **Multi-Language Support**: Execute code in 10 programming languages (JavaScript, Python, C++, C, Java, TypeScript, Go, Rust, Ruby, PHP)
- **Real-time Code Execution**: Run code directly in browser (JavaScript) or via Piston API (other languages)
- **File Management**: Create, save, load, and delete code files with ease
- **Project Workspaces**: Organize multiple files into projects for better code organization
- **Console Output**: View logs, errors, warnings, and execution results in a dedicated output panel

### Advanced Features
- **Version History**: Automatic version control with restore capability - never lose your work
- **Code Sharing**: Generate unique shareable links with optional expiration (1, 7, 30 days, or never)
- **Auto-Save**: Automatically saves your work with a 1-second debounce
- **Theme Switching**: Toggle between light and dark modes for comfortable coding
- **Resizable Panels**: Customize your workspace layout with resizable panels
- **Code Formatting**: Format your code with a single click
- **Persistent Storage**: All projects, files, and versions stored in Supabase database

### Language Support 🌐
- **JavaScript** (v18.15.0) - Browser execution (instant)
- **Python** (v3.10.0) - Piston API
- **C++** (v10.2.0) - Piston API
- **C** (v10.2.0) - Piston API
- **Java** (v15.0.2) - Piston API
- **TypeScript** (v5.0.3) - Piston API
- **Go** (v1.16.2) - Piston API
- **Rust** (v1.68.2) - Piston API
- **Ruby** (v3.0.1) - Piston API
- **PHP** (v8.2.3) - Piston API

## 🎨 Design

The application features a beautiful color scheme inspired by Athena:
- **Deep Blue** (HSL 221 83% 53%): Representing wisdom and depth
- **Gold** (HSL 43 96% 56%): Symbolizing divinity and excellence
- **Light Gray Background**: Enhancing code readability
- **Three-Column Layout**: File tree (left) + Editor (center) + Output (right)

## 🚀 Getting Started

### Prerequisites

```bash
# Node.js ≥ 20
# npm ≥ 10
# Example:
node -v   # v20.18.3
npm -v    # 10.8.2
```

### Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment variables**:
   The `.env` file is already configured with Supabase credentials.
   No additional setup needed!

4. **Start the development server**:
   ```bash
   npm run dev -- --host 127.0.0.1
   ```
   Or if the above fails:
   ```bash
   npx vite --host 127.0.0.1
   ```

5. **Open your browser** and navigate to the provided local URL

## 📁 Project Structure

```
├── README.md                 # Documentation
├── components.json           # Component library configuration
├── index.html               # Entry HTML file
├── package.json             # Package management
├── postcss.config.js        # PostCSS configuration
├── public                   # Static resources
│   ├── favicon.png
│   └── images
├── src                      # Source code
│   ├── App.tsx             # Main app component
│   ├── components          # React components
│   │   ├── editor          # Editor-specific components
│   │   │   ├── CodeEditor.tsx
│   │   │   ├── FileTree.tsx
│   │   │   ├── OutputPanel.tsx
│   │   │   └── Toolbar.tsx
│   │   └── ui              # shadcn/ui components
│   ├── contexts            # React contexts
│   ├── hooks               # Custom hooks
│   │   └── useTheme.ts
│   ├── index.css           # Global styles
│   ├── lib                 # Utility libraries
│   │   ├── supabase.ts     # Supabase client
│   │   └── utils.ts
│   ├── main.tsx            # Entry point
│   ├── pages               # Page components
│   │   └── IDEPage.tsx     # Main IDE page
│   ├── routes.tsx          # Routing configuration
│   ├── services            # API services
│   │   └── database.ts     # Database operations
│   └── types               # TypeScript types
│       └── index.ts
├── supabase                # Supabase configuration
│   └── migrations          # Database migrations
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Code Editor**: Monaco Editor (same editor as VS Code)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with custom Athena-inspired theme

## 💡 Usage

### Creating a New Project
1. Click the **+** button next to "Projects" in the left sidebar
2. Enter a project name and optional description
3. Click "Create"

### Creating a New File
1. Select a project from the file tree
2. Click the **+** button next to the project name
3. Enter a file name with extension (e.g., `script.py`, `main.cpp`, `app.js`)
4. Language is automatically detected from file extension
5. Click "Create"

### Writing and Running Code
1. Select a file from the file tree
2. Choose programming language from the dropdown (if needed)
3. Write your code in the Monaco Editor
4. Click the **Run Code** button in the toolbar
5. View the output in the right panel

### Using Version History 📚
1. Open any file
2. Click the **History** button in the toolbar
3. Browse all previous versions with timestamps
4. Click the restore icon (↻) to revert to any version
5. Versions are automatically created when you save

### Sharing Code 🔗
1. Open the file you want to share
2. Click the **Share** button in the toolbar
3. Select expiration period:
   - **Never**: Link works forever
   - **1 Day**: Expires in 24 hours
   - **7 Days**: Expires in 1 week
   - **30 Days**: Expires in 1 month
4. Click "Create Share Link"
5. Copy the link and share with others
6. Recipients can view code without login

### Multi-Language Support 🌐
1. Create file with appropriate extension:
   - `.js` → JavaScript
   - `.py` → Python
   - `.cpp` → C++
   - `.c` → C
   - `.java` → Java
   - `.ts` → TypeScript
   - `.go` → Go
   - `.rs` → Rust
   - `.rb` → Ruby
   - `.php` → PHP
2. Or manually select language from dropdown
3. Code execution adapts automatically

### Theme Switching
- Click the sun/moon icon in the toolbar to toggle between light and dark modes

### Auto-Save
- Your code is automatically saved 1 second after you stop typing
- Versions are created automatically on each save
- You can also manually save by clicking the **Save** button

## 🗄️ Database Schema

### Projects Table
```sql
- id: UUID (Primary Key)
- name: TEXT
- description: TEXT
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### Code Files Table
```sql
- id: UUID (Primary Key)
- project_id: UUID (Foreign Key)
- name: TEXT
- content: TEXT
- language: TEXT (default: 'javascript')
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

### File Versions Table (New! 📚)
```sql
- id: UUID (Primary Key)
- file_id: UUID (Foreign Key)
- content: TEXT
- version_number: INTEGER
- description: TEXT
- created_at: TIMESTAMPTZ
```

### Shared Snippets Table (New! 🔗)
```sql
- id: UUID (Primary Key)
- share_id: TEXT (Unique, 10 characters)
- file_id: UUID (Foreign Key)
- title: TEXT
- content: TEXT
- language: TEXT
- created_at: TIMESTAMPTZ
- expires_at: TIMESTAMPTZ (nullable)
- view_count: INTEGER (default: 0)
```

## 🔒 Security

- Row Level Security (RLS) is enabled on all tables
- Public access policies are configured for ease of use (no authentication required)
- Code execution is sandboxed:
  - JavaScript: Browser sandbox (no file system access)
  - Other languages: Piston API isolated containers

## 🎓 Winter Assignment 3 Features

This project includes advanced features implemented for Winter Assignment 3:

### ✅ Implemented Features

1. **Multiple Language Support** (10 languages)
   - JavaScript, Python, C++, C, Java, TypeScript, Go, Rust, Ruby, PHP
   - Piston API integration for backend execution
   - Automatic language detection from file extensions

2. **Version History & Auto-Save**
   - Automatic version checkpoints on every save
   - Browse and restore previous versions
   - Never lose your work

3. **Shareable Snippet Links**
   - Generate unique URLs for code sharing
   - Optional expiration (1, 7, 30 days, or never)
   - View counter and public read-only access

### ⏸️ Deferred Features

4. **Real-Time Collaboration**
   - Deferred due to complexity (requires WebSockets, CRDT, authentication)
   - Recommended as Phase 2 enhancement

### 📚 Additional Documentation

- **WINTER_ASSIGNMENT_FEATURES.md**: Detailed feature documentation with examples
- **TODO_WINTER_ASSIGNMENT.md**: Implementation progress and technical details
- **DEPLOYMENT_CHECKLIST.md**: Production deployment guide

## 🚀 Deployment

The application is production-ready and can be deployed to:

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**Important**: Set environment variables in your hosting platform:
- `VITE_APP_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

See `DEPLOYMENT_CHECKLIST.md` for detailed instructions.

## 📝 License

Copyright 2025 Athena's Code Chambers

## 🤝 Contributing

This is a Miaoda-generated project. For more information about Miaoda, visit:
- Documentation: [https://intl.cloud.baidu.com/en/doc/MIAODA/](https://intl.cloud.baidu.com/en/doc/MIAODA/)

## 🆘 Support

For issues or questions:
1. Check the Miaoda documentation
2. Review the code comments and type definitions
3. Inspect the browser console for error messages
4. See WINTER_ASSIGNMENT_FEATURES.md for feature-specific help

---

**May Athena's wisdom guide your code!** ✨
