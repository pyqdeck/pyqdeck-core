'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, CheckCheck, Sparkles } from 'lucide-react';

export function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.9,
        delay: 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative order-1 flex min-h-[480px] w-full items-center justify-center lg:order-2 lg:min-h-[540px] xl:justify-end"
    >
      <div className="relative flex w-full max-w-[440px] flex-col">
        {/* Peek card behind — an older, "cleared" paper */}
        <div className="border-border bg-background/50 origin-bottom translate-y-4 scale-[0.94] rounded-t-2xl border border-b-0 px-6 pt-5 pb-8 opacity-50">
          <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            2022 · Q2(b) · 10 marks
          </p>
        </div>

        {/* Active "answer sheet" card */}
        <div className="border-border bg-card text-card-foreground relative z-10 -mt-2 rounded-2xl border shadow-xl">
          {/* Header strip — mimics a mark-sheet header */}
          <div className="border-border flex items-center justify-between border-b px-6 py-3">
            <span className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
              BEU · CSE · Sem 5
            </span>
            <span className="text-muted-foreground font-mono text-[11px] tracking-widest uppercase">
              2021
            </span>
          </div>

          <div className="p-6 sm:p-7">
            <div className="mb-5 flex items-start justify-between gap-4">
              <span className="text-muted-foreground font-mono text-sm">
                Q1(c)
              </span>
              <div className="relative shrink-0">
                <span className="border-correction text-correction flex size-9 items-center justify-center rounded-full border-2 font-mono text-sm font-semibold">
                  2/2
                </span>
              </div>
            </div>

            <h3 className="font-display mb-8 text-xl leading-snug font-medium tracking-tight sm:text-2xl">
              Define a multiplexer and realize a three-input AND gate using a
              4×1 MUX.
            </h3>

            <div className="border-border flex items-center justify-between border-t pt-5">
              <div className="text-muted-foreground flex items-center gap-2 text-xs">
                <CheckCheck className="text-correction size-4" />
                <span className="font-mono">marked correct</span>
              </div>

              <div className="flex items-center gap-3">
                <Bookmark className="text-foreground size-4" />
                <span className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
                  <Sparkles className="size-3.5" />
                  Ask AI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Peek card below — the next paper up */}
        <div className="border-border bg-background/70 relative z-0 -mt-2 origin-top scale-[0.96] rounded-b-2xl border border-t-0 px-6 pt-8 pb-5 shadow-sm">
          <p className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase">
            2023 · Q3(a) · 5 marks
          </p>
        </div>
      </div>
    </motion.div>
  );
}
