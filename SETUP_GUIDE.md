# Quick Setup Guide for Athena's Code Chambers

## 🚀 5-Minute Setup

### 1. Install Dependencies (1 minute)

```bash
pnpm install
```

### 2. Set Up Supabase (2 minutes)

1. **Create account**: Go to [supabase.com](https://supabase.com) and sign up
2. **Create project**: Click "New Project", fill in details, wait for setup
3. **Get credentials**: 
   - Go to Settings → API
   - Copy "Project URL" and "anon public" key

### 3. Configure Environment (30 seconds)

Create `.env` file:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_APP_ID=athena-code-chambers
VITE_API_ENV=production
```

### 4. Run Database Migrations (1 minute)

In Supabase dashboard:
1. Click **SQL Editor** → **New Query**
2. Copy/paste each migration file content:
   - `supabase/migrations/00001_create_code_files_and_projects.sql`
   - `supabase/migrations/00002_add_versions_and_sharing.sql`
   - `supabase/migrations/00003_add_auth_and_sharing.sql`
3. Click **Run** for each

### 5. Disable Email Confirmation (30 seconds)

1. Go to **Authentication** → **Providers**
2. Click **Email**
3. Toggle OFF "Enable email confirmations"
4. Click **Save**

### 6. Start Development Server (10 seconds)

```bash
pnpm run dev
```

Open `http://localhost:5173` 🎉

---

## ✅ Verification Checklist

After setup, verify:

- [ ] App loads without errors
- [ ] Can sign up with username/password
- [ ] Can create a project
- [ ] Can create a file
- [ ] Can write and run JavaScript code
- [ ] Can run Python code with input
- [ ] Can generate share links
- [ ] Can switch between projects

---

## 🐛 Common Issues

### "Cannot connect to Supabase"
- Check `.env` file exists and has correct values
- Verify Supabase project is active (not paused)

### "Failed to create project"
- Ensure all 3 migrations ran successfully
- Check Supabase → Database → Tables shows all tables

### "Share link not generating"
- Verify you're logged in
- Check browser console for errors
- Ensure `shares` table exists in database

### "Input not working"
- Enter input in Input panel FIRST
- Click "Send Input"
- THEN click "Run Code"

---

## 📚 Full Documentation

See [README.md](./README.md) for complete documentation including:
- Detailed tech stack information
- Full feature list
- Customization guide
- Deployment instructions
- Troubleshooting guide

---

## 🎯 Quick Test Script

After setup, try this Python code:

```python
name = input("What's your name? ")
print(f"Hello, {name}! Welcome to Athena's Code Chambers!")
```

**Steps**:
1. Create a new file: `test.py`
2. Paste the code above
3. Go to Input panel (bottom-right)
4. Type your name and click "Send Input"
5. Click "Run Code"
6. See the greeting in Output panel!

---

**Need help?** Check the [Troubleshooting section](./README.md#-troubleshooting) in README.md
