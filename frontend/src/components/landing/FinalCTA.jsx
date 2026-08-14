'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
          Your next paper is a few taps away.
        </h2>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          No account needed to look around. Free, ad-supported, and getting
          better every week.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground h-12 gap-2 rounded-full px-10 text-base font-semibold"
            asChild
          >
            <Link href="/browse">
              Browse Papers
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-background h-12 rounded-full px-8 text-base"
            asChild
          >
            <Link href="/sign-up">Create free account</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
