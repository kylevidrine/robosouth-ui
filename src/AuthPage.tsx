// Shared frame for every sign-in page: full-height page that scrolls itself (works even when an app locks body scrolling), side and bottom padding,
// extra top space for the iPhone status bar, and a centered column no wider than 24rem.
// background: only for apps whose page is not on the shadcn theme yet (Sports Network keeps navy).
// Also the shared error line shown under the sign-in form.
import type { ReactNode } from 'react';

type AuthPageProps = {
  children: ReactNode;
  background?: string;
};

export function AuthPage({ children, background }: AuthPageProps) {
  return (
    <div
      className={`h-dvh w-full overflow-y-auto px-6 pb-8 pt-[calc(env(safe-area-inset-top)+2rem)] flex flex-col items-center ${background ? '' : 'bg-background'}`}
      style={background ? { backgroundColor: background } : undefined}
    >
      <div className="w-full max-w-sm flex flex-col items-center text-center flex-1">
        {children}
      </div>
    </div>
  );
}

type AuthErrorProps = {
  message?: string | null;
  color?: string;
};

export function AuthError({ message, color }: AuthErrorProps) {
  if (!message) return null;
  return (
    <p
      className={`text-sm text-center mt-3 ${color ? '' : 'text-destructive'}`}
      style={color ? { color } : undefined}
    >
      {message}
    </p>
  );
}
