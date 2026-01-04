# How to Use AI Code Suggestions - Complete Guide

## Quick Start (5 Minutes)

### Step 1: Configure API Key
1. Click **"AI Settings"** button in the toolbar (has a robot icon 🤖)
2. Paste your OpenAI API key (get from https://platform.openai.com/api-keys)
3. Click **"Test API Key"** to verify it works
4. Click **"Save API Key"**

### Step 2: Open Browser Console
1. Press **F12** (or right-click → Inspect)
2. Click **Console** tab
3. Keep it open to see what's happening

### Step 3: Start Coding
1. Create a new file or open existing one
2. Start typing code
3. Watch the console for [AI] logs
4. Wait 2-3 seconds for suggestions

### Step 4: Use Suggestions
- **Auto-trigger:** Type `.` or `(` or space
- **Manual trigger:** Press **Ctrl+Space** (Cmd+Space on Mac)
- **Accept:** Press **Tab** or **Enter**
- **Dismiss:** Press **Esc**

## What to Expect

### Console Logs
When you type code, you should see:
```
[AI] provideCompletionItems called for: javascript
[AI] Getting completions for: {...}
[AI] Fetching new suggestions from OpenAI...
[AI] OpenAI response status: 200
[AI] Parsed suggestions: 3
[AI] Returning 3 suggestions to Monaco
```

### In the Editor
- Suggestions appear in autocomplete menu
- Look for **✨** icon (AI suggestions)
- Detail shows **🤖 AI Suggestion**
- First suggestion is preselected

## Troubleshooting

### Problem: No suggestions appearing

**Step 1: Test API Key**
- Click "AI Settings"
- Click "Test API Key"
- Should show: "API key is valid and working! ✅"
- If not, check error message and fix

**Step 2: Check Console**
- Press F12
- Look for [AI] logs
- If no logs, refresh page
- If "API key not configured", reconfigure

**Step 3: Manual Trigger**
- Type some code: `function calc`
- Press **Ctrl+Space**
- Wait 2-3 seconds
- Check console for logs

**Step 4: Check Network**
- Open Network tab in DevTools
- Filter by "openai"
- Type code to trigger
- Should see request to api.openai.com
- Check status (should be 200)

### Common Issues

**"API key not configured"**
- Solution: Reconfigure in AI Settings, test, then save

**"OpenAI response status: 401"**
- Solution: Invalid API key, generate new one

**"OpenAI response status: 429"**
- Solution: Rate limit exceeded, wait 5-10 minutes

**"OpenAI response status: 500/503"**
- Solution: OpenAI service issue, try later

**Logs show suggestions but not in editor**
- Solution: Try Ctrl+Space, check Monaco settings

## Tips for Best Results

### 1. Provide Context
```javascript
// ❌ Too little context
function c

// ✅ Good context
function calculateTotalPrice
```

### 2. Use Descriptive Names
```javascript
// ❌ Unclear
const x = 

// ✅ Clear
const userProfile = 
```

### 3. Add Comments
```javascript
// Calculate the sum of two numbers
function 
// AI will suggest: calculateSum(a, b) { return a + b; }
```

### 4. Wait for Suggestions
- Don't type too fast
- Give AI 2-3 seconds to respond
- Use Ctrl+Space if auto-trigger misses

### 5. Review Suggestions
- Always review AI-generated code
- Edit as needed
- Don't blindly accept

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Manual trigger | Ctrl+Space | Cmd+Space |
| Accept suggestion | Tab or Enter | Tab or Enter |
| Dismiss | Esc | Esc |
| Next suggestion | ↓ | ↓ |
| Previous suggestion | ↑ | ↑ |

## Example Usage

### Example 1: Function Completion
```javascript
// Type: function calculate
// AI suggests: function calculateSum(a, b) { return a + b; }
```

### Example 2: Object Creation
```javascript
// Type: const user = {
// AI suggests: name: '', email: '', age: 0, id: ''
```

### Example 3: API Call
```javascript
// Type: fetch('
// AI suggests: fetch('https://api.example.com/data')
```

### Example 4: Array Methods
```javascript
// Type: users.map(
// AI suggests: users.map(user => user.name)
```

## Cost Management

### Typical Costs
- Per suggestion: ~$0.0002-0.0004
- 100 suggestions/day: ~$0.02-0.04/day
- 1000 suggestions/day: ~$0.20-0.40/day

### Tips to Reduce Costs
1. Use caching (automatic)
2. Type slower to avoid excessive triggers
3. Use built-in IntelliSense for simple completions
4. Set OpenAI usage limits in dashboard

## Privacy & Security

### What is Sent to OpenAI
- Last 500 characters of your code
- Programming language
- Cursor position

### What is NOT Sent
- Your full project
- File names
- Personal information
- Other files

### Where API Key is Stored
- Browser localStorage only
- Never sent to our servers
- You control your own OpenAI account

## Documentation

- **Quick Start:** [AI_QUICK_START.md](./AI_QUICK_START.md)
- **Full Guide:** [AI_CODE_SUGGESTIONS.md](./AI_CODE_SUGGESTIONS.md)
- **Troubleshooting:** [AI_TROUBLESHOOTING.md](./AI_TROUBLESHOOTING.md)
- **Debugging:** [AI_DEBUGGING_GUIDE.md](./AI_DEBUGGING_GUIDE.md)
- **Improvements:** [AI_IMPROVEMENTS_SUMMARY.md](./AI_IMPROVEMENTS_SUMMARY.md)

## Support

### Getting Help
1. Check console logs (F12)
2. Test API key in AI Settings
3. Follow troubleshooting guide
4. Check OpenAI status page
5. Report issue on GitHub

### Reporting Issues
Include:
- Browser and version
- Console logs (all [AI] logs)
- Network tab screenshot
- Steps to reproduce
- Test API key result

## Remember

- **Be patient:** AI takes 1-3 seconds
- **Check console:** Always keep F12 open
- **Test API key:** Use the test button
- **Manual trigger:** Ctrl+Space is your friend
- **Review code:** Don't blindly accept suggestions

---

**Ready to code with AI? Open AI Settings and get started!** 🚀
