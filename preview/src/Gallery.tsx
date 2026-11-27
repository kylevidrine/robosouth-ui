// Preview harness only: renders the shared pieces on hash routes (#/signin, #/app). Not part of the library.
import { useEffect, useState } from 'react';
import { Home, Users, Settings } from 'lucide-react';
import { AppLabel, AppTagline, AppFooter, AuthPage, GoogleSignInButton, AppleSignInButton, OrDivider } from '@robosouth/ui';
import { Button } from '@/components/ui/button';
import { AppSidebar, AppSidebarProvider, AppTopBar, SettingsPage, StatusBadge } from '@robosouth/ui/frame';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarInset } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

function SignIn() {
  return (
    <AuthPage>
      <div className="mt-16 mb-6 size-40 rounded-3xl bg-primary text-primary-foreground grid place-items-center text-4xl font-bold">RS</div>
      <AppLabel>RoboSouth LA</AppLabel>
      <AppTagline>Sign in to keep going.</AppTagline>
      <div className="w-full flex flex-col gap-3">
        <GoogleSignInButton onClick={() => {}} />
        <AppleSignInButton onClick={() => {}} />
      </div>
      <OrDivider />
      <AppFooter />
    </AuthPage>
  );
}

const items = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
];

function Shell({ withExtra = false, start = '/' }: { withExtra?: boolean; start?: string }) {
  const [path, setPath] = useState(start);
  return (
    <AppSidebarProvider>
      <AppSidebar appName="RoboSouth" logoMark={<Home className="size-4" />} items={items} activePath={path} onNavigate={setPath} />
      <SidebarInset className="pl-14 md:pl-0">
        <AppTopBar name="Sam Rivera" email="sam@example.com" onThemes={() => {}} onSettings={() => setPath('/settings')} onSignOut={() => {}} />
        {path === '/settings' ? (
          <SettingsPage name="Sam Rivera" email="sam@example.com" picture={withExtra ? '/sample-photo-missing.png' : undefined} onDeleteAccount={() => new Promise((r) => setTimeout(r, 800))} footer={withExtra ? <><Button variant="link">Privacy Policy</Button><Button variant="link">Support</Button></> : undefined}>
            {withExtra && (
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                  <CardDescription>Your plan.</CardDescription>
                </CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Your plan details would appear here.</p></CardContent>
              </Card>
            )}
          </SettingsPage>
        ) : (
          <main className="p-6 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">{items.find((i) => i.path === path)?.label}</h1>
            <div className="flex gap-2"><StatusBadge label="Active" /><StatusBadge label="Pending" tone="neutral" /></div>
          </main>
        )}
      </SidebarInset>
      <Toaster />
    </AppSidebarProvider>
  );
}

export function Gallery() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => { const f = () => setHash(location.hash); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  if (hash === '#/signin') return <SignIn />;
  if (hash === '#/app') return <Shell />;
  if (hash === '#/settings') return <Shell start="/settings" />;
  if (hash === '#/settings-extra') return <Shell start="/settings" withExtra />;
  return (
    <div className="p-8 flex flex-col gap-2">
      <h1 className="text-2xl font-semibold">RoboSouth UI preview</h1>
      <a className="underline" href="#/signin">Sign-in page</a>
      <a className="underline" href="#/app">App shell (menu + top bar)</a>
      <a className="underline" href="#/settings">Settings page</a>
      <a className="underline" href="#/settings-extra">Settings page with an extra section</a>
    </div>
  );
}
