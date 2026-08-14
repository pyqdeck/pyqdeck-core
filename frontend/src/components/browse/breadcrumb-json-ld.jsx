const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pyqdeck.in';

/**
 * BreadcrumbList structured data matching what <BreadcrumbNav> renders --
 * same trail shape ([{ label, href? }]), same implicit "Browse" root.
 * The last item never needs an href (it's the current page), so it's
 * simply omitted from the list per the schema.org spec.
 */
export function BreadcrumbJsonLd({ trail }) {
  const items = [{ label: 'Browse', href: '/browse' }, ...trail];

  const itemListElement = items
    .filter((item) => item.href)
    .map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
