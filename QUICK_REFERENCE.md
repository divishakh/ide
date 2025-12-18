# Quick Reference Card - Athena's Code Chambers

## 🚀 New Features (Winter Assignment 3)

### 1. Multi-Language Support (10 Languages)

| Language | Extension | Execution |
|----------|-----------|-----------|
| JavaScript | `.js` | Browser (instant) |
| Python | `.py` | Piston API |
| C++ | `.cpp` | Piston API |
| C | `.c` | Piston API |
| Java | `.java` | Piston API |
| TypeScript | `.ts` | Piston API |
| Go | `.go` | Piston API |
| Rust | `.rs` | Piston API |
| Ruby | `.rb` | Piston API |
| PHP | `.php` | Piston API |

**Usage:**
- Create file with extension → Language auto-detected
- Or use language dropdown in toolbar
- Click "Run" → Code executes in appropriate runtime

---

### 2. Version History

**Features:**
- ✅ Auto-save every 1 second
- ✅ Automatic version creation
- ✅ Browse all versions
- ✅ One-click restore
- ✅ Version metadata (number, timestamp, lines)

**Buttons:**
- 📚 **History** - View all versions
- ↻ **Restore** - Load previous version
- 🗑️ **Delete** - Remove version

**Workflow:**
1. Edit code
2. Wait 1 second (auto-save)
3. Version created automatically
4. Click "History" to view
5. Click restore icon to revert

---

### 3. Shareable Links

**Features:**
- ✅ Unique URLs for sharing
- ✅ Expiration options (Never, 1/7/30 days)
- ✅ View counter
- ✅ Public read-only access
- ✅ Beautiful syntax highlighting

**Buttons:**
- 🔗 **Share** - Create share link
- 📋 **Copy Link** - Copy to clipboard
- 🔗 **Open in New Tab** - Preview share

**Workflow:**
1. Open file to share
2. Click "Share" button
3. Select expiration
4. Click "Create Share Link"
5. Copy and share URL

---

## 🎨 UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Toolbar: [Run] [Clear] [Save] [Format] [Theme]             │
│          [Language ▼] [History] [Share]                     │
├──────────┬────────────────────────────┬─────────────────────┤
│          │                            │                     │
│  File    │      Code Editor           │   Console Output    │
│  Tree    │   (Monaco Editor)          │   (Logs/Errors)     │
│          │                            │                     │
│ Projects │   - Syntax highlighting    │   - Execution time  │
│  Files   │   - Auto-complete          │   - Error messages  │
│          │   - Line numbers           │   - Clear button    │
│          │                            │                     │
└──────────┴────────────────────────────┴─────────────────────┘
```

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Run Code | `Ctrl/Cmd + Enter` |
| Save | `Ctrl/Cmd + S` |
| Format | `Ctrl/Cmd + Shift + F` |
| Find | `Ctrl/Cmd + F` |
| Replace | `Ctrl/Cmd + H` |
| Comment | `Ctrl/Cmd + /` |

---

## 📊 Database Schema

### Tables

1. **projects**
   - id, name, description, timestamps

2. **code_files**
   - id, project_id, name, content, language, timestamps

3. **file_versions** (NEW)
   - id, file_id, content, version_number, description, timestamp

4. **shared_snippets** (NEW)
   - id, share_id, file_id, title, content, language, created_at, expires_at, view_count

---

## 🔧 Common Tasks

### Create New Project
```
1. Click "+" next to "Projects"
2. Enter name and description
3. Click "Create"
```

### Create New File
```
1. Select project
2. Click "+" next to project name
3. Enter filename with extension (e.g., script.py)
4. Click "Create"
```

### Run Code
```
1. Select file
2. Write code
3. Click "Run Code" button
4. View output in console
```

### View Version History
```
1. Open file
2. Click "History" button
3. Browse versions
4. Click restore icon to revert
```

### Share Code
```
1. Open file
2. Click "Share" button
3. Select expiration
4. Click "Create Share Link"
5. Copy link
```

---

## 🐛 Troubleshooting

### Code Not Running
- ✅ Check syntax errors
- ✅ Verify internet connection (for non-JS)
- ✅ Check console for errors

### Version Not Created
- ✅ Wait 1 second after editing
- ✅ Ensure file is selected
- ✅ Check auto-save indicator

### Share Link Not Working
- ✅ Verify link copied correctly
- ✅ Check expiration date
- ✅ Try incognito mode

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `WINTER_ASSIGNMENT_FEATURES.md` | Detailed feature docs |
| `FEATURE_SHOWCASE.md` | Demo guide |
| `IMPLEMENTATION_SUMMARY.md` | Technical summary |
| `DEPLOYMENT_CHECKLIST.md` | Deployment guide |
| `QUICK_REFERENCE.md` | This file |

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
# Set env vars in dashboard
vercel --prod
```

### Netlify
```bash
npm i -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables
```
VITE_APP_ID=app-8baywyxqb8xt
VITE_SUPABASE_URL=https://pihrysloyuwrhvazfqkt.supabase.co
VITE_SUPABASE_ANON_KEY=[your-key]
```

---

## 💡 Tips & Tricks

### Performance
- JavaScript executes instantly (browser)
- Other languages take 1-3 seconds (API call)
- Use JavaScript for quick tests

### Version Control
- Versions created automatically
- No manual save needed
- Restore anytime without losing current work

### Sharing
- "Never" expiration for permanent links
- Short expiration for temporary shares
- View count tracks popularity

### Multi-Language
- File extension determines language
- Manual override available
- Syntax highlighting adapts automatically

---

## 🎯 Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| Multi-Language | ✅ Complete | 10 languages |
| Version History | ✅ Complete | Auto-save + restore |
| Shareable Links | ✅ Complete | Expiration + tracking |
| Real-Time Collab | ⏸️ Deferred | Future enhancement |
| Deployment | ⏳ Ready | User action required |

---

## 📞 Support

**Issues?**
1. Check documentation
2. Review console errors
3. Verify environment variables
4. Test with simple examples

**Resources:**
- Miaoda Docs: https://intl.cloud.baidu.com/en/doc/MIAODA/
- Supabase Docs: https://supabase.com/docs
- Piston API: https://github.com/engineer-man/piston

---

## ✨ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev -- --host 127.0.0.1

# 3. Open browser
# Navigate to provided URL

# 4. Create project
# Click "+" next to "Projects"

# 5. Create file
# Click "+" next to project name

# 6. Write code
# Select language, write code, click "Run"

# 7. Share
# Click "Share" button, copy link
```

---

**May Athena's wisdom guide your code!** ✨

---

*Last Updated: December 18, 2025*  
*Version: 2.0 (Winter Assignment 3)*
