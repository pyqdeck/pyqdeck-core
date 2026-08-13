'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PenLine } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="border-border bg-muted/30 border-y py-24">
      <div className="mx-auto max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <PenLine className="text-correction mx-auto mb-5 size-6" />
          <p className="font-display text-xl leading-relaxed font-medium tracking-tight sm:text-2xl">
            &ldquo;I built this because I was tired of digging through
            WhatsApp groups for last year&apos;s paper the night before an
            exam. It&apos;s still early — most of the good stuff is what
            happens after real students start adding their own papers.&rdquo;
          </p>
          <p className="text-muted-foreground mt-5 text-sm">
            Raiyan Hasan, builder of PyqDeck
          </p>
        </motion.div>
      </div>
    </section>
  );
}
