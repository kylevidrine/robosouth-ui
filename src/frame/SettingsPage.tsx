// Shared Settings page: a heading, then an Account card showing the person's name and email, and a Delete my account
// button that opens a confirmation dialog before anything happens. The app does the actual deletion in onDeleteAccount
// (it may return a promise); while that runs the confirm button shows the busy wording and the dialog stays open, and
// if it throws, the dialog stays open with deleteError (or the thrown message) shown. All wording comes from props.
// One column that fills a phone and sits at a readable width on desktop, same page padding as the other pages.
// Stock shadcn components: Card, Button, Separator, AlertDialog.
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
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
}

export function SettingsPage({
  name,
  email,
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
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <h1 className="text-xl font-semibold">{title}</h1>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{accountTitle}</CardTitle>
          <CardDescription>{accountDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="min-w-0">
            {name && <p className="truncate font-medium">{name}</p>}
            <p className="truncate text-sm text-muted-foreground">{email}</p>
          </div>
          <Separator />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">{deleteHint}</p>
            <Button variant="destructive" className="shrink-0" onClick={() => { setFailure(null); setOpen(true); }}>{deleteLabel}</Button>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={open} onOpenChange={(o) => { if (!busy) setOpen(o); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
            <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>{cancelLabel}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={busy} onClick={(e) => { e.preventDefault(); void confirm(); }}>
              {busy ? busyLabel : confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
