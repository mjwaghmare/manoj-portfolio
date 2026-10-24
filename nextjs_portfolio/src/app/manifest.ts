import type { MetadataRoute } from 'next';
import { getAssetPath } from '@/lib/utils';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manoj Waghmare | Senior Mobile Developer',
    short_name: 'MWStudio',
    description: 'Senior Mobile Developer with 7+ years of experience building production Android and iOS apps.',
    start_url: getAssetPath('/'),
    scope: getAssetPath('/'),
    display: 'standalone',
    background_color: '#0E0F13',
    theme_color: '#0E0F13',
    icons: [
      { src: getAssetPath('/icons/Icon-192.png'), sizes: '192x192', type: 'image/png' },
      { src: getAssetPath('/icons/Icon-512.png'), sizes: '512x512', type: 'image/png' },
      { src: getAssetPath('/icons/Icon-maskable-192.png'), sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: getAssetPath('/icons/Icon-maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
