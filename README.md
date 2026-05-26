# 📝 My First Fullstack Notes App

## What this project teaches you
- How a **frontend** (HTML/JS) talks to a **backend** (Node/Express)
- How a **backend** talks to a **database** (Supabase)
- What API endpoints are (GET, POST, DELETE)
- How environment variables keep secrets safe

---

## 🗂 Project Structure

```
notes-app/
├── server.js          ← Your backend (Express)
├── package.json       ← Project config + dependencies
├── .env               ← Your secret keys (NEVER share this)
└── public/
    └── index.html     ← Your frontend (HTML + JS)
```

---

## 🚀 Setup Guide (Step by Step)

### Step 1 — Create a Supabase Database

1. Go to https://supabase.com and sign up (free)
2. Click **"New Project"** → give it a name (e.g. "notes-app")
3. Wait for it to set up (~1 min)
4. Go to **SQL Editor** (left sidebar) and run this query:

```sql
CREATE TABLE notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. Go to **Settings → API** and copy:
   - `Project URL` → paste into `.env` as `SUPABASE_URL`
   - `anon / public key` → paste into `.env` as `SUPABASE_ANON_KEY`

---

### Step 2 — Install and Run the Backend

Make sure you have **Node.js** installed: https://nodejs.org (download LTS version)

Open a terminal in the `notes-app` folder, then run:

```bash
# Install all packages
npm install

# Start the server
npm start
```

You should see: `✅ Server running at http://localhost:3000`

---

### Step 3 — Open the App

Open your browser and go to: **http://localhost:3000**

That's it! Your frontend is served by your backend. 🎉

---

## 🔁 How it all connects

```
Browser                   Express Server              Supabase
-------                   --------------              --------
Load page       →   serve public/index.html
Click Save      →   POST /api/notes          →   INSERT into notes table
Page loads      →   GET  /api/notes          →   SELECT * from notes
Click Delete    →   DELETE /api/notes/:id    →   DELETE from notes
```

---

## ☁️ Deploy to Render (Free Hosting)

1. Push your code to GitHub (don't push `.env`!)
2. Add a `.gitignore` file with:
   ```
   node_modules/
   .env
   ```
3. Go to https://render.com → New → Web Service
4. Connect your GitHub repo
5. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add your environment variables in Render's **Environment** tab
   (same keys from your `.env` file)
7. Deploy! 🚀

---

## 💡 Things to try next

- Add an **edit** feature (PUT /api/notes/:id)
- Add **search** functionality
- Add **user login** with Supabase Auth
- Style it however you like!
