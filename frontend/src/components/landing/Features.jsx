'use client';

import { motion } from 'framer-motion';
import {
  Layers,
  Building2,
  Bookmark,
  Sparkles,
  Ban,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const defaultFeatures = [
  {
    icon: Layers,
    title: 'Structured browsing',
    description:
      'University → branch → semester → subject → paper. No more scrolling through a messy Drive folder.',
  },
  {
    icon: Building2,
    title: 'Multi-university',
    description:
      "Not locked to one college. We're adding universities as students request them.",
  },
  {
    icon: Bookmark,
    title: 'Bookmarks',
    description:
      'Save the questions that matter and come back to them the night before your exam.',
  },
  {
    icon: Sparkles,
    title: 'Ask AI',
    description:
      'Stuck on a question? One tap sends it to Coursify, our AI-tutoring partner, for a clear explanation.',
  },
  {
    icon: Ban,
    title: 'No paywall',
    description:
      'Ad-supported, not subscription-gated. Every paper we have is free to browse.',
  },
  {
    icon: Users,
    title: 'Added by real people',
    description:
      'Papers are uploaded and organized through our admin studio — not scraped and dumped.',
  },
];

export function Features({
  badgeText = 'What you get',
  title = 'Everything you need to find a paper fast',
  description = 'No account required to browse. Sign up only if you want bookmarks.',
  features = defaultFeatures,
}) {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-4 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <Badge variant="outline" className="mb-4 rounded-full px-4 py-1.5">
          {badgeText}
        </Badge>
        <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-lg">
          {description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="h-full border shadow-none transition-colors hover:border-primary/30">
              <CardHeader>
                <div className="bg-primary/10 text-primary mb-4 flex size-11 items-center justify-center rounded-xl">
                  <feature.icon className="size-5" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="mt-1.5 text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
