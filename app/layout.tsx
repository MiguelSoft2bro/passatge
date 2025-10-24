
import type { Metadata } from 'next';
import './globals.css';
import MobileMenu from '@/components/ui/mobile-menu';
import { LanguageProvider } from '@/contexts/LanguageContext';

export const metadata: Metadata = {
  title: 'PASSATGE - Bar Artístico & Gastronómico | Alicante',
  description: 'Experiencia culinaria única en el corazón de Alicante. Bar artístico con ambiente sofisticado, gastronomía de vanguardia y diseño moderno.',
  keywords: 'bar Alicante, restaurante artístico, gastronomía Alicante, bar moderno, cocina de autor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="gradient-bg">
        <LanguageProvider>
          <MobileMenu />
          <main className="relative">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
