import type { Metadata } from 'next';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: '爻光晶舍 - 传承水晶文化的艺术品牌',
  description: '专业水晶艺术品设计与制作，传承水晶文化，匠心独运',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}