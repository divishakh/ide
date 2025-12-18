# Athena's Code Chambers - User Guide

Welcome to Athena's Code Chambers! This guide will help you get started with your new online code editor.

## Getting Started

### First Launch
When you first open Athena's Code Chambers, you'll see:
- A **Welcome Project** with sample JavaScript files
- The **File Tree** on the left showing your projects
- The **Code Editor** in the center
- The **Output Panel** on the right

### Interface Overview

```
┌─────────────────────────────────────────────────────────────┐
│  Athena's Code Chambers  │  hello.js  │  [Buttons]  │  🌙   │  ← Toolbar
├──────────┬──────────────────────────────┬──────────────────┤
│          │                              │                  │
│ Projects │      Code Editor             │  Console Output  │
│   📁     │                              │                  │
│   ├─ 📄  │  Write your code here...     │  Results here... │
│   └─ 📄  │                              │                  │
│          │                              │                  │
└──────────┴──────────────────────────────┴──────────────────┘
   Left         Center (Resizable)            Right
```

## Basic Workflow

### 1. Select a File
- Click on any file in the **File Tree** (left panel)
- The file will open in the **Code Editor**
- The file name appears in the toolbar

### 2. Write Code
- Type your JavaScript code in the editor
- Enjoy features like:
  - Syntax highlighting
  - Auto-completion (press Ctrl+Space)
  - Auto-indentation
  - Line numbers

### 3. Run Your Code
- Click the **Run Code** button in the toolbar
- Watch the output appear in the **Console Output** panel
- See logs, errors, and warnings with color coding

### 4. Save Your Work
- Your code auto-saves after 1 second of inactivity
- Or click the **Save** button to save immediately
- A "Saving..." indicator shows when saving

## Working with Projects

### Create a New Project
1. Click the **+** button next to "Projects" in the left sidebar
2. Enter a project name (e.g., "My Calculator")
3. Optionally add a description
4. Click **Create**

### Delete a Project
1. Hover over a project name
2. Click the **trash icon** that appears
3. Confirm deletion in the dialog
4. ⚠️ This will delete all files in the project!

## Working with Files

### Create a New File
1. Click on a project to select it
2. Click the **+** button next to the project name
3. Enter a file name (e.g., "calculator.js")
4. Click **Create**
5. The new file opens automatically

### Delete a File
1. Hover over a file name
2. Click the **trash icon** that appears
3. Confirm deletion in the dialog

### Rename a File
Currently, renaming is not supported. To rename:
1. Create a new file with the desired name
2. Copy the content from the old file
3. Delete the old file

## Editor Features

### Code Completion
- Start typing and suggestions appear automatically
- Press **Ctrl+Space** to trigger suggestions manually
- Use arrow keys to navigate, Enter to select

### Code Formatting
- Click the **Format** button in the toolbar
- Basic formatting will be applied to your code

### Minimap
- The minimap on the right side of the editor shows an overview
- Click on it to quickly jump to different parts of your code

### Find and Replace
- Press **Ctrl+F** (or Cmd+F on Mac) to find text
- Press **Ctrl+H** (or Cmd+H on Mac) to find and replace

## Console Output

### Understanding Output Types
- **▶ Log**: Normal console.log() output (white text)
- **❌ Error**: Errors and exceptions (red text)
- **⚠️ Warn**: Warnings (yellow/orange text)
- **ℹ️ Info**: Information messages (blue text)

### Clear Output
- Click the **Clear Output** button in the toolbar
- Or click the trash icon in the output panel header

### Reading Output
- Each output includes a timestamp
- Scroll through the output panel to see all messages
- Objects are displayed as formatted JSON

## Theme Switching

### Toggle Theme
- Click the **sun/moon icon** in the toolbar
- Switch between light and dark modes
- Your preference is saved automatically

### Light Mode
- Bright, clean interface
- Best for well-lit environments
- Easy to read on bright screens

### Dark Mode
- Dark background with bright text
- Reduces eye strain in low light
- Popular among developers

## Keyboard Shortcuts

