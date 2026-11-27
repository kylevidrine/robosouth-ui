// Thin icon strip down the left edge on a phone. The menu button at the top opens the full panel (icon and wording).
// APPROVED EXCEPTION: this strip is a custom piece, not a stock shadcn sidebar element. Kyle approved it as a one-time
// exception to the "stock shadcn only" rule (2026-11-27). It uses only stock Button and Separator plus the theme's sidebar colors.
import { Fragment } from 'react';
import type { NavItem } from './AppSidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface MobileIconStripProps {
  items: NavItem[];
  activePath: string;
  isActive: (item: string, current: string) => boolean;
  onNavigate: (path: string) => void;
}

export function MobileIconStrip({ items, activePath, isActive, onNavigate }: MobileIconStripProps) {
  return (
    <nav
      aria-label="Pages"
      className="fixed inset-y-0 left-0 z-30 flex w-14 flex-col items-center gap-1 border-r border-sidebar-border bg-sidebar pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pt-[env(safe-area-inset-top)] text-sidebar-foreground md:hidden"
    >
      <div className="flex h-16 shrink-0 items-center">
        <SidebarTrigger aria-label="Open menu" />
      </div>
      <Separator className="bg-sidebar-border" />
      <div className="flex w-full flex-1 flex-col items-center gap-1 overflow-y-auto overscroll-contain py-2">
        {items.map(({ path, label, icon: Icon }) => (
          <Fragment key={path}>
            <Button
              variant="ghost"
              size="icon"
              aria-label={label}
              aria-current={isActive(path, activePath) ? 'page' : undefined}
              className={isActive(path, activePath) ? 'bg-sidebar-accent text-sidebar-accent-foreground' : undefined}
              onClick={() => onNavigate(path)}
            >
              <Icon />
            </Button>
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
