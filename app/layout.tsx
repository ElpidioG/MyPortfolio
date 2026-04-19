import type { Metadata } from 'next';
import '../styles/tokens.css';
import '../styles/components.css';

export const metadata: Metadata = {
  title: 'Elpidio Marquez · UX Engineer',
  description: 'Turning complex problems into meaningful experiences',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@400;500;600&family=Syne:wght@500;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-bg="gradient">{children}</body>
    </html>
  );
}
