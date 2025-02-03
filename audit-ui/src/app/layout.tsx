import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orb = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audit UI",
  description: "Smart Contract Audit UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orb.variable} antialiased`}>{children}</body>
    </html>
  );
}
