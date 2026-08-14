'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  AuthField,
  CARD_CLASS,
  GlobalAuthError,
  OrDivider,
  SocialButton,
  submitButtonClass,
} from '@/components/auth/auth-ui';
import { socialProviders, attributes } from '@/lib/clerk-auth-config.json';

function identifierLabel() {
  const parts = [];
  if (attributes.email_address?.enabled) parts.push('Email');
  if (attributes.username?.enabled) parts.push('username');
  return parts.length ? parts.join(' or ') : 'Email or username';
}

export default function SignInPage() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();
  const busy = fetchStatus === 'fetching';

  const [step, setStep] = useState('sign-in');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const finalizeAndGo = async () => {
    await signIn.finalize({
      navigate: ({ decorateUrl }) => router.push(decorateUrl('/browse')),
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await signIn.password({ identifier, password });
    if (error) return;
    if (signIn.status === 'complete') await finalizeAndGo();
  };

  const handleSocial = async (strategy) => {
    await signIn.sso({
      strategy,
      redirectCallbackUrl: `${window.location.origin}/sso-callback`,
      redirectUrl: '/browse',
    });
  };

  const handleSendReset = async (e) => {
    e.preventDefault();
    const { error } = await signIn.create({ identifier: resetEmail });
    if (error) return;
    const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
    if (sendError) return;
    setStep('reset-code');
  };

  const handleSubmitReset = async (e) => {
    e.preventDefault();
    const { error: verifyError } =
      await signIn.resetPasswordEmailCode.verifyCode({
        code: resetCode,
      });
    if (verifyError) return;
    const { error: submitError } =
      await signIn.resetPasswordEmailCode.submitPassword({
        password: newPassword,
      });
    if (submitError) return;
    if (signIn.status === 'complete') await finalizeAndGo();
  };

  if (step === 'forgot' || step === 'reset-code') {
    return (
      <div className={CARD_CLASS}>
        <h1 className="font-display text-2xl font-semibold">
          Reset your password
        </h1>
        <p className="text-muted-foreground mt-1.5 text-sm">
          {step === 'forgot'
            ? "Enter your email and we'll send you a reset code."
            : `Enter the code we sent to ${resetEmail} and choose a new password.`}
        </p>

        {step === 'forgot' ? (
          <form onSubmit={handleSendReset} className="mt-6 flex flex-col gap-4">
            <AuthField
              id="reset-email"
              label="Email address"
              type="email"
              autoComplete="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              error={errors?.fields?.identifier}
              required
            />
            <GlobalAuthError errors={errors} />
            <Button type="submit" disabled={busy} className={submitButtonClass}>
              Send reset code
            </Button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmitReset}
            className="mt-6 flex flex-col gap-4"
          >
            <AuthField
              id="reset-code"
              label="Reset code"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              error={errors?.fields?.code}
              required
            />
            <AuthField
              id="new-password"
              label="New password"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors?.fields?.password}
              required
            />
            <GlobalAuthError errors={errors} />
            <Button type="submit" disabled={busy} className={submitButtonClass}>
              Set new password
            </Button>
          </form>
        )}

        <button
          type="button"
          onClick={() => setStep('sign-in')}
          className="text-muted-foreground hover:text-foreground mt-6 text-sm font-medium"
        >
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className={CARD_CLASS}>
      <h1 className="font-display text-2xl font-semibold">Welcome back</h1>
      <p className="text-muted-foreground mt-1.5 text-sm">
        Sign in to keep browsing your past papers.
      </p>

      {socialProviders.length > 0 && (
        <>
          <div className="mt-6 flex flex-col gap-2.5">
            {socialProviders.map((provider) => (
              <SocialButton
                key={provider.strategy}
                provider={provider}
                disabled={busy}
                onClick={() => handleSocial(provider.strategy)}
              />
            ))}
          </div>
          <div className="my-6">
            <OrDivider />
          </div>
        </>
      )}

      <form
        onSubmit={handleSignIn}
        className={`flex flex-col gap-4 ${socialProviders.length > 0 ? '' : 'mt-6'}`}
      >
        <AuthField
          id="identifier"
          label={identifierLabel()}
          autoComplete="username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          error={errors?.fields?.identifier}
          required
        />
        <div>
          <AuthField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors?.fields?.password}
            required
          />
          <button
            type="button"
            onClick={() => setStep('forgot')}
            className="text-primary mt-2 text-xs font-medium hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <GlobalAuthError errors={errors} />
        <Button type="submit" disabled={busy} className={submitButtonClass}>
          Sign in
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          href="/sign-up"
          className="text-primary font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
