import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { AchievementToastListener } from "@/components/tutorials/achievement-toast";
import { SiteLayout } from "@/components/layout/site-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "How-to-AI | AI Made Simple. Results Made Yours.",
  description: "Learn how to use AI tools with simple, step-by-step tutorials for everyday tasks.",
  keywords: ["AI tutorials", "learn AI", "artificial intelligence", "how to use AI", "AI for beginners"],
  authors: [{ name: "How-to-AI Team" }],
  creator: "How-to-AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteLayout>
            {children}
            <Toaster />
            <SonnerToaster position="top-right" />
            <AchievementToastListener />
          </SiteLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
