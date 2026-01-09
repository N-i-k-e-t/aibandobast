# AI BANDOBaST — Internal Administrative Showcase

Created by: **Niket Patil** (niketpatil1624@gmail.com)

AI BANDOBaST is a high-fidelity internal administrative portal designed for the **Nashik City Police Commissionerate**. It provides a 7-stage protocol for Ganpati Utsav bandobast planning, featuring historical data analysis (2015-2025), GIS/KML mapping, and logic-driven resource allocation.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS (Premium UI/UX)
- **Data**: JSON Manifest Driven (Optimized for Vercel Showcase)
- **Maps**: Google Maps JavaScript API
- **Deployment**: Vercel

---

## 🚀 Setup Instructions

### 1. Data Ingestion
Copy your full dataset folder (PDFs, KML, Images) into the following directory inside the `portal` folder:
`portal/data/inbox/`

### 2. Environment Variables
Create a `.env.local` file in the `portal/` directory with the following keys:
```env
# Administrative Credentials
ADMIN_USER=cpofficenashik2025
ADMIN_PASS=CPOFFICE@nashik2025
SESSION_SECRET=your_long_random_secret_here

# Maps (Referrer Restricted)
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key_here
```

### 3. Local Installation
```bash
cd portal
npm install
```

### 4. Build Manifest
This script scans `./data/inbox/` and generates the manifest and metrics needed for the showcase.
```bash
npm run build:manifest
```

### 5. Start Development Server
```bash
npm run dev
```

---

## 🚢 Vercel Deployment

1. **Push to GitHub**: Ensure the `portal` folder is pushed.
2. **Import Project**: In Vercel, select the `portal` directory as the root.
3. **Set Environment Variables**: Add `ADMIN_USER`, `ADMIN_PASS`, and `NEXT_PUBLIC_GOOGLE_MAPS_KEY` in Vercel settings.
4. **Deploy**: Vercel will run `npm run build` which automatically executes the manifest indexing script.

---

## 🛡️ Administrative Disclaimer

AI BANDOBaST is an internal administrative support portal intended for planning review, documentation transparency, evaluation, and institutional learning. 

It does not issue commands, approvals, or enforcement instructions. All decisions are taken by authorized officers. AI and GIS are used only for assistance, analysis, and visualization.

---
© 2026 Niket Patil. All Rights Reserved.
