// Shared phone version of a list page: a search box on top, a stack of cards, then the shared pager. Pair it with
// DataTable (wide screens) and the same useServerList. Stock shadcn Input and Card pieces through ListCard.
import type { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { TablePager } from './TablePager';
import type { ServerList } from './useServerList';

export function CardList<T extends { id: string }>({ list, renderCard, searchPlaceholder, emptyText, toolbar }: {
  list: ServerList<T>; renderCard: (row: T) => ReactNode; searchPlaceholder: string; emptyText: string; toolbar?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input value={list.search} onChange={(e) => list.setSearch(e.target.value)} placeholder={searchPlaceholder} className="pl-8" aria-label={searchPlaceholder} />
      </div>
      {toolbar}
      {list.error && <p className="text-sm text-destructive">{list.error}</p>}
      {list.rows.map((row) => <div key={row.id}>{renderCard(row)}</div>)}
      {!list.rows.length && !list.error && (
        <p className="py-10 text-center text-sm text-muted-foreground">{list.loading ? 'Loading...' : list.search ? 'Nothing matches your search.' : emptyText}</p>
      )}
      <TablePager page={list.page} pageSize={list.pageSize} total={list.total} onPageChange={list.setPage} onPageSizeChange={list.setPageSize} />
    </div>
  );
}
