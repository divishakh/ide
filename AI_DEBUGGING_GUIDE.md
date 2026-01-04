# AI Code Suggestions - Debugging Guide

## Issue: Suggestions Not Appearing

If you've configured your OpenAI API key but suggestions are not appearing, follow these debugging steps:

## Step 1: Open Browser Console

1. Press **F12** (or right-click → Inspect)
2. Click on the **Console** tab
3. Keep it open while using the editor

## Step 2: Check for AI Logs

When you type in the editor, you should see logs like:

```
[AI] Registering completion provider for language: javascript
[AI] AI completion providers registered successfully
[AI] provideCompletionItems called for: javascript at position: {...}
[AI] Getting completions for: {language: 'javascript', position: {...}, codeLength: 50}
[AI] Fetching new suggestions from OpenAI...
[AI] Sending request to OpenAI with context length: 50
[AI] OpenAI response status: 200
[AI] OpenAI response data: {...}
[AI] Parsed suggestions: [{...}]
[AI] Got completions: 3
[AI] Created suggestion: ✨ function calculateSum(a, b)
[AI] Returning 3 suggestions to Monaco
```

## Step 3: Identify the Issue

### Issue A: No logs at all
**Problem**: AI provider not registered
**Solution**:
1. Refresh the page
2. Check if Monaco Editor loaded properly
3. Look for errors in console

### Issue B: "API key not configured"
**Problem**: API key not saved properly
**Solution**:
1. Click "AI Settings" button
2. Re-enter your API key
3. Click "Save API Key"
4. Verify you see success message
5. Check localStorage: `localStorage.getItem('openai_api_key')`

### Issue C: "provideCompletionItems" not called
**Problem**: Monaco completion not triggering
**Solution**:
1. Try pressing **Ctrl+Space** (manual trigger)
2. Type one of these trigger characters: `.` `(` ` ` (space)
3. Wait 1-2 seconds after typing
4. Check Monaco editor settings

### Issue D: OpenAI API error (401 Unauthorized)
**Problem**: Invalid API key
**Solution**:
1. Verify your API key starts with `sk-`
2. Check for extra spaces or characters
3. Generate a new key from OpenAI Platform
4. Update in AI Settings

### Issue E: OpenAI API error (429 Rate Limit)
**Problem**: Too many requests
**Solution**:
1. Wait a few minutes
2. Check your OpenAI usage limits
3. Upgrade your OpenAI plan if needed

### Issue F: OpenAI API error (500/503)
**Problem**: OpenAI service issue
**Solution**:
1. Check OpenAI status: https://status.openai.com/
2. Try again later
3. Use a different model (future feature)

### Issue G: Completions received but not displayed
**Problem**: Monaco not showing suggestions
**Solution**:
1. Check console for "Returning X suggestions to Monaco"
2. Verify suggestions array is not empty
3. Try pressing **Ctrl+Space** to manually trigger
4. Check if other completions (IntelliSense) work

## Step 4: Manual Testing

### Test 1: Check API Key
```javascript
// Open browser console and run:
localStorage.getItem('openai_api_key')
// Should return: "sk-..."
```

### Test 2: Check AI Service
```javascript
// Open browser console and run:
import { aiCompletionService } from './src/services/aiCompletion';
console.log(aiCompletionService.isConfigured());
// Should return: true
```

### Test 3: Manual Trigger
1. Type some code in the editor
2. Press **Ctrl+Space** (Windows/Linux) or **Cmd+Space** (Mac)
3. Wait 2-3 seconds
4. Check console for AI logs

### Test 4: Simple Code Test
1. Create a new JavaScript file
2. Type: `function calc`
3. Wait 2-3 seconds
4. Check console logs
5. Look for suggestions in autocomplete menu

## Step 5: Common Solutions

### Solution 1: Clear Cache
```javascript
// Open browser console and run:
localStorage.clear();
// Then reconfigure API key
```

### Solution 2: Refresh Page
1. Save your work
2. Press **Ctrl+R** or **F5**
3. Reconfigure API key if needed

### Solution 3: Check Network
1. Open **Network** tab in DevTools
2. Filter by "openai"
3. Type in editor to trigger request
4. Check if request is sent
5. Check response status and data

### Solution 4: Verify API Key
1. Go to https://platform.openai.com/api-keys
2. Check if your key is active
3. Check usage limits
4. Generate new key if needed

### Solution 5: Test API Key Manually
```bash
# Test your API key with curl:
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Say hello"}],
    "max_tokens": 10
  }'
```

## Step 6: Report Issue

If none of the above works, please report the issue with:

1. **Browser and version** (e.g., Chrome 120)
2. **Console logs** (copy all [AI] logs)
3. **Network tab** (screenshot of OpenAI request/response)
4. **Steps to reproduce**
5. **API key status** (active/inactive, usage limits)

## Quick Checklist

- [ ] API key configured in AI Settings
- [ ] API key starts with `sk-`
- [ ] No extra spaces in API key
- [ ] Browser console open
- [ ] Typed trigger character (`.`, `(`, space)
- [ ] Waited 2-3 seconds
- [ ] Pressed Ctrl+Space to manually trigger
- [ ] Checked console for [AI] logs
- [ ] Checked Network tab for OpenAI requests
- [ ] Verified API key is active on OpenAI Platform
- [ ] Checked OpenAI usage limits
- [ ] Refreshed the page
- [ ] Cleared cache and reconfigured

## Expected Behavior

When working correctly:

1. **Type code** → Monaco triggers completion provider
2. **Provider called** → Console shows "[AI] provideCompletionItems called"
3. **API request** → Console shows "[AI] Fetching new suggestions"
4. **API response** → Console shows "[AI] OpenAI response status: 200"
5. **Parse suggestions** → Console shows "[AI] Parsed suggestions: 3"
6. **Display** → Suggestions appear in autocomplete menu with ✨ icon
7. **Accept** → Press Tab/Enter to insert suggestion

## Keyboard Shortcuts

- **Ctrl+Space** (Windows/Linux) or **Cmd+Space** (Mac): Manually trigger completions
- **Tab** or **Enter**: Accept suggestion
- **Esc**: Close suggestions menu
- **Arrow keys**: Navigate between suggestions

## Tips

1. **Wait patiently**: AI suggestions take 1-3 seconds to appear
2. **Use trigger characters**: Type `.` or `(` or space to trigger
3. **Manual trigger**: Use Ctrl+Space if auto-trigger doesn't work
4. **Check console**: Always keep console open for debugging
5. **Test with simple code**: Start with `function calc` to test

## Still Not Working?

If you've tried everything and it's still not working:

1. **Disable AI temporarily**: Remove API key from AI Settings
2. **Use built-in IntelliSense**: Monaco has good built-in completions
3. **Report the issue**: Open a GitHub issue with details
4. **Wait for fix**: We'll investigate and fix the issue

---

**Need more help?** Check the full documentation in [AI_CODE_SUGGESTIONS.md](./AI_CODE_SUGGESTIONS.md)
