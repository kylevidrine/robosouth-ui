// The whole app shell shared by every RoboSouth LA app so they cannot drift: left menu (starts collapsed to icons,
// toggle widens it; phone shows the thin icon strip), logo mark + app name at the top left, the top bar with the
// account menu (Themes, Settings, Sign Out), and one page area. ONE set of spacing and safe-area classes lives here.
// Props: appName; logoMark (a ReactNode, normally <AppLogoMark src=... /> or <AppLogoMark icon=... />);
//   items (NavItem[]), activePath, onNavigate(path); user {name, email, picture?}; onThemes, onSettings, onSignOut;
//   signedInAs (optional { name, detail }: a plain footer at the bottom of the left menu with the person's name and, under it,
//   the company they are signed into or, when the app has no company, their email; shown in the expanded menu and the phone
//   slide-out panel, hidden in the icon-only bar; apps that leave it out look exactly as before);
//   lockViewport (optional, for screens like a camera that must not scroll the page: pins the shell to the screen);
//   children = the page area (it fills the space under the top bar and scrolls by itself).
// Uses each app's own stock shadcn Sidebar pieces (via AppSidebarProvider, AppSidebar, AppTopBar). Theme colors only.
import type { ReactNode } from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import type { NavItem } from './AppSidebar';
import { AppSidebarProvider } from './AppSidebarProvider';
import { AppTopBar } from './AppTopBar';

interface AppShellProps {
  appName: string;
  logoMark: ReactNode;
  items: NavItem[];
  activePath: string;
  onNavigate: (path: string) => void;
  user: { name: string; email: string; picture?: string };
  onThemes: () => void;
  onSettings: () => void;
  onSignOut: () => void;
  signedInAs?: { name: string; detail: string };
  lockViewport?: boolean;
  children: ReactNode;
}

export function AppShell({ appName, logoMark, items, activePath, onNavigate, user, onThemes, onSettings, onSignOut, signedInAs, lockViewport, children }: AppShellProps) {
  return (
    <AppSidebarProvider
      className="h-dvh min-h-0 overflow-hidden bg-background text-foreground"
      style={lockViewport ? { position: 'fixed', inset: 0, touchAction: 'none' } : undefined}
    >
      <AppSidebar appName={appName} logoMark={logoMark} items={items} activePath={activePath} onNavigate={onNavigate} signedInAs={signedInAs} />
      <SidebarInset className="h-dvh min-h-0 overflow-hidden pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] max-md:pl-[calc(3.5rem+env(safe-area-inset-left))]">
        <AppTopBar name={user.name} email={user.email} picture={user.picture} onThemes={onThemes} onSettings={onSettings} onSignOut={onSignOut} />
        <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain">{children}</div>
      </SidebarInset>
    </AppSidebarProvider>
  );
}
