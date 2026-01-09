import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI BANDOBaST - Administrative Portal",
  description: "AI-Assisted Bandobast Planning & Decision Transparency Portal (Administrative Use Only)",
  keywords: ["bandobast", "planning", "AI", "GIS", "law enforcement", "event management"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
