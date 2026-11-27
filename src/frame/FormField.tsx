// Shared form pieces: a label above a control with an optional hint, a Select that takes a plain option list, and a
// titled card section for grouping fields. Stock shadcn Label, Select and Card.
import type { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FormField({ label, htmlFor, hint, className, children }: { label: string; htmlFor?: string; hint?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

// A Select over a list of plain strings. When emptyLabel is given, the person can also choose "no value" (the value is '').
const NONE = '__none__';
export function OptionSelect({ value, onChange, options, placeholder, emptyLabel, id, disabled }: {
  value: string; onChange: (value: string) => void; options: string[]; placeholder?: string; emptyLabel?: string; id?: string; disabled?: boolean;
}) {
  const items = [...(emptyLabel ? [{ value: NONE, label: emptyLabel }] : []), ...options.map((o) => ({ value: o, label: o }))];
  return (
    <Select items={items} value={value === '' && emptyLabel ? NONE : value || null} onValueChange={(v) => onChange(v === NONE || v === null ? '' : String(v))} disabled={disabled}>
      <SelectTrigger id={id} className="w-full"><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>
        {items.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

export function FormSection({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">{children}</CardContent>
    </Card>
  );
}

// A labeled text box (Input) and a labeled multi-line box (Textarea), so pages do not repeat the label wiring.
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export function TextField({ label, value, onChange, type = 'text', hint, className, placeholder, required, inputMode }: {
  label: string; value: string; onChange: (value: string) => void; type?: string; hint?: string; className?: string; placeholder?: string; required?: boolean;
  inputMode?: 'text' | 'numeric' | 'decimal' | 'tel' | 'email';
}) {
  const id = `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <FormField label={required ? `${label} *` : label} htmlFor={id} hint={hint} className={className}>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} inputMode={inputMode} />
    </FormField>
  );
}

export function TextAreaField({ label, value, onChange, hint, className, rows = 3 }: { label: string; value: string; onChange: (value: string) => void; hint?: string; className?: string; rows?: number }) {
  const id = `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <FormField label={label} htmlFor={id} hint={hint} className={className}>
      <Textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={rows} />
    </FormField>
  );
}

export function CheckField({ label, checked, onChange, className }: { label: string; checked: boolean; onChange: (checked: boolean) => void; className?: string }) {
  const id = `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(Boolean(v))} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