### Editor Shortcuts
- **Ctrl+S** (Cmd+S): Save file
- **Ctrl+F** (Cmd+F): Find
- **Ctrl+H** (Cmd+H): Replace
- **Ctrl+/** (Cmd+/): Toggle comment
- **Ctrl+Space**: Trigger suggestions
- **Alt+Up/Down**: Move line up/down
- **Ctrl+D**: Select next occurrence
- **Ctrl+Shift+K**: Delete line

### Dialog Shortcuts
- **Enter**: Confirm action
- **Escape**: Cancel/close dialog

## Tips and Tricks

### 1. Use Console Methods
```javascript
console.log("Normal message");
console.error("Error message");
console.warn("Warning message");
console.info("Info message");
```

### 2. Debug with Console
```javascript
const user = { name: "Alice", age: 25 };
console.log("User:", user); // Objects are formatted nicely
```

### 3. Test Functions Quickly
```javascript
function add(a, b) {
  return a + b;
}

console.log("2 + 3 =", add(2, 3));
console.log("10 + 20 =", add(10, 20));
```

### 4. Organize with Projects
- Create separate projects for different topics
- Example: "Learning Basics", "Practice Problems", "My Projects"

### 5. Use Comments
```javascript
// This is a single-line comment

/*
  This is a
  multi-line comment
*/
```

### 6. Resize Panels
- Drag the vertical lines between panels
- Customize your workspace layout
- More space for editor or output as needed

## Common Issues

### Code Doesn't Run
- Check for syntax errors (red underlines in editor)
- Look for error messages in the output panel
- Make sure you clicked the "Run Code" button

### Output Panel is Empty
- Make sure your code includes console.log() statements
- Check if there are any errors preventing execution
- Try clicking "Run Code" again

### File Not Saving
- Check your internet connection
- Look for error messages in the browser console
- Try clicking "Save" manually

### Editor is Slow
- Close unused files
- Reduce the number of projects
- Clear your browser cache

## Example Code

### Hello World
```javascript
console.log("Hello, World!");
console.log("Welcome to Athena's Code Chambers!");
```

### Variables and Math
```javascript
const name = "Alice";
const age = 25;
const nextYear = age + 1;

console.log(`${name} is ${age} years old`);
console.log(`Next year, ${name} will be ${nextYear}`);
```

### Functions
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Alice"));
console.log(greet("Bob"));
```

### Arrays
```javascript
const fruits = ["apple", "banana", "orange"];

console.log("Fruits:", fruits);
console.log("First fruit:", fruits[0]);
console.log("Number of fruits:", fruits.length);

fruits.forEach(fruit => {
  console.log("I like", fruit);
});
```

### Objects
```javascript
const person = {
  name: "Alice",
  age: 25,
  city: "New York"
};

console.log("Person:", person);
console.log("Name:", person.name);
console.log("Age:", person.age);
```

## Best Practices

### 1. Save Regularly
- Even with auto-save, click Save after important changes
- Don't rely solely on auto-save

### 2. Use Meaningful Names
- Projects: "Calculator App" not "Project 1"
- Files: "user-validation.js" not "file1.js"

### 3. Comment Your Code
- Explain complex logic
- Add notes for future reference
- Help others understand your code

### 4. Test Incrementally
- Run your code frequently
- Test small pieces before combining
- Fix errors as they appear

### 5. Organize Your Projects
- Keep related files together
- Delete old/unused projects
- Use descriptive project names

## Getting Help

### In-App Help
- Hover over buttons to see tooltips
- Read error messages carefully
- Check the output panel for clues

### Browser Console
- Press F12 to open browser developer tools
- Check the Console tab for system errors
- Look for red error messages

### Documentation
- Read the README.md file
- Check the FEATURES.md for capabilities
- Review example code in the Welcome Project

## Conclusion

You're now ready to start coding in Athena's Code Chambers! Remember:
- ✨ Your work is automatically saved
- 🎨 Customize your theme for comfort
- 📁 Organize code into projects
- 🚀 Run code instantly to see results

**May Athena's wisdom guide your code!** ✨

---

*For technical issues or questions, refer to the README.md or check the browser console for error messages.*
