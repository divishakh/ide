# Task: Build Athena's Code Chambers - Online Code Editor

## Plan
- [x] Step 1: Design color system with deep blue and gold theme (Completed)
  - [x] Update index.css with Athena-inspired color scheme
  - [x] Update tailwind.config.js if needed
- [x] Step 2: Initialize Supabase for file storage (Completed)
  - [x] Create database schema for code files and projects
  - [x] Set up storage policies
  - [x] Insert default welcome project with sample files
- [x] Step 3: Create type definitions (Completed)
  - [x] Define CodeFile, Project, ConsoleOutput types
- [x] Step 4: Implement database API functions (Completed)
  - [x] File CRUD operations
  - [x] Project management
  - [x] Auto-save functionality
- [x] Step 5: Install Monaco Editor (Completed)
  - [x] Add @monaco-editor/react package
- [x] Step 6: Create layout components (Completed)
  - [x] FileTree component (left sidebar)
  - [x] CodeEditor component (center)
  - [x] OutputPanel component (right)
  - [x] Toolbar component (top)
- [x] Step 7: Implement main IDE page (Completed)
  - [x] Three-column layout with resizable panels
  - [x] File management integration
  - [x] Code execution logic
  - [x] Auto-save functionality
  - [x] Create/delete projects and files
- [x] Step 8: Add theme switching (Completed)
  - [x] Light/dark mode toggle
  - [x] useTheme hook
- [x] Step 9: Run lint and fix issues (Completed)
  - [x] Fixed AuthContext import paths
  - [x] All lint checks passed

## Notes
- Using Monaco Editor for professional code editing experience
- Supabase for persistent file storage with projects and code_files tables
- JavaScript execution in browser using eval (with console override for output capture)
- Deep blue (HSL 221 83% 53%) and gold (HSL 43 96% 56%) color scheme
- Three-column resizable layout: FileTree + Editor + Output
- Auto-save with 1-second debounce
- Welcome project with sample JavaScript files included
- All UI text in English as required
