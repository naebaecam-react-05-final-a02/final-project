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
    <html className="w-full h-full" lang="en">
      <body className="relative font-sans w-full h-full">{children}</body>
    </html>
  );
}
