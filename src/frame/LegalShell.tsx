// Shared legal and support page pieces (Privacy Policy, Terms, Support): the page frame, a section card and the
// RoboSouth LA contact link. The wording of each page lives in its own app; the layout and the contact address live here.
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const SUPPORT_EMAIL = 'info@robosouthla.com';

export function LegalShell({ appName, title, subtitle, children }: { appName: string; title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="fixed inset-0 overflow-y-auto bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
        <Separator />
        <div className="flex flex-wrap items-center justify-center gap-1 pb-6">
          <Button variant="link" nativeButton={false} render={<a href="/" />}>Back to {appName}</Button>
          <Button variant="link" nativeButton={false} render={<a href="/privacy" />}>Privacy Policy</Button>
          <Button variant="link" nativeButton={false} render={<a href="/terms" />}>Terms of Use</Button>
          <Button variant="link" nativeButton={false} render={<a href="/support" />}>Support</Button>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">{children}</CardContent>
    </Card>
  );
}

export function LegalMail() {
  return (
    <Button variant="link" className="h-auto p-0" nativeButton={false} render={<a href={`mailto:${SUPPORT_EMAIL}`} />}>
      {SUPPORT_EMAIL}
    </Button>
  );
}
