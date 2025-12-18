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
- Clear call-to-action buttons for 'Sign Up' and 'Log In'
- Brief overview of key features and benefits
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
- Separate dedicated section for user input\n- Separate dedicated section for displaying code output
- Interactive input area that appears when code execution requires user input
- Clear visual distinction between input and output sections
- Support for multiple input requests during single execution
- Real-time output display as code executes

### 3.5 Code Execution
- Users can run code and view output results in dedicated output section
- Default support for JavaScript (runs directly in the browser)
- Real-time output display separated from input area
\n### 3.6 File Management
- Support for creating, saving, loading, and deleting code files
- Automatic file extension detection and assignment based on language type
- Correct file extensions applied when saving (.js for JavaScript, .py for Python, etc.)
- Simple file list or file tree navigation
- File metadata display (language type, last modified)\n- **Rename functionality for both projects and individual files**
- Right-click or dedicated button to trigger rename action
\n### 3.7 Project Management
- Create new projects via plus button with proper save functionality
- **Fix: Ensure new projects are properly created and saved when clicking plus button**
- **Rename projects** with intuitive interface (double-click or context menu)
- **Download entire project** to local computer as a zip file or folder structure
- **Project dropdown menu**: Clicking the project dropdown displays all existing projects for easy navigation and switching
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
\n### 4.2 Project Workspaces
- Group multiple files into projects instead of working with isolated code files
- Project-level settings and configurations
\n### 4.3 Auto-Save and Version History
- Automatically save user work with proper file extensions
- Maintain simple version checkpoints\n- Auto-save indicator in the interface

### 4.4 Enhanced Theme Switching
- Refined dark mode with carefully balanced contrast and colors
- Light mode option\n- Custom theme support\n- Smooth theme transitions

### 4.5 Shareable Snippet Links
- Generate unique URLs so users can easily share their code with others
- **Two sharing modes**:
  + **Editable Link**: Recipients can edit the code, and changes are visible in the original code (real-time synchronization)
  + **View-Only Link**: Recipients can only view the code without editing permissions\n- Clear UI options to select sharing mode when generating the link

### 4.6 Real-Time Collaboration
- Allow multiple users to edit the same file simultaneously
- Requires authentication and WebSockets/CRDT libraries (such as Yjs)
\n### 4.7 Application Deployment
- Deploy the IDE so it is accessible through a public URL
\n## 5. Design Style

### 5.1 Visual Reference
- Frontend design reference: https://www.figma.com/make/DbGBkS3rAILpaGu4FqR3R7/Online-Coding-Environment?t=CFldPgqM63UilNRX-1
- Additional inspiration from unseen.co for elegant, refined aesthetics
- Reference images: image.png (for home page hero visual) and image-2.png (for website logo)
- **Design must not appear AI-generated; focus on handcrafted, human-centered details**

### 5.2 Typography
- Modern, professional font family with excellent code readability
- Distinct font choices for UI elements vs. code editor
- Consistent font weights and sizes across the interface
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
- Responsive grid system that adapts gracefully\n- **Distinct separation between input section and output section**

### 5.5 Interactive Elements
- Smooth micro-animations on hover and click states
- Polished button styles with subtle effects
- Refined input fields and form controls
- Clear visual feedback for all user actions
- Professional loading states and transitions
- Context menus for rename and download actions
- Dropdown menu for project selection with smooth transitions

### 5.6 Overall Aesthetic
- Premium, handcrafted appearance that avoids AI-generated look
- Attention to detail in spacing, alignment, and visual balance
- Cohesive design system with consistent patterns
- Modern, elegant interface inspired by high-end web applications like unseen.co
- Natural, human-centered design language with organic transitions and thoughtful interactions
- Unique visual personality that feels intentionally designed rather than template-based
- Use of provided logo (image-2.png) and hero image (image.png) to reinforce brand identity and aesthetic appeal