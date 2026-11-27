// Wraps the app's stock shadcn SidebarProvider so the shared left menu always opens collapsed (icons only) on a fresh
// load, on desktop and phone alike. The toggle widens it to icons + wording. Every app uses this instead of the stock
// provider so no app has to remember to set the default. The saved sidebar cookie is never read.
import type { ComponentProps } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';

export function AppSidebarProvider(props: Omit<ComponentProps<typeof SidebarProvider>, 'defaultOpen'>) {
  return <SidebarProvider defaultOpen={false} {...props} />;
}
