import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './globals.css';

export const metadata: Metadata = {
  title: 'Sort Visualizer',
  description: 'Sort Visualizer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
