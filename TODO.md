# Task: Build Athena's Code Chambers - Online Code Editor

## Plan
- [ ] Step 1: Design color system with deep blue and gold theme
  - [ ] Update index.css with Athena-inspired color scheme
  - [ ] Update tailwind.config.js if needed
- [ ] Step 2: Initialize Supabase for file storage
  - [ ] Create database schema for code files and projects
  - [ ] Set up storage policies
- [ ] Step 3: Create type definitions
  - [ ] Define CodeFile, Project types
- [ ] Step 4: Implement database API functions
  - [ ] File CRUD operations
  - [ ] Project management
- [ ] Step 5: Install Monaco Editor
  - [ ] Add @monaco-editor/react package
- [ ] Step 6: Create layout components
  - [ ] FileTree component (left sidebar)
  - [ ] CodeEditor component (center)
  - [ ] OutputPanel component (right)
  - [ ] Toolbar component (top)
- [ ] Step 7: Implement main IDE page
  - [ ] Three-column layout
  - [ ] File management integration
  - [ ] Code execution logic
  - [ ] Auto-save functionality
- [ ] Step 8: Add theme switching
  - [ ] Light/dark mode toggle
- [ ] Step 9: Run lint and fix issues

## Notes
- Using Monaco Editor for better code editing experience
- Supabase for persistent file storage
- JavaScript execution in browser (eval with safety considerations)
- Deep blue (#1e3a8a, #2563eb) and gold (#f59e0b, #fbbf24) color scheme
- Three-column layout: FileTree + Editor + Output
