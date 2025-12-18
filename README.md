# Athena's Code Chambers

A browser-based online code editing and execution environment inspired by Athena, the goddess of wisdom. This platform provides users with a streamlined environment for writing, testing, and learning JavaScript code.

## ✨ Features

### Core Features
- **Monaco Editor Integration**: Professional code editor with syntax highlighting, IntelliSense, and code completion
- **Real-time Code Execution**: Run JavaScript code directly in the browser and see instant results
- **File Management**: Create, save, load, and delete code files with ease
- **Project Workspaces**: Organize multiple files into projects for better code organization
- **Console Output**: View logs, errors, warnings, and info messages in a dedicated output panel

### Advanced Features
- **Auto-Save**: Automatically saves your work with a 1-second debounce
- **Theme Switching**: Toggle between light and dark modes for comfortable coding
- **Resizable Panels**: Customize your workspace layout with resizable panels
- **Code Formatting**: Format your code with a single click
- **Persistent Storage**: All projects and files are stored in Supabase for data persistence

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
3. Enter a file name (e.g., `script.js`)
4. Click "Create"

### Writing and Running Code
1. Select a file from the file tree
2. Write your JavaScript code in the Monaco Editor
3. Click the **Run Code** button in the toolbar
4. View the output in the right panel

### Theme Switching
- Click the sun/moon icon in the toolbar to toggle between light and dark modes

### Auto-Save
- Your code is automatically saved 1 second after you stop typing
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
- language: TEXT
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

## 🔒 Security

- Row Level Security (RLS) is enabled on all tables
- Public access policies are configured for ease of use (no authentication required)
- Code execution is sandboxed within the browser environment

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

---

**May Athena's wisdom guide your code!** ✨
