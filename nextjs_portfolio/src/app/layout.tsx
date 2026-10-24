import type { Metadata, Viewport } from 'next';
import './globals.css';
import { instrumentSerif, hankenGrotesk } from './fonts';
import { getAssetPath } from '@/lib/utils';
import { SITE_URL, SITE_TITLE, SITE_SHORT_DESCRIPTION } from '@/lib/site';

const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}document.documentElement.classList.add('js');})();`;

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F5F1' },
    { media: '(prefers-color-scheme: dark)', color: '#0E0F13' },
  ],
};

const ogImage = {
  url: `${SITE_URL}og.png`,
  width: 1200,
  height: 630,
  alt: 'Manoj Waghmare, Senior Mobile Developer',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
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
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'profile',
    title: SITE_TITLE,
    description: SITE_SHORT_DESCRIPTION,
    url: SITE_URL,
    siteName: 'MWStudio',
    firstName: 'Manoj',
    lastName: 'Waghmare',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_SHORT_DESCRIPTION,
    images: [ogImage.url],
  },
  // Metadata icon URLs are not base-path aware, so prefix them explicitly.
  icons: {
    icon: [
      { url: getAssetPath('/favicon.ico'), sizes: 'any' },
      { url: getAssetPath('/favicon.png'), type: 'image/png' },
    ],
    apple: getAssetPath('/icons/Icon-192.png'),
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
