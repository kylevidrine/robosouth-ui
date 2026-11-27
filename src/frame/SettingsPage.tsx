// Shared Settings page: a heading, then an Account card showing the person's name and email, and a Delete my account
// button that opens a confirmation dialog before anything happens. The app does the actual deletion in onDeleteAccount
// (it may return a promise); while that runs the confirm button shows the busy wording and the dialog stays open, and
// if it throws, the dialog stays open with deleteError (or the thrown message) shown. All wording comes from props.
// Everything (heading, Account card, and any children) sits in ONE centered column: full width with side padding on a
// phone, a readable width centered on desktop, so it lines up with the centered links row under it.
// Optional picture: the person's photo address, shown in a stock Avatar beside the name and email; when it is missing
// or fails to load, the Avatar shows the first letter of the name (or email).
// Optional children: extra sections the app wants shown under the Account card (the Delete my account area sits inside
// that card, so extras follow it; for example a subscription card). They render in the same column; with no children the page is unchanged.
// The confirm button is a stock Button with variant="destructive" (not AlertDialogAction, whose props differ between the
// Base UI and Radix shadcn styles), so it type-checks and shows the theme's red in both styles.
// Stock shadcn components: Card, Button, Separator, AlertDialog, Avatar (apps without it: npx shadcn@latest add avatar).
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SettingsPageProps {
  name: string;
  email: string;
  // Optional photo address for the Avatar; without it the Avatar shows the first initial.
  picture?: string | null;
  onDeleteAccount: () => void | Promise<void>;
  title?: string;
  accountTitle?: string;
  accountDescription?: string;
  deleteLabel?: string;
  deleteHint?: string;
  confirmTitle?: string;
  confirmDescription?: string;
  confirmLabel?: string;
  busyLabel?: string;
  cancelLabel?: string;
  // Shown inside the dialog when the app reports the deletion failed.
  deleteError?: string | null;
  // Extra sections shown below the Account card.
  children?: ReactNode;
}

export function SettingsPage({
  name,
  email,
  picture,
  onDeleteAccount,
  title = 'Settings',
  accountTitle = 'Account',
  accountDescription = 'The account you are signed in with.',
  deleteLabel = 'Delete my account',
  deleteHint = 'Permanently deletes your account and everything saved with it.',
  confirmTitle = 'Delete your account?',
  confirmDescription = 'This permanently deletes your account and everything saved with it. It cannot be undone.',
  confirmLabel = 'Delete my account',
  busyLabel = 'Deleting…',
  cancelLabel = 'Cancel',
  deleteError,
  children,
}: SettingsPageProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  const confirm = async () => {
    setBusy(true);
    setFailure(null);
    try {
      await onDeleteAccount();
      setOpen(false);
    } catch (e) {
      setFailure(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const error = deleteError ?? failure;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4 md:p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{accountTitle}</CardTitle>
          <CardDescription>{accountDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar>
              {picture && <AvatarImage src={picture} alt="" />}
              <AvatarFallback>{(name || email).trim().charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              {name && <p className="truncate font-medium">{name}</p>}
              <p className="truncate text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{deleteHint}</p>
            <Button variant="destructive" className="shrink-0" onClick={() => { setFailure(null); setOpen(true); }}>{deleteLabel}</Button>
          </div>
        </CardContent>
      </Card>
      {children}
      <AlertDialog open={open} onOpenChange={(o) => { if (!busy) setOpen(o); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>{cancelLabel}</AlertDialogCancel>
            <Button variant="destructive" disabled={busy} onClick={() => { void confirm(); }}>
              {busy ? busyLabel : confirmLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
