import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CARD_CLASS =
  'bg-card text-card-foreground w-full max-w-sm rounded-2xl border p-8 shadow-sm';

/** One button per OAuth strategy Clerk actually reports as enabled -- icon
 * and label come straight from Clerk's own environment response, so a new
 * provider connected in the dashboard shows up without a code change. */
export function SocialButton({ provider, onClick, disabled }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
      className="h-11 w-full gap-2.5 rounded-xl text-sm font-medium"
    >
      {provider.logoUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={provider.logoUrl} alt="" className="size-4" />
      )}
      Continue with {provider.name}
    </Button>
  );
}

export function OrDivider({ label = 'or' }) {
  return (
    <div className="text-muted-foreground flex items-center gap-3 text-xs">
      <span className="bg-border h-px flex-1" />
      {label}
      <span className="bg-border h-px flex-1" />
    </div>
  );
}

export function FieldMessage({ error }) {
  if (!error) return null;
  return (
    <p className="text-destructive text-xs">
      {error.longMessage ?? error.message}
    </p>
  );
}

export function AuthField({ id, label, error, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} className="h-11 rounded-xl px-3.5" aria-invalid={!!error} {...inputProps} />
      <FieldMessage error={error} />
    </div>
  );
}

export function GlobalAuthError({ errors }) {
  const err = errors?.global?.[0];
  if (!err) return null;
  return (
    <p className="bg-destructive/10 text-destructive rounded-lg px-3 py-2 text-sm">
      {err.longMessage ?? err.message}
    </p>
  );
}

export const submitButtonClass =
  'h-11 w-full rounded-xl text-sm font-semibold shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100';
