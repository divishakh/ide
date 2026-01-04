# AI Code Suggestions - Troubleshooting Steps

## Problem: API Key Configured But No Suggestions Appearing

You've successfully saved your OpenAI API key, but code suggestions are not showing up. Here's how to fix it:

## Step-by-Step Debugging

### 1. Test Your API Key

**In the AI Settings Dialog:**
1. Click "AI Settings" button in toolbar
2. Your API key should be visible (hidden by default)
3. Click **"Test API Key"** button
4. Wait for the test result

**Expected Result:**
- ✅ "API key is valid and working!"

**If test fails:**
- Check the error message
- Common errors:
  - "Invalid API key" → Re-enter your key
  - "Rate limit exceeded" → Wait a few minutes
  - "Network error" → Check internet connection

### 2. Open Browser Console

**How to open:**
- Press **F12** (all browsers)
- Or right-click → Inspect → Console tab

**Keep console open while testing**

### 3. Type Code and Watch Console

**Test code to type:**
```javascript
function calc
```

**Expected console logs:**
```
[AI] Registering completion provider for language: javascript
[AI] AI completion providers registered successfully
[AI] provideCompletionItems called for: javascript at position: {lineNumber: 1, column: 14}
[AI] Code length: 13 Position: {line: 1, column: 14}
[AI] Getting completions for: {language: 'javascript', position: {...}, codeLength: 13}
[AI] Fetching new suggestions from OpenAI...
[AI] Sending request to OpenAI with context length: 13
[AI] OpenAI response status: 200
[AI] OpenAI response data: {choices: [...]}
[AI] Parsed suggestions: [{text: "ulate(a, b) { return a + b; }", ...}]
[AI] Got completions: 3
[AI] Created suggestion: ✨ ulate(a, b) { return a + b; }
[AI] Returning 3 suggestions to Monaco
```

### 4. Identify the Problem

#### Problem A: No "[AI] Registering" logs
**Cause:** AI providers not registered
**Fix:**
1. Refresh the page (Ctrl+R or F5)
2. Check for JavaScript errors in console
3. Verify Monaco Editor loaded

#### Problem B: "[AI] API key not configured"
**Cause:** API key not saved properly
**Fix:**
1. Open AI Settings
2. Re-enter API key
3. Click "Save API Key"
4. Test API key
5. Refresh page

#### Problem C: "[AI] provideCompletionItems" never called
**Cause:** Monaco completion not triggering
**Fix:**
1. Try manual trigger: **Ctrl+Space** (Cmd+Space on Mac)
2. Type trigger characters: `.` or `(` or space
3. Wait 2-3 seconds
4. Check if built-in IntelliSense works

#### Problem D: "OpenAI response status: 401"
**Cause:** Invalid or expired API key
**Fix:**
1. Go to https://platform.openai.com/api-keys
2. Generate new API key
3. Update in AI Settings
4. Test API key

#### Problem E: "OpenAI response status: 429"
**Cause:** Rate limit exceeded
**Fix:**
1. Wait 5-10 minutes
2. Check OpenAI usage dashboard
3. Upgrade plan if needed

#### Problem F: "OpenAI response status: 500/503"
**Cause:** OpenAI service issue
**Fix:**
1. Check https://status.openai.com/
2. Try again later
3. Not your fault!

#### Problem G: Suggestions received but not displayed
**Cause:** Monaco display issue
**Fix:**
1. Check console for "Returning X suggestions"
2. Try Ctrl+Space to manually trigger
3. Check Monaco editor settings
4. Verify other completions work

### 5. Manual Trigger Test

**Instead of waiting for auto-trigger:**
1. Type some code: `function calc`
2. Press **Ctrl+Space** (Windows/Linux) or **Cmd+Space** (Mac)
3. Wait 2-3 seconds
4. Check console logs
5. Look for suggestions with ✨ icon

### 6. Check Network Tab

**In DevTools:**
1. Click **Network** tab
2. Filter by "openai"
3. Type code to trigger suggestion
4. Look for request to `api.openai.com`
5. Check request status and response

**Expected:**
- Request URL: `https://api.openai.com/v1/chat/completions`
- Method: POST
- Status: 200 OK
- Response: JSON with choices array

### 7. Verify API Key in Storage

**In Console, run:**
```javascript
localStorage.getItem('openai_api_key')
```

**Expected:**
- Should return your API key starting with `sk-`
- If null or empty, reconfigure in AI Settings

### 8. Clear Cache and Retry

**If nothing works:**
1. Open Console
2. Run: `localStorage.clear()`
3. Refresh page (Ctrl+R)
4. Reconfigure API key
5. Test again

## Common Issues and Solutions

### Issue: "Suggestions are too slow"
**Normal:** 1-3 seconds response time
**If slower:**
- Check internet speed
- Check OpenAI API status
- Try during off-peak hours

### Issue: "Wrong suggestions"
**Cause:** AI misunderstood context
**Fix:**
- Provide more context (type more code)
- Use descriptive variable names
- Add comments to guide AI

### Issue: "Suggestions don't match my code style"
**Limitation:** AI uses general patterns
**Workaround:**
- Edit suggestions after accepting
- Provide style examples in comments
- Future: Custom prompts (planned)

### Issue: "Too many API calls / high cost"
**Fix:**
- Caching reduces duplicate calls
- Type slower to avoid triggers
- Use built-in IntelliSense for simple completions
- Set OpenAI usage limits

## Quick Fixes Checklist

Try these in order:

1. ✅ Click "Test API Key" in AI Settings
2. ✅ Open browser console (F12)
3. ✅ Type code and check for [AI] logs
4. ✅ Try manual trigger (Ctrl+Space)
5. ✅ Check Network tab for OpenAI requests
6. ✅ Verify API key in localStorage
7. ✅ Refresh page
8. ✅ Clear cache and reconfigure
9. ✅ Generate new API key
10. ✅ Check OpenAI status page

## Still Not Working?

### Collect Debug Information

1. **Browser:** Chrome/Firefox/Safari + version
2. **Console logs:** Copy all [AI] logs
3. **Network:** Screenshot of OpenAI request/response
4. **API key status:** Active/inactive, usage limits
5. **Test result:** What "Test API Key" shows

### Report Issue

Create a GitHub issue with:
- Debug information above
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if helpful

## Alternative: Use Built-in IntelliSense

While debugging, Monaco Editor has excellent built-in completions:
- Type and wait for suggestions
- Press Ctrl+Space for manual trigger
- Works offline, no API key needed
- Good for common patterns

## Success Indicators

When working correctly, you should see:

1. ✅ "Test API Key" shows success
2. ✅ Console shows [AI] logs when typing
3. ✅ Network tab shows OpenAI requests
4. ✅ Suggestions appear with ✨ icon
5. ✅ Can accept suggestions with Tab/Enter

## Need More Help?

- **Full Documentation:** [AI_CODE_SUGGESTIONS.md](./AI_CODE_SUGGESTIONS.md)
- **Quick Start:** [AI_QUICK_START.md](./AI_QUICK_START.md)
- **Debugging Guide:** [AI_DEBUGGING_GUIDE.md](./AI_DEBUGGING_GUIDE.md)
- **OpenAI Help:** https://help.openai.com/

---

**Remember:** AI suggestions are optional. The IDE works great without them!
