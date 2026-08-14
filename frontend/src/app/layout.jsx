/**
 * PyqDeck - Next-Generation Exam Learning Platform
 *
 * @copyright (c) 2026 PyqDeck. All rights reserved.
 * @license Proprietary
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Written by the PyqDeck Team <admin@pyqdeck.in>
 */

import { ClerkProvider } from '@/components/clerk-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/next';
import { Geist, Geist_Mono, Fraunces } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pyqdeck.in';
const siteDescription =
  'Free past year question papers for engineering and university exams, organized by university, branch, semester, and subject -- built for focused exam prep.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PyqDeck — Past Year Question Papers',
    template: '%s | PyqDeck',
  },
  description: siteDescription,
  openGraph: {
    type: 'website',
    siteName: 'PyqDeck',
    title: 'PyqDeck — Past Year Question Papers',
    description: siteDescription,
  },
  twitter: {
    card: 'summary',
    title: 'PyqDeck — Past Year Question Papers',
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { MainLayoutWrapper } from '@/components/main-layout-wrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} flex min-h-full flex-col antialiased`}
        suppressHydrationWarning
      >
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <MainLayoutWrapper>{children}</MainLayoutWrapper>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </ClerkProvider>
        <Analytics />
        {/* BetterStack Announcement Bar */}
        <Script
          src="https://uptime.betterstack.com/widgets/announcement.js"
          data-id="245735"
          async
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
