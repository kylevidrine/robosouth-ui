// Shared status pill: a stock shadcn Badge. The tone picks one of the Badge's own variants, so it follows the app's theme.
import { Badge } from '@/components/ui/badge';

export type StatusTone = 'good' | 'active' | 'neutral' | 'bad';
const VARIANT = { good: 'default', active: 'secondary', neutral: 'outline', bad: 'destructive' } as const;

export function StatusBadge({ label, tone = 'neutral', className }: { label: string; tone?: StatusTone; className?: string }) {
  return <Badge variant={VARIANT[tone]} className={className}>{label}</Badge>;
}
