# 🔥 Resume Roaster

> Get your resume brutally roasted by AI — funny, honest, and actually helpful feedback to land your dream job.


---


## ✨ Features

- 🔥 **AI Resume Roast** — Brutally honest, funny, specific feedback powered by Claude AI
- 📊 **ATS Score** — See if your resume passes automated filters
- ✅ **Fix Suggestions** — Prioritized list of exactly what to change and how
- 📝 **Improved Summary** — AI rewrites your professional summary
- 📁 **Resume History** — Track all versions and see improvement over time
- 🔐 **Google & GitHub OAuth** — Secure login with NextAuth.js
- 📱 **Fully Responsive** — Works on mobile and desktop

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Auth** | NextAuth.js v4 |
| **AI** | Anthropic Claude API |
| **Styling** | Tailwind CSS |
| **File Storage** | Vercel Blob |
| **Deployment** | Vercel |

---

## 🗂 Project Structure

```
resume-roaster/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── layout.tsx                        # Root layout
│   ├── auth/signin/page.tsx              # Sign in page
│   ├── dashboard/page.tsx                # User dashboard
│   ├── roast/[id]/page.tsx               # Roast result page
│   └── api/
│       ├── auth/[...nextauth]/route.ts   # Auth handler
│       ├── upload/route.ts               # PDF upload API
│       └── roast/route.ts                # AI roast API
├── components/
│   ├── upload-area.tsx                   # Drag & drop upload
│   ├── resume-card.tsx                   # Resume list item
│   ├── score-ring.tsx                    # Animated score circle
│   ├── session-provider.tsx              # NextAuth provider
│   └── sign-out-button.tsx               # Sign out button
├── lib/
│   ├── prisma.ts                         # Database client
│   ├── claude.ts                         # Claude AI integration
│   ├── utils.ts                          # Helper functions
│   └── nanoid.ts                         # ID generator
├── prisma/
│   └── schema.prisma                     # Database schema
├── types/
│   └── next-auth.d.ts                    # TypeScript declarations
├── auth.ts                               # NextAuth config
├── middleware.ts                         # Route protection
└── .env.example                          # Environment template
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Anthropic API key
- Google OAuth credentials
- GitHub OAuth credentials

### 1. Clone the repository

```bash
git clone https://github.com/Malik-Umer-Mehboob/resume-roaster.git
cd resume-roaster
```

### 2. Install dependencies

```bash
npm install
```




## 🚀 Deploy to Vercel

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add all environment variables
4. Add Vercel Blob storage
5. Deploy!

---

## 🔑 Environment Variables

| Variable | Description | Where to get |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Neon.tech / Local PostgreSQL |
| `NEXTAUTH_SECRET` | Random secret string | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | console.cloud.google.com |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Secret | console.cloud.google.com |
| `GITHUB_CLIENT_ID` | GitHub OAuth Client ID | github.com/settings/developers |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth Secret | github.com/settings/developers |
| `ANTHROPIC_API_KEY` | Claude AI API Key | console.anthropic.com |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob Token | Vercel Dashboard → Storage |


---


## 📄 License

MIT License — feel free to use this project for learning or as a portfolio piece.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

<div align="center">
  <p>If this project helped you, please ⭐ star the repo!</p>
  <p>Built with ❤️ using Next.js + PostgreSQL + Claude AI</p>
</div>
