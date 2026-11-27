import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from '@/components/ui/pagination';

// Shared table footer (same as the portal and RoboServe). Imports each app's own stock shadcn Badge, Select and Pagination. Left: a "Showing a-b of N" Badge.
// Middle: a "Per page" Select (25 / 50 / 100 / 500). Right: numbered Pagination.
const PAGE_SIZES = [25, 50, 100, 500];

function pageNumbers(current: number, total: number) {
  const wanted = [...new Set([1, total, current - 1, current, current + 1])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out: (number | string)[] = [];
  wanted.forEach((p, i) => {
    if (i > 0 && p - wanted[i - 1] > 1) out.push('gap-' + p);
    out.push(p);
  });
  return out;
}

interface TablePagerProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function TablePager({ page, pageSize, total, onPageChange, onPageSizeChange }: TablePagerProps) {
  if (total === 0) return null;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * pageSize + 1;
  const end = Math.min(current * pageSize, total);
  return (
    <div className="mt-4 flex flex-col gap-3 md:grid md:grid-cols-3 md:items-center">
      <Badge className="w-fit">Showing {start}–{end} of {total}</Badge>
      <div className="flex items-center gap-2 text-sm text-muted-foreground md:justify-self-center">
        <span>Per page</span>
        <Select
          items={PAGE_SIZES.map((n) => ({ value: String(n), label: String(n) }))}
          value={String(pageSize)}
          onValueChange={(v) => { onPageSizeChange(Number(v)); onPageChange(1); }}
        >
          <SelectTrigger size="sm" className="w-20"><SelectValue /></SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="md:justify-self-end">
        {pageCount > 1 && (
          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious aria-disabled={current <= 1} className={current <= 1 ? 'pointer-events-none opacity-50' : undefined} onClick={() => onPageChange(current - 1)} />
              </PaginationItem>
              {pageNumbers(current, pageCount).map((p) => typeof p === 'string'
                ? <PaginationItem key={p}><PaginationEllipsis /></PaginationItem>
                : <PaginationItem key={p}><PaginationLink isActive={p === current} onClick={() => onPageChange(p)}>{p}</PaginationLink></PaginationItem>)}
              <PaginationItem>
                <PaginationNext aria-disabled={current >= pageCount} className={current >= pageCount ? 'pointer-events-none opacity-50' : undefined} onClick={() => onPageChange(current + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
