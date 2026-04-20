# 🔥 Resume Roaster

> AI-powered resume feedback tool — brutally honest, surprisingly helpful.

Built with **Next.js 14**, **PostgreSQL**, **Prisma**, **Claude AI**, and **Vercel Blob**.

---

## 🚀 Deploy in 7 Steps

### Step 1 — Clone & Install

```bash
git clone <your-repo-url>
cd resume-roaster
npm install
```

---

### Step 2 — Free PostgreSQL Database (Neon.tech)

1. Go to **https://neon.tech** → Sign up free
2. Create new project → name it `resume-roaster`
3. Copy the **Connection string** (looks like `postgresql://...`)
4. Save it — you'll need it in Step 5

**Alternative free options:**
- https://supabase.com (also free, also PostgreSQL)
- https://railway.app ($5 credit free)

---

### Step 3 — Google OAuth Setup

1. Go to **https://console.cloud.google.com**
2. Create new project → name it `Resume Roaster`
3. Go to **APIs & Services → OAuth consent screen**
   - User Type: External → Fill app name, email
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth Client ID**
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
   - (Add production URL later: `https://yourdomain.vercel.app/api/auth/callback/google`)
5. Copy **Client ID** and **Client Secret**

---

### Step 4 — GitHub OAuth Setup

1. Go to **https://github.com/settings/developers**
2. Click **New OAuth App**
   - App name: Resume Roaster
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy **Client ID** and generate **Client Secret**

---

### Step 5 — Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
DATABASE_URL="postgresql://..."         # From Neon.tech Step 2
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."                  # From Step 3
GOOGLE_CLIENT_SECRET="..."             # From Step 3
GITHUB_CLIENT_ID="..."                  # From Step 4
GITHUB_CLIENT_SECRET="..."             # From Step 4
ANTHROPIC_API_KEY="sk-ant-..."         # From console.anthropic.com
BLOB_READ_WRITE_TOKEN="..."            # Added automatically by Vercel (Step 7)
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

### Step 6 — Setup Database

```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to PostgreSQL
```

To view your database visually:
```bash
npm run db:studio
```

---

### Step 7 — Run Locally

```bash
npm run dev
```

Open **http://localhost:3000** — you should see the landing page! 🎉

---

## ☁️ Deploy to Vercel (Production)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Resume Roaster"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/resume-roaster.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to **https://vercel.com** → New Project
2. Import your GitHub repo
3. Framework: **Next.js** (auto-detected)

### 3. Add Environment Variables on Vercel

In Vercel project → **Settings → Environment Variables**, add all variables from `.env.local` EXCEPT:
- Change `NEXTAUTH_URL` to your actual Vercel URL (e.g. `https://resume-roaster.vercel.app`)

### 4. Add Vercel Blob Storage

1. Vercel project → **Storage → Create → Blob**
2. Name it `resume-files` → Create
3. `BLOB_READ_WRITE_TOKEN` is added automatically ✅

### 5. Update OAuth Redirect URLs

**Google:** console.cloud.google.com → Add to Authorized redirect URIs:
```
https://resume-roaster.vercel.app/api/auth/callback/google
```

**GitHub:** github.com/settings/developers → Update callback URL:
```
https://resume-roaster.vercel.app/api/auth/callback/github
```

### 6. Deploy!

```bash
git push origin main
```

Vercel auto-deploys on every push. Your app is live! 🚀

---

## 📁 Project Structure

```
resume-roaster/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── not-found.tsx         # 404 page
│   ├── auth/
│   │   └── signin/page.tsx   # Sign in page
│   ├── dashboard/
│   │   ├── page.tsx          # User dashboard
│   │   └── loading.tsx       # Loading skeleton
│   ├── roast/
│   │   └── [id]/page.tsx     # Roast result page
│   └── api/
│       ├── auth/[...nextauth]/route.ts   # Auth handler
│       ├── upload/route.ts              # PDF upload
│       └── roast/route.ts              # AI roast generation
├── components/
│   ├── upload-area.tsx       # Drag & drop upload
│   ├── resume-card.tsx       # Dashboard resume list item
│   ├── score-ring.tsx        # Animated score circle
│   ├── session-provider.tsx  # NextAuth provider
│   └── sign-out-button.tsx   # Sign out button
├── lib/
│   ├── prisma.ts             # Database client
│   ├── claude.ts             # Claude AI integration
│   ├── utils.ts              # Helper functions
│   └── nanoid.ts             # ID generator
├── prisma/
│   └── schema.prisma         # Database schema
├── auth.ts                   # NextAuth config
├── middleware.ts             # Route protection
├── .env.example              # Environment template
└── README.md
```

---

## 🔑 Getting API Keys

| Service | URL | Free Tier |
|---|---|---|
| Claude AI | https://console.anthropic.com | $5 free credits |
| Neon DB | https://neon.tech | 512MB free forever |
| Vercel | https://vercel.com | 100GB bandwidth/month |
| Google OAuth | https://console.cloud.google.com | Free |
| GitHub OAuth | https://github.com/settings/developers | Free |

---

## 💼 Portfolio & Freelancing Notes

This project demonstrates:
- ✅ **Full Stack:** Next.js 14 App Router (latest)
- ✅ **Database:** PostgreSQL + Prisma ORM
- ✅ **Auth:** OAuth (Google + GitHub) via NextAuth v5
- ✅ **AI Integration:** Claude API with streaming
- ✅ **File Handling:** PDF upload, parse, cloud storage
- ✅ **Deployment:** Vercel with CI/CD
- ✅ **TypeScript:** Fully typed
- ✅ **Security:** Server-side auth, protected routes, user data isolation

**Freelancer.com / PeoplePerHour description:**
> "I built Resume Roaster — a full-stack AI SaaS with Next.js 14, PostgreSQL, Prisma ORM, NextAuth OAuth, Vercel Blob storage, and Claude AI integration. Live at [your-url]. I can build similar production-ready full-stack web applications for your business."

---

## 🛠 Troubleshooting

**`PrismaClientInitializationError`** → Check DATABASE_URL is correct and DB is accessible

**OAuth redirect mismatch** → Make sure callback URLs match exactly in Google/GitHub console

**PDF parse fails** → Some scanned PDFs won't work — they need OCR. Text-based PDFs work fine.

**Blob upload fails locally** → BLOB_READ_WRITE_TOKEN needed. For local dev, you can skip blob and save files locally.

---

Built with ❤️ using Next.js + PostgreSQL + Claude AI
