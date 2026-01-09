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
   
   # Google Maps
   NEXT_PUBLIC_GOOGLE_MAPS_KEY="your-frontend-maps-api-key"
   
   # OpenAI (Optional - for Extraction/Copilot)
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
| `OPENAI_API_KEY` | No | OpenAI API key for AI features (Copilot, Extraction) |

---

## 🌐 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deployment ready"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set the root directory to `portal`

3. **Configure Environment Variables**
   - `DATABASE_URL` (use Vercel Postgres or similar)
   - `ADMIN_USER`
   - `ADMIN_PASS`
   - `SESSION_SECRET`
   - `NEXT_PUBLIC_GOOGLE_MAPS_KEY`

4. **Deploy**
   Vercel will automatically build and deploy.

---

## 📋 Features

- ✅ **Login-protected** internal portal
- ✅ **AI Copilot (Chat-to-Map)**: Natural language map control
- ✅ **Ingestion Pipeline**: Upload PDF/DOCX -> AI Extraction -> Human Verification -> Official DB
- ✅ **Insights Studio**: Automated hotspot detection & risk trends
- ✅ **Evidence Library**: PDF/image preview
- ✅ **Maps & GIS**: Layer toggles, Risk markers
- ✅ **KML Export**: City-wide and Police Station-wise export for Google Earth
- ✅ **10-Year Archive**: Historical comparison
- ✅ **Decision Transparency**: "Why we decided" documentation

---

## ⚠️ Disclaimer

AI BANDOBaST is an **internal administrative support portal** intended solely for planning review, documentation transparency, evaluation, and institutional learning.

The system **does not issue commands, approvals, or enforcement instructions**. All decisions are taken by authorized officers. AI and GIS are used only for assistance, analysis, and visualization.

---

**Created by Niket Patil** | niketpatil1624@gmail.com
