# Technology Stack - Athena's Code Chambers

## 📊 Complete Tech Stack Overview

### Frontend Framework & Core Libraries

#### **React 18.3.1**
- **Purpose**: UI library for building component-based interfaces
- **Why**: Industry standard, excellent ecosystem, hooks API, virtual DOM
- **Usage**: All UI components, state management, lifecycle management

#### **TypeScript 5.6.2**
- **Purpose**: Static type checking for JavaScript
- **Why**: Catch errors early, better IDE support, improved code quality
- **Usage**: All source files use TypeScript for type safety

#### **Vite 5.4.11**
- **Purpose**: Build tool and development server
- **Why**: Lightning-fast HMR, optimized builds, modern ESM support
- **Features**:
  - Hot Module Replacement (HMR)
  - Optimized production builds
  - Fast cold start
  - Plugin ecosystem

---

### Styling & UI Components

#### **Tailwind CSS 3.4.15**
- **Purpose**: Utility-first CSS framework
- **Why**: Rapid development, consistent design, small bundle size
- **Configuration**: Custom theme with Athena-inspired colors
- **Features**:
  - Custom color palette (deep blue, gold)
  - Responsive design utilities
  - Dark mode support
  - Custom animations

#### **shadcn/ui**
- **Purpose**: High-quality, accessible React components
- **Why**: Customizable, accessible, beautiful out-of-the-box
- **Components Used**:
  - Button, Dialog, Input, Textarea
  - Select, Command, Popover
  - ScrollArea, Separator, Label
  - Toast notifications
  - Resizable panels
  - And more...

#### **Radix UI**
- **Purpose**: Unstyled, accessible component primitives
- **Why**: Foundation for shadcn/ui, ARIA compliant, keyboard navigation
- **Components**:
  - Dialog, Popover, Select
  - Radio Group, Scroll Area
  - Separator, Slot, Toast

#### **Lucide React 0.468.0**
- **Purpose**: Icon library
- **Why**: Beautiful, consistent, tree-shakeable
- **Usage**: 100+ icons throughout the app

---

### Code Editor

#### **Monaco Editor 0.52.2**
- **Purpose**: Code editor (same as VS Code)
- **Why**: Feature-rich, syntax highlighting, IntelliSense
- **Features**:
  - Syntax highlighting for 40+ languages
  - Auto-completion
  - Code folding
  - Find/replace
  - Multiple cursors
  - Minimap

#### **@monaco-editor/react 4.6.0**
- **Purpose**: React wrapper for Monaco Editor
- **Why**: Easy integration with React lifecycle
- **Usage**: Main code editor component

---

### Backend & Database

#### **Supabase 2.46.2**
- **Purpose**: Backend-as-a-Service (BaaS)
- **Why**: PostgreSQL, auth, real-time, storage in one platform
- **Features Used**:
  - **PostgreSQL Database**: Relational data storage
  - **Authentication**: User sign up/login
  - **Row Level Security (RLS)**: Data access control
  - **Edge Functions**: Serverless functions (future use)
  - **Storage**: File uploads (future use)

#### **PostgreSQL** (via Supabase)
- **Purpose**: Relational database
- **Why**: ACID compliance, powerful queries, JSON support
- **Tables**:
  - `profiles` - User profiles
  - `projects` - Code projects
  - `code_files` - Individual files
  - `file_versions` - Version history
  - `shared_snippets` - Shared code
  - `shares` - Share links

---

### Code Execution

#### **Piston API**
- **Purpose**: Remote code execution engine
- **Why**: Secure sandboxing, 40+ languages, stdin/stdout support
- **Endpoint**: `https://emkc.org/api/v2/piston`
- **Languages Supported**:
  - Python 3.10.0
  - C++ (GCC 10.2.0)
  - Java (JDK 15.0.2)
  - Go 1.16.2
  - Rust 1.68.2
  - Ruby 3.0.1
  - PHP 8.2.3
  - And 30+ more...

