# AI BANDOBaST — AI-Assisted Bandobast Planning & Decision Transparency Portal

## 🛡️ Overview

AI BANDOBaST is an **internal administrative decision-transparency portal** that documents how bandobast planning decisions were taken, supported by AI-assisted analysis and GIS visualization.

**This is NOT a public portal.** It is restricted to authorized government personnel only.

> Created by: **Niket Patil** (niketpatil1624@gmail.com)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- PostgreSQL (for production) or SQLite (for local development)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-bandobast-portal.git
   cd ai-bandobast-portal/portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   # Database (SQLite for local dev)
   DATABASE_URL="file:./dev.db"
   
   # Authentication
   ADMIN_USER="cpofficenashik2025"
   ADMIN_PASS="CPOFFICE@nashik2025"
   SESSION_SECRET="your-32-char-random-secret-key-here"
   
   # Google Maps (optional)
   NEXT_PUBLIC_GOOGLE_MAPS_KEY="your-frontend-maps-api-key"
   GOOGLE_MAPS_SERVER_KEY="your-backend-maps-api-key"
   
   # OpenAI (optional)
   OPENAI_API_KEY="your-openai-api-key"
   
   # App URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Initialize the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Seed the database with example data**
   ```bash
   npx ts-node prisma/seed.ts
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open the portal**
   
   Navigate to http://localhost:3000
   
   Login with:
   - Username: `cpofficenashik2025`
   - Password: `CPOFFICE@nashik2025`

---

## 📦 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Database connection string |
| `ADMIN_USER` | Yes | Admin login username |
| `ADMIN_PASS` | Yes | Admin login password |
| `SESSION_SECRET` | Yes | 32+ char secret for JWT sessions |
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | No | Frontend Google Maps JavaScript API key |
| `GOOGLE_MAPS_SERVER_KEY` | No | Backend Google Maps API key (for geocoding) |
| `OPENAI_API_KEY` | No | OpenAI API key for AI features |
| `NEXT_PUBLIC_APP_URL` | No | Application URL (defaults to localhost:3000) |

---

## 🗄️ Database

### SQLite (Development)

The default configuration uses SQLite for easy local development:
```env
DATABASE_URL="file:./dev.db"
```

### PostgreSQL (Production)

For production, use PostgreSQL:

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Set the connection string:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
   ```

3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

---

## 🌐 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set the root directory to `portal`

3. **Configure Environment Variables**
   
   In Vercel dashboard, add all required environment variables:
   - `DATABASE_URL` (use PostgreSQL for production, e.g., Vercel Postgres, Supabase, or Neon)
   - `ADMIN_USER`
   - `ADMIN_PASS`
   - `SESSION_SECRET`
   - `NEXT_PUBLIC_GOOGLE_MAPS_KEY` (optional)
   - `OPENAI_API_KEY` (optional)

4. **Deploy**
   
   Vercel will automatically build and deploy on push.

---

## 🗺️ Google Cloud APIs

### Required APIs

Enable these in Google Cloud Console:

1. **Maps JavaScript API** - For frontend map rendering
2. **Geocoding API** - For address to coordinate lookup (server-side)

### Optional APIs

- **Directions API** - For route optimization
- **Places API** - For location search

### API Key Security

| Key | Restrictions | Usage |
|-----|-------------|-------|
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | HTTP referrer (your domain) + Maps JS API only | Frontend only |
| `GOOGLE_MAPS_SERVER_KEY` | IP restrictions + Geocoding/Directions APIs | Backend only |

⚠️ **Never expose `GOOGLE_MAPS_SERVER_KEY` to the browser!**

---

## 📁 Project Structure

```
portal/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data script
├── src/
│   ├── app/
│   │   ├── (dashboard)/   # Protected dashboard pages
│   │   │   ├── overview/
│   │   │   ├── planning-flow/
│   │   │   ├── evidence/
│   │   │   ├── maps/
│   │   │   ├── ai-disclosure/
│   │   │   ├── playbooks/
│   │   │   ├── archive/
│   │   │   ├── downloads/
│   │   │   └── about/
│   │   ├── api/           # API routes
│   │   │   ├── auth/
│   │   │   ├── ai/
│   │   │   ├── kml/
│   │   │   └── ...
│   │   └── login/         # Login page
│   ├── components/        # Reusable components
│   └── lib/               # Utilities (db, auth)
├── .env.local             # Local environment variables
└── README.md              # This file
```

---

## 🔐 Security Notes

1. **Never commit `.env.local`** - It contains sensitive credentials
2. **Use strong SESSION_SECRET** - At least 32 random characters
3. **Restrict API keys** - Use HTTP referrer and IP restrictions
4. **Keep OpenAI key server-side** - Never expose in client code

---

## 📋 Features

- ✅ Login-protected internal portal
- ✅ 9-page navigation (Overview, Planning Flow, Evidence, Maps, AI Disclosure, Playbooks, Archive, Downloads, About)
- ✅ Evidence library with PDF/image preview
- ✅ Google Maps integration with layer toggles
- ✅ KML export (city-wide and PS-wise)
- ✅ AI & ML disclosure with 30 tools listed
- ✅ 10-year archive with compare mode
- ✅ Decision transparency documentation
- ✅ Explain Mode toggle for narrative depth
- ✅ Risk tier badges (LOW/MEDIUM/HIGH)
- ✅ Mobile-responsive design

---

## 📄 KML Export

The portal can export data in KML format for Google Earth:

```
GET /api/kml?groupBy=city              # All data, city-wide
GET /api/kml?groupBy=ps                # Grouped by police station
GET /api/kml?include=units,routes      # Only specific layers
```

---

## 🤖 AI Integration

Server-side OpenAI endpoints (requires `OPENAI_API_KEY`):

- `POST /api/ai/summarize-evidence` - Summarize evidence documents
- `POST /api/ai/generate-stage-note` - Draft decision notes
- `POST /api/ai/compare-years` - Compare archive years

All AI outputs include disclaimers that they are assistive only.

---

## ⚠️ Disclaimer

AI BANDOBaST is an **internal administrative support portal** intended solely for planning review, documentation transparency, evaluation, and institutional learning.

The system **does not issue commands, approvals, or enforcement instructions**. All decisions are taken by authorized officers. AI and GIS are used only for assistance, analysis, and visualization.

---

## 📝 License

Internal use only. Not for public distribution.

---

**Created by Niket Patil** | niketpatil1624@gmail.com
