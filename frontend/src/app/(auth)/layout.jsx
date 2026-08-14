'use client';

import Link from 'next/link';
import { BookOpen, Bookmark, Search, Sparkles } from 'lucide-react';

const capabilities = [
  {
    icon: Search,
    tag: 'Browse',
    line: 'Drill down by university, branch, semester, and subject to find exactly the paper you need.',
  },
  {
    icon: BookOpen,
    tag: 'Revise',
    line: 'Work through past year questions organized for focused exam prep, not endless scrolling.',
  },
  {
    icon: Bookmark,
    tag: 'Save',
    line: 'Bookmark papers and questions so your revision list is ready whenever you come back.',
  },
  {
    icon: Sparkles,
    tag: 'Ask AI',
    line: 'Stuck on a question? Get an instant explanation without leaving your revision flow.',
  },
];

function Logo({ dark }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl text-xs font-extrabold">
        PQ
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-semibold ${dark ? 'text-white' : 'text-foreground'}`}
        >
          PyqDeck
        </span>
        <span
          className={`text-xs ${dark ? 'text-white/50' : 'text-muted-foreground'}`}
        >
          Past year papers
        </span>
      </div>
    </Link>
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="bg-background min-h-screen lg:grid lg:grid-cols-2">
      {/* Feature panel (desktop only) */}
      <div className="bg-foreground relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
        <Logo dark />

        <div className="relative">
          <p className="text-primary font-mono text-[11px] tracking-[0.18em] uppercase">
            Built for exam prep
          </p>
          <h1 className="font-display mt-4 max-w-sm text-4xl leading-[1.1] font-semibold text-white">
            Past papers, organized the way you actually study.
          </h1>

          <ul className="mt-10 flex flex-col gap-6">
            {capabilities.map((c) => (
              <li key={c.tag} className="flex gap-3.5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <c.icon className="size-4 text-white/70" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{c.tag}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-white/50">
                    {c.line}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} PyqDeck
        </p>
      </div>

      {/* Auth content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 lg:hidden">
          <Logo />
        </div>

        <main className="flex w-full justify-center">{children}</main>

        <div className="text-muted-foreground mt-10 text-center text-xs lg:hidden">
          &copy; {new Date().getFullYear()} PyqDeck
        </div>
      </div>
    </div>
  );
}
