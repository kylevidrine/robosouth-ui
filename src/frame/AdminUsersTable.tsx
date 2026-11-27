// Shared admin Users list: search box, table, shared pager, and Delete with a confirmation dialog.
// Protected and admin accounts show a badge and have no working Delete button; the server refuses them as well.
// The app supplies authFetch (adds the sign-in token) and its own /api/admin/users routes (GET list, DELETE by email).
// Table, Input, Badge, Button, AlertDialog and Spinner are each app's own stock shadcn components.
import { useEffect, useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TablePager } from './TablePager';

export interface AdminUserRow {
  email: string;
  name: string;
  methods: string[];
  plan: string;
  signed_up: string;
  last_sign_in: string;
  protected: boolean;
  admin: boolean;
}

interface AdminUsersTableProps {
  authFetch: (input: string, init?: RequestInit) => Promise<Response>;
  currentEmail: string;
}

const PLAN_LABEL: Record<string, string> = { none: 'No access', beta: 'Beta', paid: 'Paid' };
const when = (d: string) => (d ? new Date(d).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : '-');

export function AdminUsersTable({ authFetch, currentEmail }: AdminUsersTableProps) {
  const [rows, setRows] = useState<AdminUserRow[] | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [toDelete, setToDelete] = useState<AdminUserRow | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    authFetch('/api/admin/users')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`Could not load users (${r.status})`))))
      .then(setRows)
      .catch((err) => setError(err.message));
  }, [authFetch, reload]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    setDeleteError('');
    try {
      const r = await authFetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: toDelete.email }) });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        setDeleteError(d.error || 'Could not delete that account.');
        return;
      }
      setToDelete(null);
      setReload((n) => n + 1);
    } catch {
      setDeleteError('Could not reach the server. Try again.');
    } finally {
      setDeleting(false);
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!rows) return [];
    return rows.filter((r) => !q || [r.name, r.email].some((v) => (v || '').toLowerCase().includes(q)));
  }, [rows, search]);

  if (error) return <p className="p-4 text-destructive">{error}</p>;
  if (!rows) return <div className="flex h-64 items-center justify-center"><Spinner className="size-8" /></div>;

  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const locked = (r: AdminUserRow) => r.protected || r.admin || r.email.toLowerCase() === currentEmail.toLowerCase();
  const lockedReason = (r: AdminUserRow) => (r.protected ? 'is protected and cannot be deleted' : r.admin ? 'is an administrator and cannot be deleted' : 'is your own account and cannot be deleted');

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Users <Badge variant="secondary">{rows.length}</Badge></CardTitle>
          <CardDescription>Everyone who has signed up.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            placeholder="Search name or email"
            aria-label="Search users"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="max-md:hidden">Method</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="max-lg:hidden">Signed up</TableHead>
                <TableHead className="max-lg:hidden">Last sign-in</TableHead>
                <TableHead className="max-md:hidden">Status</TableHead>
                <TableHead className="w-12"><span className="sr-only">Delete</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="py-8 text-center text-muted-foreground">No users found</TableCell></TableRow>
              ) : visible.map((r) => (
                <TableRow key={r.email}>
                  <TableCell className="whitespace-normal">{r.name || '-'}</TableCell>
                  <TableCell className="whitespace-normal break-all">{r.email}</TableCell>
                  <TableCell className="max-md:hidden"><div className="flex gap-1">{r.methods.map((m) => <Badge key={m} variant="outline">{m}</Badge>)}</div></TableCell>
                  <TableCell>{PLAN_LABEL[r.plan] || r.plan}</TableCell>
                  <TableCell className="max-lg:hidden">{when(r.signed_up)}</TableCell>
                  <TableCell className="max-lg:hidden">{when(r.last_sign_in)}</TableCell>
                  <TableCell className="max-md:hidden">
                    <div className="flex gap-1">
                      {r.admin && <Badge>Admin</Badge>}
                      {r.protected && <Badge variant="secondary">Protected</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="icon"
                      aria-label={locked(r) ? `${r.name || r.email} ${lockedReason(r)}` : `Delete ${r.name || r.email}`}
                      disabled={locked(r)}
                      onClick={() => { if (locked(r)) return; setDeleteError(''); setToDelete(r); }}
                    >
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePager page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={setPageSize} />
        </CardContent>
      </Card>
      <AlertDialog open={!!toDelete} onOpenChange={(o) => { if (!o) setToDelete(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {toDelete?.name || toDelete?.email}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the account and everything saved with it. It cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && <p className="text-sm text-destructive">{deleteError}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={deleting} onClick={(e) => { e.preventDefault(); void confirmDelete(); }}>{deleting ? 'Deleting…' : 'Delete'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
