// Shared phone list card: a status line on top, a bold title, address lines, small chips, and an optional checkbox for
// multi-select. Stock shadcn Card, Badge and Checkbox. Tapping the card runs onClick; the checkbox runs onSelect.
import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

export function ListCard({ status, meta, title, lines, chipsLabel, chips, selecting, selected, onSelect, onClick }: {
  status?: ReactNode; meta?: ReactNode; title: string; lines?: string[]; chipsLabel?: string; chips?: string[];
  selecting?: boolean; selected?: boolean; onSelect?: (selected: boolean) => void; onClick?: () => void;
}) {
  return (
    <Card className="gap-2 py-3" data-selected={selected ? 'true' : undefined}>
      <div className="flex items-start gap-3 px-4">
        {selecting && <Checkbox className="mt-1" checked={!!selected} onCheckedChange={(v) => onSelect?.(Boolean(v))} aria-label={`Select ${title}`} />}
        <div className="min-w-0 flex-1 cursor-pointer" onClick={() => (selecting ? onSelect?.(!selected) : onClick?.())}>
          {(status || meta) && (
            <div className="mb-1 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="font-medium uppercase tracking-wide">{status}</span>
              <span>{meta}</span>
            </div>
          )}
          <div className="font-semibold">{title}</div>
          {lines?.filter(Boolean).map((l) => <div key={l} className="truncate text-sm text-muted-foreground">{l}</div>)}
          {chips && chips.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {chipsLabel && <span className="mr-1 text-sm">{chipsLabel}</span>}
              {chips.map((c, i) => <Badge key={`${c}-${i}`} variant="outline">{c}</Badge>)}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
