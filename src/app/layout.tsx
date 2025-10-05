import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { siteConfig } from '@/config/site';
import ThemeProvider from '@/components/providers/ThemeProvider';
import MobileNav from '@/components/layout/MabileNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['calorie tracker', 'meal tracking', 'nutrition', 'USDA', 'food data'],
  authors: [{ name: 'Sam Phillemon' }],
  creator: 'Sam Phillemon',
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pb-20 md:pb-0">{children}</main>
            <MobileNav />
          </div>
          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              style: {
                marginTop: '2rem',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
