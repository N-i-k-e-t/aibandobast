# JARVIS for AI BANDOBaST 🛡️🤖

## 🌟 Overview
**JARVIS for AI BANDOBaST** is a "Zero-Loss" intelligence platform and internal administrative portal designed for the Nashik City Police. It transforms traditional bandobast planning into an AI-driven, data-transparent, and proactive process.

This repository contains the complete intelligence platform, including the JARVIS Copilot, GIS mapping engine, and the historical data archives.

---

## 📁 Project Structure

| Folder | Description |
| :--- | :--- |
| **`portal/`** | **The Core Web Application**. Built with Next.js, Prisma, and Tailwind CSS. Contains the dashboard, AI Copilot, and GIS Map. |
| **`ALL Data we haved till/`** | **Raw Intelligence Archive**. Contains all historical records, KML files, Mandal lists, and previous year reports used for JARVIS training/ingestion. |

---

## 🚀 Deployment (Vercel)

The live portal is hosted on Vercel. To deploy or update:

1. **Connect Repository**: Connect `aibandobast` to Vercel.
2. **Set Root Directory**: Set the "Root Directory" to **`portal`**.
3. **Environment Variables**:
   - `DATABASE_URL`: Production Postgres URL.
   - `NEXT_PUBLIC_GOOGLE_MAPS_KEY`: Google Maps JavaScript API.
   - `ADMIN_USER` & `ADMIN_PASS`: Authentication credentials.
   - `SESSION_SECRET`: Random 32-char string.

---

## 🛠️ Local Development

1. **Navigate to Portal**:
   ```bash
   cd portal
   ```
2. **Install & Setup**:
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   npx ts-node prisma/seed.ts
   ```
3. **Run**:
   ```bash
   npm run dev
   ```

---

## 🔐 Security & Disclaimer
- **Internal Use Only**: This portal is restricted to authorized administrative personnel. 
- **Decision Support**: JARVIS is an assistive tool; final tactical decisions are always taken by the Officer-in-Charge.
- **Data Privacy**: No private citizen data is stored. The system focuses on resource allocation and tactical risk assessments.

---

**Developed for Nashik City Police | JARVIS Tactical v2.4**
