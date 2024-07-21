import type { Metadata } from 'next';

import './globals.css';
import { Providers } from '@/context/Providers';

import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Binge',
  description: 'Filmes e séries'
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