#### **Browser JavaScript Execution**
- **Purpose**: Run JavaScript directly in browser
- **Why**: Faster, no API calls, works offline
- **Usage**: Default for JavaScript files

---

### State Management

#### **React Context API**
- **Purpose**: Global state management
- **Why**: Built-in, no extra dependencies, simple API
- **Contexts**:
  - `AuthContext` - User authentication state
  - `ThemeProvider` - Dark/light mode

#### **React Hooks**
- **useState**: Component state
- **useEffect**: Side effects, data fetching
- **useCallback**: Memoized callbacks
- **useMemo**: Memoized values
- **useRef**: DOM references, mutable values
- **useContext**: Access context values

#### **Custom Hooks**
- `useDebounce` - Debounce values (auto-save)
- `useToast` - Toast notifications
- `useAuth` - Authentication state
- `useTheme` - Theme switching

---

### Routing

#### **React Router 7.1.1**
- **Purpose**: Client-side routing
- **Why**: Declarative routing, nested routes, code splitting
- **Routes**:
  - `/` - Home page (public)
  - `/login` - Login/signup (public)
  - `/ide` - Main IDE (protected)
  - `/share/:token` - Shared projects (public)

#### **Route Protection**
- `RouteGuard` component checks authentication
- Redirects to login if not authenticated
- Public routes accessible without login

---

### Utilities & Helpers

#### **clsx 2.1.1**
- **Purpose**: Conditional className construction
- **Why**: Clean, performant, TypeScript support
- **Usage**: Dynamic CSS classes

#### **tailwind-merge 2.5.5**
- **Purpose**: Merge Tailwind classes intelligently
- **Why**: Resolve class conflicts, override utilities
- **Usage**: Combined with clsx in `cn()` utility

#### **class-variance-authority 0.7.1**
- **Purpose**: Create variant-based component APIs
- **Why**: Type-safe variants, consistent API
- **Usage**: shadcn/ui component variants

#### **JSZip 3.10.1**
- **Purpose**: Create ZIP files in browser
- **Why**: Export projects as ZIP
- **Usage**: Project download feature

#### **js-beautify 1.15.1**
- **Purpose**: Code formatting
- **Why**: Beautify JavaScript, HTML, CSS
- **Usage**: Format code button

---

### Development Tools

#### **ESLint 9.15.0**
- **Purpose**: Code linting and quality checks
- **Why**: Catch bugs, enforce style, best practices
- **Plugins**:
  - `@eslint/js` - Core rules
  - `typescript-eslint` - TypeScript rules
  - `eslint-plugin-react-hooks` - React hooks rules
  - `eslint-plugin-react-refresh` - HMR rules

#### **TypeScript ESLint 8.15.0**
- **Purpose**: TypeScript-specific linting
- **Why**: Type-aware linting rules
- **Usage**: Catch type errors, enforce patterns

#### **PostCSS 8.4.49**
- **Purpose**: CSS processing
- **Why**: Transform CSS with plugins
- **Plugins**:
  - `autoprefixer` - Add vendor prefixes
  - `tailwindcss` - Process Tailwind utilities

#### **Autoprefixer 10.4.20**
- **Purpose**: Add CSS vendor prefixes
- **Why**: Cross-browser compatibility
- **Usage**: Automatic in build process

---

### Build & Deployment

#### **Vite Build**
- **Output**: Optimized static files
- **Features**:
  - Code splitting
  - Tree shaking
  - Minification
  - Asset optimization
  - Source maps

#### **Deployment Options**
- **Vercel**: Recommended, zero-config
- **Netlify**: Easy setup, CDN
- **Cloudflare Pages**: Fast, global CDN
- **GitHub Pages**: Free, simple
- **AWS S3 + CloudFront**: Scalable, enterprise

---

### Package Manager

