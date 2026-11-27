// Shared hook for a list that lives on the server: search (waits a moment after typing), page, page size and extra filters.
// The app's server answers GET <path>?search&page&perPage&<filters> with { items, total }. Reload re-reads the same page.
import { useCallback, useEffect, useRef, useState } from 'react';

export type ServerList<T> = {
  rows: T[]; total: number; loading: boolean; error: string;
  search: string; setSearch: (v: string) => void;
  page: number; setPage: (v: number) => void;
  pageSize: number; setPageSize: (v: number) => void;
  reload: () => void;
};

export function useServerList<T>(authFetch: (input: string, init?: RequestInit) => Promise<Response>, path: string, filters: Record<string, string> = {}): ServerList<T> {
  const [rows, setRows] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearchState] = useState('');
  const [typed, setTyped] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSizeState] = useState(25);
  const [tick, setTick] = useState(0);
  const filterKey = JSON.stringify(filters);
  const first = useRef(true);

  const setSearch = useCallback((v: string) => { setTyped(v); setPage(1); }, []);
  const setPageSize = useCallback((v: number) => { setPageSizeState(v); setPage(1); }, []);

  useEffect(() => {
    const t = setTimeout(() => setSearchState(typed), first.current ? 0 : 250);
    first.current = false;
    return () => clearTimeout(t);
  }, [typed]);

  // Changing a filter goes back to page 1.
  useEffect(() => { setPage(1); }, [filterKey]);

  useEffect(() => {
    let live = true;
    setLoading(true);
    const params = new URLSearchParams({ ...JSON.parse(filterKey), search, page: String(page), perPage: String(pageSize) });
    authFetch(`${path}?${params}`)
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || 'Could not load the list.');
        if (live) { setRows(d.items); setTotal(d.total); setError(''); }
      })
      .catch((e) => { if (live) setError(e instanceof Error ? e.message : 'Could not load the list.'); })
      .finally(() => { if (live) setLoading(false); });
    return () => { live = false; };
  }, [authFetch, path, filterKey, search, page, pageSize, tick]);

  return { rows, total, loading, error, search: typed, setSearch, page, setPage, pageSize, setPageSize, reload: () => setTick((n) => n + 1) };
}
