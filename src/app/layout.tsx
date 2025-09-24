import type { Metadata } from 'next';
import { DarkThemeProvider } from '@/components/ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ham',
  description: 'Portfolio and Blog.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DarkThemeProvider>
          {children}
        </DarkThemeProvider>
      </body>
    </html>
  );
}