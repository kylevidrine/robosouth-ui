// Shared "OR" divider between the sign-in buttons and the email buttons.
// Spacing, text size and lines live here only. Separator is each app's own stock shadcn Separator.
// lineColor / textColor: only for apps whose page is not on the shadcn theme yet (Sports Network keeps its look).
import { Separator } from '@/components/ui/separator';

type OrDividerProps = {
  lineColor?: string;
  textColor?: string;
};

export function OrDivider({ lineColor, textColor }: OrDividerProps) {
  const lineStyle = lineColor ? { backgroundColor: lineColor } : undefined;
  return (
    <div className="flex items-center gap-3 w-full my-4">
      <Separator className="h-px flex-1" style={lineStyle} />
      <span
        className={`text-xs font-bold tracking-widest ${textColor ? '' : 'text-muted-foreground'}`}
        style={textColor ? { color: textColor } : undefined}
      >
        OR
      </span>
      <Separator className="h-px flex-1" style={lineStyle} />
    </div>
  );
}
