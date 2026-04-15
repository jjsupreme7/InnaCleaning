import type { MetadataRoute } from 'next';

const SITE_URL = 'https://inna-cleaning.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/services', '/about', '/gallery', '/faq', '/contact', '/booking', '/quote'];

  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/services' || path === '/booking' ? 0.9 : 0.7,
  }));
}
