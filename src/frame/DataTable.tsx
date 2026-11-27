// Shared wide table for desktop list pages: a search box above the table (outside it), the table, and the shared pager
// underneath. Works with useServerList. Stock shadcn Input, Table, Skeleton-free loading text; rows can be clicked.
import type { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TablePager } from './TablePager';
import type { ServerList } from './useServerList';

export type Column<T> = { key: string; header: string; cell: (row: T) => ReactNode; className?: string };

export function DataTable<T extends { id: string }>({ columns, list, searchPlaceholder, emptyText, onRowClick, toolbar }: {
  columns: Column<T>[]; list: ServerList<T>; searchPlaceholder: string; emptyText: string; onRowClick?: (row: T) => void; toolbar?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input value={list.search} onChange={(e) => list.setSearch(e.target.value)} placeholder={searchPlaceholder} className="pl-8" aria-label={searchPlaceholder} />
        </div>
        {toolbar}
      </div>
      {list.error && <p className="text-sm text-destructive">{list.error}</p>}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>{columns.map((c) => <TableHead key={c.key} className={c.className}>{c.header}</TableHead>)}</TableRow>
          </TableHeader>
          <TableBody>
            {list.rows.map((row) => (
              <TableRow key={row.id} className={onRowClick ? 'cursor-pointer' : undefined} onClick={onRowClick ? () => onRowClick(row) : undefined}>
                {columns.map((c) => <TableCell key={c.key} className={c.className}>{c.cell(row)}</TableCell>)}
              </TableRow>
            ))}
            {!list.rows.length && (
              <TableRow><TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">{list.loading ? 'Loading...' : list.search ? 'Nothing matches your search.' : emptyText}</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePager page={list.page} pageSize={list.pageSize} total={list.total} onPageChange={list.setPage} onPageSizeChange={list.setPageSize} />
    </div>
  );
}
