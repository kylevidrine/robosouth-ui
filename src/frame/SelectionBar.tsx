// Shared multi-select bar for phone lists: back arrow with the count and a Select all checkbox on the first line,
// the action buttons on the second. Sticks under the top bar while the list scrolls.
import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function SelectionBar({ count, allSelected, onSelectAll, onCancel, children }: {
  count: number; allSelected: boolean; onSelectAll: (all: boolean) => void; onCancel: () => void; children?: ReactNode;
}) {
  return (
    <div className="sticky top-16 z-10 flex flex-col gap-2 border-b bg-background px-4 py-2">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onCancel} aria-label="Stop selecting"><ArrowLeft /></Button>
        <span className="whitespace-nowrap font-medium">{count} selected</span>
        <div className="ml-auto flex items-center gap-2">
          <Checkbox id="select-all" checked={allSelected} onCheckedChange={(v) => onSelectAll(Boolean(v))} />
          <Label htmlFor="select-all" className="whitespace-nowrap">Select all</Label>
        </div>
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
