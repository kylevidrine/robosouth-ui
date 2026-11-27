// Shared shell for a record's detail page: back button, title with a status pill, a subtitle line, action buttons on the
// right, then the content. Stock shadcn Button. Page padding matches the other pages.
import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DetailShell({ title, subtitle, badge, onBack, actions, children }: {
  title: string; subtitle?: ReactNode; badge?: ReactNode; onBack: () => void; actions?: ReactNode; children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      <div className="flex flex-wrap items-start gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="Back"><ArrowLeft /></Button>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-xl font-semibold">{title}</h1>
            {badge}
          </div>
          {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}

// Standard heading row for a list page: title on the left, the add button on the right.
export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
