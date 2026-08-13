'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    number: '1',
    title: 'Pick your university & branch',
    description:
      'Start from your college — we organize everything underneath it, not the other way around.',
  },
  {
    number: '2',
    title: 'Drill into your subject',
    description:
      'Semester → subject → paper. Three taps and you’re looking at real past questions.',
  },
  {
    number: '3',
    title: 'Read the paper, question by question',
    description:
      'Every question is broken out on its own, with the marks and exam year attached.',
  },
  {
    number: '4',
    title: 'Bookmark or Ask AI',
    description:
      'Save a question for later, or send it to Coursify when you need it explained properly.',
  },
];

const trail = [
  { label: 'BEU', sub: 'University' },
  { label: 'CSE', sub: 'Branch' },
  { label: 'Sem 5', sub: 'Semester' },
  { label: 'DSA', sub: 'Subject' },
];

function DrillDownVisual() {
  return (
    <div className="bg-primary/[0.03] border-border relative overflow-hidden rounded-3xl border p-8 sm:p-10">
      <p className="text-muted-foreground mb-6 font-mono text-[11px] tracking-widest uppercase">
        How the path narrows
      </p>
      <div className="flex flex-col gap-3">
        {trail.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="flex items-center gap-4"
            style={{ marginLeft: `${i * 1.25}rem` }}
          >
            <span className="border-border bg-card text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]">
              {i + 1}
            </span>
            <div
              className={
                i === trail.length - 1
                  ? 'border-primary bg-primary/10 flex-1 rounded-xl border px-4 py-3'
                  : 'border-border bg-card/60 flex-1 rounded-xl border px-4 py-3'
              }
            >
              <p
                className={
                  i === trail.length - 1
                    ? 'text-primary text-sm font-semibold'
                    : 'text-foreground text-sm font-semibold'
                }
              >
                {step.label}
              </p>
              <p className="text-muted-foreground text-xs">{step.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 rounded-full px-4 py-1.5"
            >
              <CheckCircle2 className="text-success size-3.5" />
              Simple by design
            </Badge>
            <h2 className="font-display mb-6 text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
              Find your paper
              <br />
              <span className="text-primary">in four taps.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed lg:text-xl">
              No search box to guess keywords into. Just narrow down the same
              way you already think about your coursework.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <DrillDownVisual />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex gap-4"
            >
              <div className="shrink-0">
                <div className="border-border text-muted-foreground flex size-9 items-center justify-center rounded-full border font-mono text-sm">
                  {step.number}
                </div>
              </div>
              <div className="space-y-1.5 pt-1">
                <h3 className="text-base font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
