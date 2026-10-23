import type { Metadata } from 'next';
import './globals.css';
import { instrumentSerif, hankenGrotesk } from './fonts';

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export const metadata: Metadata = {
  title: 'Manoj Waghmare | Senior Mobile Developer',
  description:
    'Manoj Waghmare is a Senior Mobile Developer in Pune, India with 7+ years of experience building production Android and iOS apps with Flutter and Dart.',
  authors: [{ name: 'Manoj Waghmare' }],
  keywords: [
    'Manoj Waghmare',
    'Senior Mobile Developer',
    'Flutter',
    'Dart',
    'Android',
    'iOS',
    'mobile developer',
    'Pune',
  ],
  openGraph: {
    type: 'profile',
    title: 'Manoj Waghmare | Senior Mobile Developer',
    description: 'Senior Mobile Developer with 7+ years of experience building production Android and iOS apps.',
    url: 'https://mjwaghmare.github.io/manoj-portfolio/',
    firstName: 'Manoj',
    lastName: 'Waghmare',
  },
  twitter: {
    card: 'summary',
    title: 'Manoj Waghmare | Senior Mobile Developer',
    description: 'Senior Mobile Developer with 7+ years of experience building production Android and iOS apps.',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/icons/Icon-192.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${instrumentSerif.variable} ${hankenGrotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
