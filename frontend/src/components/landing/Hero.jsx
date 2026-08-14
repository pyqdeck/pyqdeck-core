'use client';

import React, { useEffect } from 'react';
import { useApi } from '@/hooks/use-api';
import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  const api = useApi();

  useEffect(() => {
    // Perform health check
    api
      .request({
        path: '/health',
        method: 'GET',
      })
      .then((res) => {
        console.log('Backend Status:', res.data.status);
      })
      .catch((err) => {
        console.error('Health Check Error:', err);
      });
  }, [api]);

  return (
    <section className="relative flex-1 overflow-hidden px-4 pt-8 pb-16 lg:pt-12 lg:pb-20">
      {/* Background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,oklch(0.72_0.15_250/0.08),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-20">
          <HeroContent />
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
