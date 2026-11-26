// Shared small label under the logo on every sign-in page (app name).
// Font, size, letter spacing and spacing live here only. Each app passes its own words.
// color: only for apps whose page is not on the shadcn theme yet (Sports Network keeps its look).
import type { ReactNode } from 'react';

type AppLabelProps = {
  children: ReactNode;
  color?: string;
};

export function AppLabel({ children, color }: AppLabelProps) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.18em] mb-8 ${color ? '' : 'text-muted-foreground'}`}
      style={color ? { color } : undefined}
    >
      {children}
    </p>
  );
}
