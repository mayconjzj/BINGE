import type { Metadata } from 'next';

import { Providers } from '@/context/Providers';
import './globals.css';

import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Binge',
  description: 'Filmes e séries',
  openGraph: {
    title: 'Binge',
    description: 'Procure por filmes e séries!'
  },
  twitter: {
    title: 'Binge',
    description: 'Procure por filmes e séries!'
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/`
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers attribute="class" defaultTheme="dark">
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
