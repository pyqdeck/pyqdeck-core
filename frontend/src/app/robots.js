const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pyqdeck.in';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio', '/browse/bookmarks'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
