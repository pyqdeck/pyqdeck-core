'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PartnerSpotlight() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16">
      <motion.a
        href="https://coursify-website.vercel.app/"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-primary relative block overflow-hidden rounded-3xl p-px transition-all"
      >
        <div className="bg-primary rounded-[calc(1.5rem-1px)] p-8 sm:p-10">
          {/* Noise overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl [background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] opacity-10 mix-blend-overlay" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="bg-primary-foreground/15 ring-primary-foreground/20 flex size-16 shrink-0 items-center justify-center rounded-2xl ring-1 backdrop-blur-sm">
              <BookOpen className="text-primary-foreground size-8" />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="text-primary-foreground/70 text-xs font-bold tracking-widest uppercase">
                Partner Spotlight
              </p>
              <h3 className="text-primary-foreground text-2xl font-bold tracking-tight sm:text-3xl">
                Coursify
              </h3>
              <p className="text-primary-foreground/85 max-w-xl text-sm leading-relaxed sm:text-base">
                Turn YouTube playlists into structured courses with progress
                tracking, note-taking, and an AI tutor. Free and ad-free.
              </p>
            </div>
            <div className="mt-2 sm:mt-0 sm:ml-auto sm:shrink-0">
              <Button
                variant="secondary"
                className="gap-2 rounded-full px-6 font-semibold"
              >
                Visit Coursify
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </motion.a>
    </section>
  );
}
