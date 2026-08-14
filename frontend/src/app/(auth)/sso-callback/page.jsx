'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClerk, useSignIn, useSignUp } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { CARD_CLASS } from '@/components/auth/auth-ui';

export default function SSOCallbackPage() {
  const clerk = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();
  const hasRun = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    (async () => {
      if (!clerk.loaded || hasRun.current) return;
      hasRun.current = true;

      const goToBrowse = ({ decorateUrl }) => router.push(decorateUrl('/browse'));

      if (signIn.status === 'complete') {
        await signIn.finalize({ navigate: goToBrowse });
        return;
      }

      if (signUp.status === 'complete') {
        await signUp.finalize({ navigate: goToBrowse });
        return;
      }

      if (signUp.isTransferable) {
        const { error } = await signIn.create({ transfer: true });
        if (!error && signIn.status === 'complete') {
          await signIn.finalize({ navigate: goToBrowse });
          return;
        }
      }

      setFailed(true);
    })();
  }, [clerk, signIn, signUp, router]);

  return (
    <div className={`${CARD_CLASS} flex flex-col items-center gap-4 text-center`}>
      <div id="clerk-captcha" className="empty:hidden" />
      {failed ? (
        <>
          <p className="text-muted-foreground text-sm">We couldn&apos;t finish signing you in.</p>
          <Link href="/sign-in" className="text-primary text-sm font-medium hover:underline">
            Back to sign in
          </Link>
        </>
      ) : (
        <>
          <Loader2 className="text-primary size-6 animate-spin" />
          <p className="text-muted-foreground text-sm">Finishing sign-in…</p>
        </>
      )}
    </div>
  );
}