#### **pnpm 8+**
- **Purpose**: Fast, disk-efficient package manager
- **Why**: Faster than npm, saves disk space, strict
- **Features**:
  - Symlinked node_modules
  - Content-addressable storage
  - Strict dependency resolution

---

### Type Definitions

#### **@types/react 18.3.12**
- TypeScript types for React

#### **@types/react-dom 18.3.1**
- TypeScript types for React DOM

#### **@types/node 22.10.1**
- TypeScript types for Node.js APIs

---

## 📦 Complete Dependency List

### Production Dependencies
```json
{
  "@monaco-editor/react": "^4.6.0",
  "@radix-ui/react-*": "Various versions",
  "@supabase/supabase-js": "^2.46.2",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "js-beautify": "^1.15.1",
  "jszip": "^3.10.1",
  "lucide-react": "^0.468.0",
  "monaco-editor": "^0.52.2",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router": "^7.1.1",
  "tailwind-merge": "^2.5.5",
  "tailwindcss-animate": "^1.0.7"
}
```

### Development Dependencies
```json
{
  "@eslint/js": "^9.15.0",
  "@types/node": "^22.10.1",
  "@types/react": "^18.3.12",
  "@types/react-dom": "^18.3.1",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "eslint": "^9.15.0",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.14",
  "globals": "^15.12.0",
  "postcss": "^8.4.49",
  "tailwindcss": "^3.4.15",
  "typescript": "~5.6.2",
  "typescript-eslint": "^8.15.0",
  "vite": "^5.4.11"
}
```

---

## 🏗️ Architecture Patterns

### Component Architecture
- **Atomic Design**: Atoms (buttons) → Molecules (forms) → Organisms (editor)
- **Composition**: Small, reusable components
- **Props Interface**: TypeScript interfaces for all props
- **Separation of Concerns**: UI, logic, data separate

### State Management Pattern
- **Local State**: useState for component-specific state
- **Global State**: Context API for shared state
- **Server State**: Supabase queries, no caching layer
- **Derived State**: useMemo for computed values

### Data Flow
```
User Action → Event Handler → API Call → Supabase
                                          ↓
UI Update ← State Update ← Response ← Database
```

### File Organization
```
src/
├── components/     # Reusable UI components
├── pages/          # Route pages
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── services/       # API services
├── lib/            # Utilities
└── types/          # TypeScript types
```

---

## 🔒 Security Features

### Authentication
- **Supabase Auth**: Secure user authentication
- **Password Hashing**: bcrypt via Supabase
- **JWT Tokens**: Secure session management
- **Row Level Security**: Database-level access control

### Data Protection
- **RLS Policies**: User can only access their data
- **Input Validation**: Client and server-side
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: React escapes by default

### Code Execution Security
- **Sandboxed Execution**: Piston API isolation
- **No Server Access**: Code runs in containers
- **Resource Limits**: CPU, memory, time limits
- **Network Isolation**: No external network access

---

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting**: Lazy loading routes
- **Tree Shaking**: Remove unused code
- **Minification**: Compressed JavaScript/CSS
- **Asset Optimization**: Compressed images
- **Debouncing**: Auto-save with debounce
- **Memoization**: useCallback, useMemo

### Backend
- **Database Indexes**: Fast queries
- **Connection Pooling**: Supabase handles
- **CDN**: Static assets via CDN
- **Caching**: Browser caching headers

---

## 📊 Bundle Size

Approximate production bundle sizes:
- **JavaScript**: ~500KB (gzipped)
- **CSS**: ~50KB (gzipped)
- **Monaco Editor**: ~2MB (lazy loaded)
- **Total Initial Load**: ~550KB

---

## 🔄 Update Strategy

### Dependency Updates
```bash
# Check for updates
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm update <package-name>
```

### Breaking Changes
- Review changelogs before major updates
- Test thoroughly after updates
- Update TypeScript types if needed

---

## 📚 Learning Resources

### React
- [React Docs](https://react.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)

### Supabase
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

**Last Updated**: December 2024
