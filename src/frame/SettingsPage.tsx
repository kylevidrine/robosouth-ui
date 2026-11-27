// Shared Settings page, the same three-card layout in every app: a heading, an Account card (the person's picture, then
// labeled Name and Email lines), any extra cards the app supplies between Account and Delete (for example Subscription),
// and a separate Delete my account card with its own description and a full-width-on-phone red button. The button opens
// a confirmation dialog before anything happens. The app does the actual deletion in onDeleteAccount (it may return a
// promise); while that runs the confirm button shows the busy wording and the dialog stays open, and if it throws, the
// dialog stays open with deleteError (or the thrown message) shown. All wording comes from props.
// Everything sits in ONE centered column: full width with side padding on a phone, a readable width centered on desktop.
// Optional picture: the person's photo address, shown in a stock Avatar; when it is missing or fails to load, the Avatar
// shows the first letter of the name (or email).
// Optional children: extra cards rendered between the Account card and the Delete my account card.
// Optional footer: rendered centered below the cards, meant for a row of links (Privacy Policy, Support, Terms).
// The confirm button is a stock Button with variant="destructive" (not AlertDialogAction, whose props differ between the
// Base UI and Radix shadcn styles), so it type-checks and shows the theme's red in both styles.
// Stock shadcn components: Card, Button, Label, AlertDialog, Avatar (apps without it: npx shadcn@latest add avatar).
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
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
  // Extra cards shown between the Account card and the Delete my account card.
  children?: ReactNode;
  // Shown centered below the cards, for example a row of links.
  footer?: ReactNode;
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
  deleteHint = 'Permanently delete your account and everything saved with it. This cannot be undone.',
  confirmTitle = 'Delete your account?',
  confirmDescription = 'This permanently deletes your account and everything saved with it. It cannot be undone.',
  confirmLabel = 'Delete my account',
  busyLabel = 'Deleting…',
  cancelLabel = 'Cancel',
  deleteError,
  children,
  footer,
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
          <Avatar>
            {picture && <AvatarImage src={picture} alt={name} referrerPolicy="no-referrer" />}
            <AvatarFallback>{(name || email).trim().charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {name && (
            <div className="flex flex-col gap-1">
              <Label>Name</Label>
              <p className="text-sm">{name}</p>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <p className="text-sm">{email}</p>
          </div>
        </CardContent>
      </Card>
      {children}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{deleteLabel}</CardTitle>
          <CardDescription>{deleteHint}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full sm:w-auto" onClick={() => { setFailure(null); setOpen(true); }}>{deleteLabel}</Button>
        </CardContent>
      </Card>
      {footer && <div className="flex justify-center gap-1">{footer}</div>}
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
