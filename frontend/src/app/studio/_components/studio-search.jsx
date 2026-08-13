'use client';

import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function StudioSearch({
  placeholder = 'Search...',
  paramName = 'search',
  initialValue = '',
  className = 'w-72',
}) {
  const searchParams = useSearchParams();
  const urlValue = searchParams.get(paramName) || '';
  const [value, setValue] = React.useState(urlValue);
  const [prevUrlValue, setPrevUrlValue] = React.useState(urlValue);
  const router = useRouter();
  const pathname = usePathname();

  // Sync local value with URL during render to avoid cascading effects
  if (urlValue !== prevUrlValue) {
    setPrevUrlValue(urlValue);
    setValue(urlValue);
  }

  // Debounced URL update
  React.useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === urlValue) return;

      if (value) {
        params.set(paramName, value);
      } else {
        params.delete(paramName);
      }

      // Always reset to page 1 on search
      params.set('page', '1');

      router.push(`${pathname}?${params.toString()}`);
    }, 500);

    return () => clearTimeout(handler);
  }, [value, paramName, pathname, router, searchParams, urlValue]);

  return (
    <div className={`relative ${className}`}>
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input
        placeholder={placeholder}
        className="font-roboto border pl-9 focus-visible:ring-0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
