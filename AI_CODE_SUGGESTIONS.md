# AI Code Suggestions Feature

## Overview

Athena's Code Chambers now includes AI-powered code suggestions that provide intelligent completions as you type, similar to GitHub Copilot. This feature uses OpenAI's GPT models to understand your code context and suggest relevant completions.

## Features

### 🤖 Intelligent Completions
- Context-aware code suggestions based on your current code
- Supports multiple programming languages (JavaScript, Python, C++, Java, Go, Rust, and more)
- Real-time suggestions as you type
- Multiple suggestion options to choose from

### ⚡ Smart Integration
- Seamlessly integrated into Monaco Editor
- Works alongside built-in IntelliSense
- Automatic caching for faster responses
- Debounced requests to minimize API calls

### 🔒 Privacy & Security
- API key stored locally in browser (localStorage)
- Never sent to our servers
- You control your own OpenAI account
- Can be disabled at any time

## Setup

### Step 1: Get an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Navigate to the API Keys section
4. Click "Create new secret key"
5. Copy the generated key (starts with `sk-`)

### Step 2: Configure in the App

**Option A: Using the UI (Recommended)**

1. Open Athena's Code Chambers
2. Click the **"AI Settings"** button in the toolbar
3. Paste your OpenAI API key
4. Click **"Save API Key"**
5. Start coding! AI suggestions will appear automatically

**Option B: Using Environment Variable**

1. Add to your `.env` file:
   ```
   VITE_OPENAI_API_KEY=sk-your-api-key-here
   ```
2. Restart the development server
3. AI suggestions will be enabled automatically

## Usage

### Getting Suggestions

AI suggestions appear automatically as you type:

1. **Start typing code** in the editor
2. **Wait a moment** - suggestions appear in the autocomplete menu
3. **Look for "AI Suggestion"** label in the completion details
4. **Press Tab or Enter** to accept a suggestion
5. **Use arrow keys** to navigate between suggestions

### Trigger Characters

AI suggestions are triggered by:
- `.` (dot) - for object properties/methods
- `(` (opening parenthesis) - for function parameters
- ` ` (space) - for general code completion
- `\n` (new line) - for next line suggestions

### Example Workflow

```javascript
// Type: function calculate
// AI suggests: function calculateSum(a, b) { return a + b; }

// Type: const user = {
// AI suggests: name: '', email: '', age: 0

// Type: fetch('
// AI suggests: fetch('https://api.example.com/data')
```

## Supported Languages

AI suggestions work with all languages supported by the IDE:

- JavaScript / TypeScript
- Python
- C / C++
- Java
- Go
- Rust
- PHP
- Ruby
- Swift
- Kotlin
- Scala
- HTML / CSS
- JSON / YAML
- SQL

## Configuration

### API Key Management

**View Current Status:**
- Click "AI Settings" button
- See if API key is configured
- Test with a simple code completion

**Update API Key:**
- Click "AI Settings"
- Enter new API key
- Click "Save API Key"

**Remove API Key:**
- Click "AI Settings"
- Click "Remove Key"
- AI suggestions will be disabled

### Performance Settings

The AI completion service includes built-in optimizations:

- **Caching**: Recent suggestions are cached (last 50 requests)
- **Debouncing**: Requests are debounced to avoid excessive API calls
- **Context Window**: Only last 500 characters sent for context
- **Request Queuing**: Duplicate requests are merged

## Cost Considerations

### OpenAI API Pricing

AI suggestions use OpenAI's API, which has usage-based pricing:

- **Model**: GPT-3.5-turbo (fast and cost-effective)
- **Typical Cost**: ~$0.002 per 1000 tokens
- **Average Request**: ~100-200 tokens
- **Estimated Cost**: $0.0002-0.0004 per suggestion

**Example Usage:**
- 100 suggestions per day ≈ $0.02-0.04/day
- 1000 suggestions per day ≈ $0.20-0.40/day

### Tips to Minimize Costs

1. **Use selectively**: AI suggestions are most helpful for complex code
2. **Leverage caching**: Similar code patterns reuse cached suggestions
3. **Set usage limits**: Configure spending limits in OpenAI dashboard
4. **Monitor usage**: Check OpenAI dashboard regularly

## Troubleshooting

### Suggestions Not Appearing

**Check API Key:**
1. Click "AI Settings"
2. Verify API key is configured
3. Try re-entering the key

**Check Console:**
1. Open browser DevTools (F12)
2. Look for error messages
3. Common issues:
   - Invalid API key
   - Rate limit exceeded
   - Network connectivity

