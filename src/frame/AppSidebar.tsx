// Shared left menu bar for every RoboSouth LA app (same look as The Bar App's): the app's logo mark and name at the top,
// the collapse/expand button under it, then the pages. On a phone the same bar opens as a slide-in panel from the
// menu button in the top bar (stock shadcn Sidebar does that itself), so both always list the same pages.
// Optional signedInAs { name, detail } adds a plain footer (name, then company or email in muted text); hidden when the bar is icon-only.
// Sidebar pieces are each app's own stock shadcn components. Navigation is a callback, so any router works.
import type { ComponentType, ReactNode } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { MobileIconStrip } from './MobileIconStrip';

export interface NavItem {
  path: string;
  label: string;
  icon: ComponentType;
}

interface AppSidebarProps {
  appName: string;
  // The small logo mark shown beside the name (an icon inside a rounded square, or the app's logo image).
  logoMark: ReactNode;
  items: NavItem[];
  activePath: string;
  onNavigate: (path: string) => void;
  signedInAs?: { name: string; detail: string };
}

const isActive = (item: string, current: string) => (item === '/' ? current === '/' : current === item || current.startsWith(item + '/'));

export function AppSidebar({ appName, logoMark, items, activePath, onNavigate, signedInAs }: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const go = (path: string) => {
    if (isMobile) setOpenMobile(false);
    onNavigate(path);
  };
  return (
    <>
    {isMobile && <MobileIconStrip items={items} activePath={activePath} isActive={isActive} onNavigate={onNavigate} />}
    <Sidebar collapsible="icon" className="pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pt-[env(safe-area-inset-top)]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              {logoMark}
              <div className="grid flex-1 text-left group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">{appName}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="overscroll-contain">
        <div className="flex justify-end px-2 pt-2 max-md:hidden">
          <SidebarTrigger />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ path, label, icon: Icon }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton size="lg" isActive={isActive(path, activePath)} tooltip={label} onClick={() => go(path)}>
                    <Icon />
                    <span className="group-data-[collapsible=icon]:hidden">{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {signedInAs && (
        <SidebarFooter className="group-data-[collapsible=icon]:hidden">
          <div className="grid px-2 py-2 text-left text-sm">
            <span className="truncate">{signedInAs.name}</span>
            <span className="truncate text-muted-foreground">{signedInAs.detail}</span>
          </div>
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
    </>
  );
}
