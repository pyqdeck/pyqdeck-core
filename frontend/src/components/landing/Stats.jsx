'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Ban, GraduationCap, Bot } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const facts = [
  {
    icon: Sprout,
    label: 'In early access',
    detail: 'New papers added every week',
  },
  {
    icon: Ban,
    label: 'No paywall, ever',
    detail: 'Ad-supported, not subscription-gated',
  },
  {
    icon: GraduationCap,
    label: 'Built by a student',
    detail: 'For BEU, VTU, SPPU and more',
  },
  {
    icon: Bot,
    label: 'Ask AI via Coursify',
    detail: 'Our AI-tutoring partner, not a gimmick',
  },
];

export function Stats() {
  return (
    <>
      <Separator />
      <div className="bg-muted/40">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
              >
                <fact.icon className="text-primary size-5" />
                <span className="text-foreground text-sm font-semibold">
                  {fact.label}
                </span>
                <span className="text-muted-foreground text-xs leading-relaxed">
                  {fact.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
