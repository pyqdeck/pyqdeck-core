'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
    >
      <motion.div variants={fadeUp} className="mb-6">
        <Badge
          variant="outline"
          className="border-correction/30 text-correction gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs tracking-wide uppercase"
        >
          Early access — new papers added weekly
        </Badge>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="font-display mb-6 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
      >
        Every past paper.
        <br />
        <span className="text-primary">Actually organized</span> this time.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0"
      >
        Browse exam papers by university, branch, semester, and subject.
        Bookmark what matters, and hop over to Coursify when a question has you
        stuck — no more scrolling through dead WhatsApp links.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
      >
        <Button
          size="lg"
          className="bg-primary text-primary-foreground h-12 w-full gap-2 rounded-full px-8 text-base font-semibold sm:w-auto"
          asChild
        >
          <Link href="/browse">
            Browse Papers
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="h-12 w-full gap-2 rounded-full px-8 text-base sm:w-auto"
          asChild
        >
          <Link href="/sign-up">Create free account</Link>
        </Button>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
      >
        {[
          'No account needed to browse',
          'Always free',
          'No app to install',
        ].map((text) => (
          <span
            key={text}
            className="text-muted-foreground flex items-center gap-1.5 text-xs"
          >
            <CheckCircle2 className="text-success size-3.5" />
            {text}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
