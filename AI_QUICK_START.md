# AI Code Suggestions - Quick Start Guide

## What is This?

AI-powered code suggestions that help you write code faster, similar to GitHub Copilot. Get intelligent completions as you type!

## 5-Minute Setup

### Step 1: Get OpenAI API Key (2 minutes)

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Step 2: Configure in App (1 minute)

1. Open Athena's Code Chambers
2. Click **"AI Settings"** button in toolbar
3. Paste your API key
4. Click **"Save API Key"**

### Step 3: Start Coding! (2 minutes)

1. Create a new file
2. Start typing code
3. Wait a moment - AI suggestions appear!
4. Press **Tab** or **Enter** to accept

## Example

```javascript
// Type: function calculate
// AI suggests: function calculateSum(a, b) { return a + b; }

// Type: const user = {
// AI suggests: name: '', email: '', age: 0

// Type: fetch('
// AI suggests: fetch('https://api.example.com/data')
```

## Features

✅ Works with 15+ languages (JavaScript, Python, C++, Java, Go, Rust, etc.)
✅ Context-aware suggestions
✅ Real-time as you type
✅ Multiple suggestions to choose from
✅ Secure (API key stored locally)

## Cost

- **Model**: GPT-3.5-turbo
- **Cost**: ~$0.0002-0.0004 per suggestion
- **Example**: 100 suggestions/day ≈ $0.02-0.04/day

## Troubleshooting

**Suggestions not appearing?**
1. Check API key in AI Settings
2. Open browser console (F12) for errors
3. Verify internet connection

**Slow suggestions?**
- Normal response time: 1-3 seconds
- Check internet speed
- Try again later

**Invalid API key?**
- Verify key starts with `sk-`
- Check for extra spaces
- Generate new key from OpenAI

## Privacy

**What is sent to OpenAI:**
- Last 500 characters of your code
- Programming language
- Cursor position

**What is NOT sent:**
- Your full project
- File names
- Personal information

**Where API key is stored:**
- Browser localStorage only
- Never sent to our servers

## Need Help?

- **Full Documentation**: [AI_CODE_SUGGESTIONS.md](./AI_CODE_SUGGESTIONS.md)
- **OpenAI Help**: https://help.openai.com/
- **Report Issues**: GitHub Issues

## Tips

1. **Use selectively**: Best for complex code
2. **Review suggestions**: Always review AI-generated code
3. **Monitor costs**: Check OpenAI dashboard regularly
4. **Set limits**: Configure spending limits in OpenAI

---

**Ready to code with AI? Click "AI Settings" and get started!** 🚀
