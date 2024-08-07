import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'OOSIE',
  description: 'Health Care Brand',
};

export default function HtmlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
