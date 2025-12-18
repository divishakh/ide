# Athena's Code Chambers Requirements Document

## 1. Website Name
Athena's Code Chambers\n
## 2. Website Description
A browser-based online code editing and execution environment that provides users with a streamlined platform for writing, testing, and learning code. Inspired by Athena, the goddess of wisdom, it aims to help users clearly construct and refine their code logic with an elegant and intuitive interface.

## 3. Core Features
\n### 3.1 Landing Page
- A welcoming home page that introduces the platform\n- Use the provided image (image.png) as the hero visual on the home page to create an aesthetic, immersive experience
- Adjust the color tones of image.png dynamically to match light mode and dark mode themes
- Display the provided logo (image-2.png) prominently in the header or branding area
- Clear call-to-action buttons for 'Sign Up' and 'Log In'\n- Brief overview of key features and benefits
- Smooth transition to the main editor interface after authentication

### 3.2 User Authentication
- **Mandatory Sign Up/Log In before starting work**: Users must authenticate before accessing the editor
- Sign Up functionality for new users to create accounts
- Log In functionality for existing users\n- Secure authentication flow\n- Session management to maintain user state
\n### 3.3 Code Editor
- Support for code input, editing, and advanced syntax highlighting
- Implemented using Monaco Editor for VS Code-like experience
- Real-time code auto-completion suggestions while typing
- IntelliSense-style code hints and parameter information
- Snippet suggestions based on language context
\n### 3.4 Input and Output Handling
- **Separate dedicated input section**: When code execution requires user input (e.g., Python's input() or m=input()), a distinct input column/area appears
- **Interactive input area**: Automatically displays when code requests input during execution
- **Separate dedicated output section**: Displays code execution results independently from input area
- **Clear visual distinction**: Input and output sections are visually separated with clear boundaries
- **Support for multiple input requests**: Handle multiple input() calls during single execution
- **Real-time output display**: Show output as code executes, separate from input interactions
- **Input persistence**: Input values remain visible during execution for reference

### 3.5 Code Execution
- Users can run code and view output results in dedicated output section
- Default support for JavaScript (runs directly in the browser)
- Real-time output display separated from input area
- Automatic detection of input requirements and display of input section when needed
\n### 3.6 File Management
- Support for creating, saving, loading, and deleting code files
- **New file visibility**: After clicking 'New File' and creating it, the file immediately appears in the left side file list
- **Automatic file list update**: File tree/list updates in real-time when new files are created
- Automatic file extension detection and assignment based on language type
- Correct file extensions applied when saving (.js for JavaScript, .py for Python, etc.)
- Simple file list or file tree navigation
- File metadata display (language type, last modified)\n- **Rename functionality for both projects and individual files**
- Right-click or dedicated button to trigger rename action
\n### 3.7 Project Management
- **Create new projects button**: Dedicated 'Create Project' or plus button with proper save functionality
- **Project selection interface**: Clear, accessible button or dropdown to choose which project to work on
- **Project switcher**: Prominent UI element (button/dropdown) showing current project name and allowing easy switching between projects
- **Fix: Ensure new projects are properly created and saved when clicking plus button**
- **Rename projects** with intuitive interface (double-click or context menu)
- **Download entire project** to local computer as a zip file or folder structure
- **Project list display**: Clicking the project selector displays all existing projects for easy navigation and switching
- Project list with clear visual indicators\n- Project switching without losing unsaved work

### 3.8 Editor Controls
- Clear editor content\n- Reset output area
- Code formatting functionality\n- New File creation
- Format code button
- Clear Output button
\n## 4. Extended Features

### 4.1 Multiple Language Support
- Add languages like Python or C++ using a backend runner or an execution API
- Language-specific auto-completion and syntax validation
- Proper input handling for languages that require user input (Python input(), C++ cin, etc.)
\n### 4.2 Project Workspaces
- Group multiple files into projects instead of working with isolated code files
- Project-level settings and configurations
\n### 4.3 Auto-Save and Version History
- Automatically save user work with proper file extensions
- Maintain simple version checkpoints\n- Auto-save indicator in the interface

### 4.4 Enhanced Theme Switching
- Refined dark mode with carefully balanced contrast and colors
- Light mode option\n- Custom theme support
- Smooth theme transitions

### 4.5 Shareable Snippet Links
- **Generate unique URLs** so users can easily share their code with others
- **Share button prominently displayed** in the toolbar or file menu
- **Two sharing modes**:
  + **Editable Link**: Recipients can edit the code, and changes are visible in the original code (real-time synchronization)
  + **View-Only Link**: Recipients can only view the code without editing permissions
- **Clear UI options** to select sharing mode when generating the link (modal dialog or dropdown)
- **Copy link to clipboard** functionality with visual confirmation
- **Link generation logic**: Create unique shareable URLs that persist code state and project context
- **Access control**: Implement proper permissions handling for editable vs view-only links

### 4.6 Real-Time Collaboration
- Allow multiple users to edit the same file simultaneously
- Requires authentication and WebSockets/CRDT libraries (such as Yjs)\n\n### 4.7 Application Deployment
- Deploy the IDE so it is accessible through a public URL
\n## 5. Design Style

### 5.1 Visual Reference
- Frontend design reference: https://www.figma.com/make/DbGBkS3rAILpaGu4FqR3R7/Online-Coding-Environment?t=CFldPgqM63UilNRX-1\n- Additional inspiration from unseen.co for elegant, refined aesthetics
- Reference images: image.png (for home page hero visual) and image-2.png (for website logo)
- **Design must not appear AI-generated; focus on handcrafted, human-centered details**

### 5.2 Typography
- Modern, professional font family with excellent code readability
- Distinct font choices for UI elements vs. code editor\n- Consistent font weights and sizes across the interface
- Optimized line-height and letter-spacing for extended coding sessions

### 5.3 Color Scheme
\n#### Light Mode Palette
- Primary colors: #FCF8F8, #FBEFEF, #F9DFDF, #F5AFAF
- Soft, warm tones with gentle contrast for comfortable daytime use
- Use lighter shades for backgrounds and progressively darker shades for interactive elements
- Maintain readability with sufficient contrast for text and code
- Adjust the color tones of image.png to harmonize with the light mode palette

#### Dark Mode Palette
- Primary colors: #360185, #8F0177, #DE1A58, #F4B342
- Rich, vibrant gradient from deep purples to warm accent tones
- Deep purple (#360185) for primary backgrounds\n- Magenta and pink tones (#8F0177, #DE1A58) for interactive elements and highlights
- Golden accent (#F4B342) for status indicators and call-to-action elements
- Balanced contrast to reduce eye strain during extended coding sessions
- Adjust the color tones of image.png to harmonize with the dark mode palette

### 5.4 Layout and Composition
- Clean, spacious layout with clear visual hierarchy
- Generous whitespace and breathing room between elements
- Smooth rounded corners on cards, buttons, and panels
- Elegant shadows and depth layers for dimensional feel
- Responsive grid system that adapts gracefully\n- **Distinct three-column layout**: Left sidebar for files, center for code editor, right/bottom for input and output sections
- **Clear separation between input section and output section** with visual dividers
- **Prominent project selector button** in the top toolbar or sidebar header
\n### 5.5 Interactive Elements
- Smooth micro-animations on hover and click states
- Polished button styles with subtle effects
- Refined input fields and form controls
- Clear visual feedback for all user actions
- Professional loading states and transitions
- Context menus for rename and download actions
- Dropdown menu for project selection with smooth transitions
- **Interactive input area** that slides in or expands when code requests input
- **Real-time file list updates** with smooth animations when new files are added
- **Share button with modal dialog** for link generation and mode selection
\n### 5.6 Overall Aesthetic
- Premium, handcrafted appearance that avoids AI-generated look
- Attention to detail in spacing, alignment, and visual balance
- Cohesive design system with consistent patterns\n- Modern, elegant interface inspired by high-end web applications like unseen.co
- Natural, human-centered design language with organic transitions and thoughtful interactions
- Unique visual personality that feels intentionally designed rather than template-based
- Use of provided logo (image-2.png) and hero image (image.png) to reinforce brand identity and aesthetic appeal

## 6. Technology Stack

### 6.1 Frontend
- **Framework**: React.js (v18+) with TypeScript for type safety and component-based architecture
- **Code Editor**: Monaco Editor (the same editor that powers VS Code)\n- **State Management**: Redux Toolkit or Zustand for global state management\n- **Styling**: Tailwind CSS for utility-first styling with custom theme configuration
- **Routing**: React Router (v6+) for navigation between landing page and editor
- **UI Components**: Radix UI or Headless UI for accessible, unstyled component primitives
- **Animations**: Framer Motion for smooth transitions and micro-interactions

### 6.2 Backend
- **Runtime**: Node.js (v18+ LTS)\n- **Framework**: Express.js or Fastify for RESTful API endpoints
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **Database**: PostgreSQL for user accounts, projects, and file metadata
- **ORM**: Prisma or TypeORM for database operations
- **Code Execution**: Docker containers or isolated sandboxes for secure multi-language code execution
- **File Storage**: AWS S3 or local file system for storing project files
\n### 6.3 Real-Time Features
- **WebSockets**: Socket.io for real-time collaboration and live updates
- **CRDT Library**: Yjs for conflict-free replicated data types in collaborative editing
\n### 6.4 Sharing & Collaboration
- **Link Generation**: UUID or nanoid for unique shareable link identifiers
- **Access Control**: Database-backed permissions system for editable vs view-only links
- **Link Storage**: Store link metadata (code snapshot, permissions, expiration) in database
\n### 6.5 Deployment
- **Frontend Hosting**: Vercel, Netlify, or AWS Amplify for static site deployment
- **Backend Hosting**: AWS EC2,DigitalOcean, or Railway for Node.js server\n- **Database Hosting**: AWS RDS, Supabase, or managed PostgreSQL service
- **CDN**: Cloudflare or AWS CloudFront for asset delivery
- **Domain & SSL**: Custom domain with Let's Encrypt SSL certificate

### 6.6 Development Tools
- **Package Manager**: npm or pnpm\n- **Build Tool**: Vite for fast development and optimized production builds
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier for consistent code style
- **Version Control**: Git with GitHub/GitLab for source code management

## 7. Implementation Guide (README.md)

### 7.1 Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or pnpm package manager
- PostgreSQL (v14 or higher)
- Git
- Docker (optional, for code execution sandboxing)

### 7.2 Project Setup
\n#### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd athenas-code-chambers
```\n
#### Step 2: Install Dependencies
```bash
# Install frontend dependencies
cd frontend\nnpm install

# Install backend dependencies
cd ../backend
npm install
```

#### Step 3: Environment Configuration
Create `.env` files in both frontend and backend directories:

**Frontend `.env`:**
```\nVITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

**Backend `.env`:**
```
DATABASE_URL=postgresql://username:password@localhost:5432/athena_code\nJWT_SECRET=your-secret-key-here
PORT=3001
NODE_ENV=development
```

#### Step 4: Database Setup
```bash
cd backend
\n# Run database migrations
npx prisma migrate dev
\n# Generate Prisma client
npx prisma generate
```

### 7.3 Running the Application
\n#### Development Mode
Open two terminal windows:
\n**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**\n```bash
cd frontend\nnpm run dev
```

The application will be available at:\n- Frontend: http://localhost:5173
- Backend API: http://localhost:3001\n
### 7.4 Building for Production

#### Frontend Build
```bash
cd frontend
npm run build
```
This creates an optimized production build in the `dist` folder.

#### Backend Build
```bash
cd backend
npm run build\n```

### 7.5 Deployment Instructions

#### Frontend Deployment (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings:\n   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy\n
#### Backend Deployment (Railway/DigitalOcean)
1. Create a new project on your hosting platform
2. Connect your GitHub repository
3. Configure environment variables
4. Set start command: `npm start`
5. Deploy

#### Database Deployment\n1. Create a PostgreSQL database on your hosting provider
2. Update `DATABASE_URL` in backend environment variables
3. Run migrations: `npx prisma migrate deploy`
\n### 7.6 Key Features Implementation Notes

#### Monaco Editor Integration
```javascript
import * as monaco from 'monaco-editor';

const editor = monaco.editor.create(document.getElementById('editor'), {
  value: 'console.log(\"Hello World\");',
  language: 'javascript',
  theme: 'vs-dark'\n});
```
\n#### Shareable Links Implementation
1. Generate unique link ID when user clicks share button
2. Store code snapshot and permissions in database
3. Create shareable URL: `https://yourdomain.com/share/{linkId}`
4. Implement access control middleware to check permissions
5. Load code from database when accessing shared link

#### File Management
- Store file metadata in PostgreSQL
- Store file content in S3 or local filesystem
- Implement real-time file tree updates using WebSockets
\n### 7.7 Troubleshooting

**Monaco Editor not loading:**
- Ensure Monaco Editor assets are properly configured in Vite
- Check browser console for CORS errors
\n**Database connection errors:**
- Verify PostgreSQL is running\n- Check DATABASE_URL format and credentials

**WebSocket connection issues:**
- Ensure backend WebSocket server is running
- Check firewall settings

### 7.8 Additional Resources
- Monaco Editor Documentation: https://microsoft.github.io/monaco-editor/
- React Documentation: https://react.dev/
- Prisma Documentation: https://www.prisma.io/docs\n- Socket.io Documentation: https://socket.io/docs/
\n### 7.9 Project Structure
```
athenas-code-chambers/\n├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── server.ts
│   ├── prisma/
│   └── package.json
└── README.md
```\n
## 8. Reference Images
- Hero image for landing page: image.png
- Website logo: image-2.png