**Check OpenAI Status:**
- Visit [OpenAI Status Page](https://status.openai.com/)
- Verify API is operational

### Slow Suggestions

**Possible Causes:**
- Network latency
- OpenAI API response time
- Large code context

**Solutions:**
- Wait a moment longer
- Reduce code file size
- Check internet connection
- Try again later

### Invalid API Key Error

**Error Message:**
```
OpenAI API error: Invalid API key
```

**Solution:**
1. Verify key starts with `sk-`
2. Check for extra spaces
3. Generate new key from OpenAI
4. Update in AI Settings

### Rate Limit Exceeded

**Error Message:**
```
OpenAI API error: Rate limit exceeded
```

**Solution:**
1. Wait a few minutes
2. Reduce typing speed
3. Check OpenAI usage limits
4. Upgrade OpenAI plan if needed

## Privacy & Security

### Data Handling

**What is sent to OpenAI:**
- Last 500 characters of your code
- Programming language
- Cursor position

**What is NOT sent:**
- Your full project
- File names
- Personal information
- API keys or secrets in code

**Where data is stored:**
- API key: Browser localStorage only
- Code context: Temporary (request only)
- Suggestions: Cached in browser memory

### Best Practices

1. **Don't include secrets**: Avoid typing API keys, passwords in code
2. **Review suggestions**: Always review AI-generated code
3. **Use .gitignore**: Keep .env file out of version control
4. **Rotate keys**: Periodically regenerate OpenAI API keys
5. **Monitor usage**: Check OpenAI dashboard for unusual activity

## Technical Details

### Architecture

```
User Types Code
    ↓
Monaco Editor
    ↓
AI Completion Provider
    ↓
AI Completion Service
    ↓
OpenAI API (GPT-3.5-turbo)
    ↓
Parse & Format Response
    ↓
Display Suggestions
```

### Files

- `src/services/aiCompletion.ts` - AI completion service
- `src/services/monacoAIProvider.ts` - Monaco editor integration
- `src/components/editor/AISettingsDialog.tsx` - Settings UI
- `src/components/editor/CodeEditor.tsx` - Editor with AI support

### API Integration

**Endpoint:**
```
POST https://api.openai.com/v1/chat/completions
```

**Request:**
```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert code completion assistant..."
    },
    {
      "role": "user",
      "content": "Complete the following javascript code..."
    }
  ],
  "max_tokens": 100,
  "temperature": 0.3,
  "n": 3
}
```

**Response:**
```json
{
  "choices": [
    {
      "message": {
        "content": "function calculateSum(a, b) { return a + b; }"
      }
    }
  ]
}
```

## Limitations

### Current Limitations

1. **Internet Required**: Needs active internet connection
2. **API Key Required**: Must have OpenAI account
3. **Response Time**: 1-3 seconds per suggestion
4. **Context Window**: Limited to last 500 characters
5. **Language Support**: Best for popular languages

### Known Issues

1. **Long Code Files**: May be slower with large files
2. **Complex Context**: May not understand very complex codebases
3. **Rate Limits**: Subject to OpenAI rate limits
4. **Cost**: Usage-based pricing from OpenAI

## Future Enhancements

### Planned Features

- [ ] Local AI models (no API key needed)
- [ ] Custom model selection (GPT-4, etc.)
- [ ] Suggestion history
- [ ] Keyboard shortcuts for AI actions
- [ ] Code explanation feature
- [ ] Refactoring suggestions
- [ ] Bug detection
- [ ] Performance optimization hints

### Community Requests

Have ideas for improvements? Open an issue on GitHub!

## FAQ

**Q: Is this free?**
A: The feature is free, but requires your own OpenAI API key (paid service).

**Q: How much does it cost?**
A: Typically $0.0002-0.0004 per suggestion. See Cost Considerations section.

**Q: Is my code private?**
A: Code context is sent to OpenAI for processing. See Privacy & Security section.

**Q: Can I use without API key?**
A: No, currently requires OpenAI API key. Local models planned for future.

**Q: Which model is used?**
A: GPT-3.5-turbo for speed and cost-effectiveness.

**Q: Can I use GPT-4?**
A: Not currently, but planned for future updates.

**Q: Does it work offline?**
A: No, requires internet connection to OpenAI API.

**Q: How do I disable it?**
A: Remove API key in AI Settings or don't configure one.

## Support

### Getting Help

- **Documentation**: This file
- **Issues**: GitHub Issues
- **OpenAI Support**: [OpenAI Help Center](https://help.openai.com/)

### Reporting Bugs

When reporting issues, include:
1. Browser and version
2. Error messages from console
3. Steps to reproduce
4. Example code (if applicable)

---

**Last Updated**: 2025-12-18
**Feature Version**: 1.0.0
**Status**: Stable ✅
