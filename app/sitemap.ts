import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://luminfaber.com';
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/command-center`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
