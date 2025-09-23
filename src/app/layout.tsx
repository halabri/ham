import type { Metadata } from 'next';
import { DarkThemeProvider } from '@/components/ui';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio website showcasing skills and experience.',
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