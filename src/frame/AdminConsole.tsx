// Shared admin console, modeled on the AI Accountant's /admin page. The app mounts it at the address /admin and
// puts NO link to it in any menu. It has its own sign-in card (email and password, or Google), a "no admin access"
// card for other accounts, and for administrators a header with the avatar menu (Sign Out only) above the Users list.
// The app's server decides who is an administrator (GET /api/auth/me returns isAdmin) and protects every
// /api/admin/* route; nothing here is trusted by the server.
// children: optional extra cards an app wants above the Users list (the Accountant puts its scan limit there).
// Stock shadcn components of each app: Avatar, Button, Card, DropdownMenu, Input, Label, Separator, Spinner, sonner.
import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Toaster } from '@/components/ui/sonner';
import { GoogleSignInButton } from '../SignInButtons';
import { AdminUsersTable } from './AdminUsersTable';

interface AdminConsoleProps {
  appName: string;
  // Where the app keeps the sign-in token (the same key its customer app uses).
  tokenKey: string;
  // The icon shown on the sign-in card.
  logo: ReactNode;
  children?: ReactNode;
}

const initials = (name: string) => name.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

type Me = { email: string; name: string; picture: string } | null;

export function AdminConsole({ appName, tokenKey, logo, children }: AdminConsoleProps) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<Me>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const authFetch = React.useCallback((input: string, init: RequestInit = {}) => {
    const token = localStorage.getItem(tokenKey);
    const headers: Record<string, string> = { ...(init.headers as Record<string, string>) };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return fetch(input, { ...init, headers });
  }, [tokenKey]);

  const loadMe = React.useCallback(async () => {
    try {
      const r = await authFetch('/api/auth/me');
      const data = await r.json();
      setUser(data.user ?? null);
      setIsAdmin(!!data.isAdmin);
    } catch {
      setUser(null);
      setIsAdmin(false);
    }
  }, [authFetch]);

  useEffect(() => {
    void loadMe().finally(() => setReady(true));
  }, [loadMe]);

  const signOut = () => {
    const token = localStorage.getItem(tokenKey);
    if (token) void fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, keepalive: true }).catch(() => {});
    localStorage.removeItem(tokenKey);
    setUser(null);
    setIsAdmin(false);
    setPassword('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const response = await fetch('/api/auth/email-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) { setError(data.error || 'Something went wrong.'); return; }
      localStorage.setItem(tokenKey, data.token);
      await loadMe();
    } catch {
      setError('Could not reach the server. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    const popup = window.open('', 'google-oauth', 'width=500,height=650');
    if (!popup) { setError('Your browser blocked the sign-in window.'); return; }
    try {
      const response = await fetch('/api/auth/url');
      const data = await response.json();
      if (!response.ok) { popup.close(); setError(data.error || 'Something went wrong.'); return; }
      popup.location.href = data.url;
      const onMessage = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        if (event.data?.type === 'oauth-error') {
          window.removeEventListener('message', onMessage);
          popup.close();
          setError(event.data.message || 'Something went wrong.');
          return;
        }
        if (event.data?.type !== 'oauth-token') return;
        window.removeEventListener('message', onMessage);
        popup.close();
        localStorage.setItem(tokenKey, event.data.token);
        await loadMe();
      };
      window.addEventListener('message', onMessage);
    } catch {
      popup.close();
      setError('Could not reach the server. Try again.');
    }
  };

  if (!ready) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background">
        <Spinner className="size-10" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="grid min-h-dvh place-items-center overflow-y-auto bg-background p-4">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader className="justify-items-center text-center">
              <Avatar className="mx-auto">
                <AvatarFallback>{logo}</AvatarFallback>
              </Avatar>
              <CardTitle>Admin</CardTitle>
              <CardDescription>Sign in to the {appName} admin console.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Email</Label>
                  <Input id="adminEmail" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Password</Label>
                  <Input id="adminPassword" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</Button>
              </form>
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>
              <GoogleSignInButton onClick={() => void google()} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background p-4">
        <div className="w-full max-w-sm">
          <Card>
            <CardHeader className="justify-items-center text-center">
              <CardTitle>Admin</CardTitle>
              <CardDescription>This account does not have admin access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" render={<a href="/" />} nativeButton={false}>Go to the app</Button>
              <Button type="button" variant="outline" className="w-full" onClick={signOut}>Sign out</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <header className="flex items-center justify-between gap-2 border-b px-4 py-3">
        <p className="truncate text-lg font-semibold">{appName} Admin</p>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full focus:outline-none" aria-label="Account menu">
            <Avatar className="cursor-pointer">
              {user.picture ? <AvatarImage src={user.picture} alt={user.name} referrerPolicy="no-referrer" /> : null}
              <AvatarFallback>{initials(user.name || user.email)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs font-normal text-muted-foreground">{user.email}</p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
              <LogOut /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {children && <div className="px-4 pt-4">{children}</div>}
      <AdminUsersTable authFetch={authFetch} currentEmail={user.email} />
      <Toaster />
    </div>
  );
}
