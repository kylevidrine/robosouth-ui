// Shared tagline (one sentence about the app) on every sign-in page.
// Text size, line spacing and spacing live here only. Each app passes its own words.
// color: only for apps whose page is not on the shadcn theme yet (Sports Network keeps its look).
import type { ReactNode } from 'react';

type AppTaglineProps = {
  children: ReactNode;
  color?: string;
};

export function AppTagline({ children, color }: AppTaglineProps) {
  return (
    <p
      className={`text-base leading-relaxed mb-8 ${color ? '' : 'text-muted-foreground'}`}
      style={color ? { color } : undefined}
    >
      {children}
    </p>
  );
}
