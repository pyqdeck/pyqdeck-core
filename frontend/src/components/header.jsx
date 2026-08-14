'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Menu, Bookmark } from 'lucide-react';

import {
  ClerkLoaded,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Separator } from '@/components/ui/separator';

const navLinks = [
  {
    name: 'Browse Papers',
    href: '/browse',
  },
  {
    name: 'Features',
    href: '/#features',
  },
  {
    name: 'How It Works',
    href: '/#how-it-works',
  },
];

export function Header() {
  const [open, setOpen] = useState(false);

  const { isSignedIn } = useUser();

  return (
    <header className="bg-background/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* =======================================================
            LOGO
        ======================================================= */}

        <Link href="/" className="group flex items-center gap-3">
          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl text-xs font-extrabold transition-transform duration-300 group-hover:scale-105">
            PQ
          </div>

          <div className="hidden sm:flex sm:flex-col sm:leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">
              PyqDeck
            </span>

            <span className="text-muted-foreground text-xs">
              Past year papers
            </span>
          </div>
        </Link>

        {/* =======================================================
            DESKTOP NAVIGATION
        ======================================================= */}

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Separator orientation="vertical" className="h-5" />

          <ClerkLoaded>
            {!isSignedIn ? (
              <div className="flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button variant="ghost" className="rounded-full">
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <Button className="rounded-full px-5 shadow-sm">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/browse/bookmarks">
                  <Button variant="ghost" className="gap-2 rounded-full">
                    <Bookmark className="size-4" />
                    Bookmarks
                  </Button>
                </Link>

                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </ClerkLoaded>
        </div>

        {/* =======================================================
            MOBILE NAVIGATION
        ======================================================= */}

        <div className="flex items-center gap-2 md:hidden">
          {isSignedIn && <UserButton afterSignOutUrl="/" />}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-background w-full max-w-[320px] border-l px-6 pt-8 sm:max-w-[380px]"
            >
              <div className="flex flex-col gap-6">
                {/* =======================================================
                    MOBILE LOGO
                ======================================================= */}

                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 pb-2"
                >
                  <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-xl text-xs font-extrabold">
                    PQ
                  </div>

                  <div className="flex flex-col leading-none">
                    <span className="font-display text-lg font-semibold">
                      PyqDeck
                    </span>

                    <span className="text-muted-foreground text-xs">
                      Past year papers
                    </span>
                  </div>
                </Link>

                <Separator />

                {/* =======================================================
                    MOBILE LINKS
                ======================================================= */}

                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="hover:bg-muted rounded-xl px-4 py-3 text-[15px] font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <Separator />

                {/* =======================================================
                    MOBILE AUTH
                ======================================================= */}

                <ClerkLoaded>
                  {!isSignedIn ? (
                    <div className="flex flex-col gap-3">
                      <SignInButton mode="modal">
                        <Button
                          variant="outline"
                          className="h-11 w-full rounded-xl"
                        >
                          Sign In
                        </Button>
                      </SignInButton>

                      <SignUpButton mode="modal">
                        <Button className="h-11 w-full rounded-xl">
                          Get Started
                        </Button>
                      </SignUpButton>
                    </div>
                  ) : (
                    <Link
                      href="/browse/bookmarks"
                      onClick={() => setOpen(false)}
                    >
                      <Button className="h-11 w-full justify-center gap-2 rounded-xl text-sm font-medium">
                        <Bookmark className="size-4" />
                        Bookmarks
                      </Button>
                    </Link>
                  )}
                </ClerkLoaded>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
