// Shared filter panel: a stock shadcn Sheet with a title, the filter fields, and Reset / Apply buttons at the bottom.
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function FilterSheet({ open, onOpenChange, title, description, onApply, onReset, applyLabel = 'Apply', side = 'bottom', children }: {
  open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; onApply: () => void; onReset?: () => void;
  applyLabel?: string; side?: 'bottom' | 'right'; children: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={side} className="max-h-[90dvh]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4">{children}</div>
        <SheetFooter className="flex-row gap-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {onReset && <Button variant="outline" className="flex-1" onClick={onReset}>Reset</Button>}
          <Button className="flex-1" onClick={onApply}>{applyLabel}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
