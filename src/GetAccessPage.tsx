// Shared "Get access" page shown right after sign-in: enter a beta code, or buy.
// Layout, sizes and wording live here only. Each app passes its own name, logo and handlers.
// Input and Button are each app's own stock shadcn components.
// onBuy / buyLabel: leave both out for an app that only uses beta codes (no Buy button, no OR divider).
// background: only for apps whose page is not on the shadcn theme yet.
import type { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AuthPage, AuthError } from './AuthPage';
import { AppLogo } from './AppLogo';
import { AppLabel } from './AppLabel';
import { OrDivider } from './OrDivider';

type GetAccessPageProps = {
  logoSrc: string;
  logoAlt: string;
  logoBordered?: boolean;
  appName: string;
  email: string;
  accessCode: string;
  onAccessCodeChange: (value: string) => void;
  onSubmitCode: (e: FormEvent<HTMLFormElement>) => void;
  onBuy?: () => void;
  buyLabel?: string;
  onSignOut: () => void;
  busy?: boolean;
  error?: string | null;
  notice?: string;
  background?: string;
  labelColor?: string;
};

export function GetAccessPage(props: GetAccessPageProps) {
  const { logoSrc, logoAlt, logoBordered, email, accessCode, onAccessCodeChange, onSubmitCode, onBuy, buyLabel, onSignOut, busy, error, notice, background, labelColor, appName } = props;
  const canBuy = !!onBuy && !!buyLabel;
  return (
    <AuthPage background={background}>
      <AppLogo src={logoSrc} alt={logoAlt} bordered={logoBordered} />
      <AppLabel color={labelColor}>{appName}</AppLabel>
      <h1 className="text-2xl font-bold mb-2">Get access</h1>
      <p className="text-base leading-relaxed text-muted-foreground mb-6">
        Signed in as {email}. {canBuy ? `Enter your beta access code, or ${buyLabel.toLowerCase().startsWith('buy') ? buyLabel.charAt(0).toLowerCase() + buyLabel.slice(1) : buyLabel}.` : 'Enter your beta access code.'}
      </p>
      {notice && <p className="text-sm text-center mb-4">{notice}</p>}
      <form onSubmit={onSubmitCode} className="w-full flex flex-col gap-3">
        <Input id="access-code" placeholder="Beta access code" autoComplete="off" value={accessCode} onChange={(e) => onAccessCodeChange(e.target.value)} required />
        <Button type="submit" size="lg" className="w-full h-12 text-base font-bold" disabled={busy}>
          {busy ? 'Please wait…' : 'Use beta code'}
        </Button>
      </form>
      {canBuy && (
        <>
          <OrDivider />
          <Button type="button" variant="outline" size="lg" className="w-full h-12 text-base font-bold" disabled={busy} onClick={onBuy}>
            {buyLabel}
          </Button>
        </>
      )}
      <AuthError message={error} />
      <Button type="button" variant="ghost" className="w-full mt-3" onClick={onSignOut}>
        Sign out
      </Button>
    </AuthPage>
  );
}
