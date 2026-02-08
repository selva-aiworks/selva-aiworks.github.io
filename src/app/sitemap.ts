
import { MetadataRoute } from 'next';
import { siteConfig } from '@/data/portfolio';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;

    // Define main sections as priority routes
    const routes = [
        '',
        '#about',
        '#experience',
        '#skills',
        '#projects',
        '#contact',
    ].map((route) => ({
        url: `${baseUrl}/${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
