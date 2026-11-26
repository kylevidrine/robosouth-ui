// Shared email form that opens under the email buttons (sign in or create account).
// Boxes, spacing, button size and wording live here only.
// Input and Button are each app's own stock shadcn components.
// onDarkPage / buttonColor: only for apps whose page is not on the shadcn theme yet
// (Sports Network keeps its see-through white boxes and red button).
import type { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type EmailFormMode = 'signin' | 'signup';

type EmailFormProps = {
  mode: EmailFormMode;
  values: { name: string; email: string; password: string };
  onChange: (field: 'name' | 'email' | 'password', value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  busy?: boolean;
  onDarkPage?: boolean;
  buttonColor?: string;
};

export function EmailForm({ mode, values, onChange, onSubmit, busy, onDarkPage, buttonColor }: EmailFormProps) {
  const signup = mode === 'signup';
  const inputClass = onDarkPage ? 'text-white placeholder:text-white/50' : undefined;
  const inputStyle = onDarkPage ? { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' } : undefined;
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-3 mt-4 text-left">
      {signup && (
        <Input id="name" placeholder="Your name" autoComplete="name" className={inputClass} style={inputStyle}
          value={values.name} onChange={(e) => onChange('name', e.target.value)} required />
      )}
      <Input id="email" type="email" placeholder="Email address" autoComplete="email" className={inputClass} style={inputStyle}
        value={values.email} onChange={(e) => onChange('email', e.target.value)} required />
      <Input id="password" type="password" placeholder={signup ? 'Password (8+ characters)' : 'Password'}
        autoComplete={signup ? 'new-password' : 'current-password'} minLength={signup ? 8 : undefined}
        className={inputClass} style={inputStyle}
        value={values.password} onChange={(e) => onChange('password', e.target.value)} required />
      <Button type="submit" className="w-full h-11 text-sm font-bold" disabled={busy}
        style={buttonColor ? { backgroundColor: buttonColor, color: '#FFFFFF' } : undefined}>
        {busy ? (signup ? 'Creating account…' : 'Signing in…') : (signup ? 'Create account' : 'Sign in')}
      </Button>
    </form>
  );
}
