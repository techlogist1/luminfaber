import localFont from 'next/font/local';

export const prata = localFont({
  src: [{ path: '../public/fonts/Prata-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--font-prata',
  display: 'swap',
});

export const ebGaramond = localFont({
  src: [
    { path: '../public/fonts/EBGaramond-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../public/fonts/EBGaramond-MediumItalic.ttf', weight: '500', style: 'italic' },
  ],
  variable: '--font-eb-garamond',
  display: 'swap',
});

export const switzer = localFont({
  src: [
    { path: '../public/fonts/Switzer-Light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/Switzer-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Switzer-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Switzer-Semibold.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/Switzer-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-switzer',
  display: 'swap',
});

export const fragmentMono = localFont({
  src: [{ path: '../public/fonts/FragmentMono-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--font-fragment-mono',
  display: 'swap',
});
