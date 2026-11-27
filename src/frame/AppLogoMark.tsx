// The small logo mark at the top of the left menu, the same size and spacing in every app: a fixed 32px rounded box
// holding either the app's logo image (src) or an icon (icon). Phone and desktop look the same; the box stays visible
// when the left menu is collapsed to icons only. Image marks get a theme border so a dark logo is still visible on a
// dark menu. Uses theme colors only (bg-primary, text-primary-foreground, border-sidebar-border); no shadcn component.
import type { ComponentType } from 'react';

interface AppLogoMarkProps {
  // Path to the app's logo image. Give this or icon.
  src?: string;
  alt?: string;
  // An icon component (for example a lucide icon) shown on the primary color.
  icon?: ComponentType<{ className?: string }>;
}

export function AppLogoMark({ src, alt = '', icon: Icon }: AppLogoMarkProps) {
  return (
    <div className="grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-sidebar-border bg-primary text-primary-foreground">
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : Icon ? <Icon className="size-4" /> : null}
    </div>
  );
}
