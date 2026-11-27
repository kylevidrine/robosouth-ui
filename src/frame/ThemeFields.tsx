// Shared Themes page: color scheme (shadcn preset) and mode (dark or light), saved per person by each app's server.
// Mode = .dark class on <html>; preset = preset-<code> class on <body> (the classes live in each app's one CSS file).
// Select, Label and Card are each app's own stock shadcn components.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Theme {
  preset_code: string;
  color_scheme: 'dark' | 'light';
}

// shadcn presets (ui.shadcn.com/create), same set as The Bar App and the AI Accountant.
export const THEME_PRESETS = [
  { code: 'b0', label: 'Original' },
  { code: 'b4gMYn4Ai', label: 'Red' },
  { code: 'b2oDXH2VE', label: 'Green' },
  { code: 'b6F9Piktc', label: 'Yellow' },
];

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme.color_scheme !== 'light');
  document.body.classList.remove(...Array.from(document.body.classList).filter((c) => c.startsWith('preset-')));
  if (theme.preset_code !== 'b0') document.body.classList.add(`preset-${theme.preset_code}`);
}

export function ThemeFields({ theme, onThemeChange }: { theme: Theme; onThemeChange: (theme: Theme) => void }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label>Color scheme</Label>
        <Select items={THEME_PRESETS.map((p) => ({ value: p.code, label: p.label }))} value={theme.preset_code} onValueChange={(v) => onThemeChange({ ...theme, preset_code: v as string })}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {THEME_PRESETS.map((p) => <SelectItem key={p.code} value={p.code}>{p.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Mode</Label>
        <Select items={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }]} value={theme.color_scheme} onValueChange={(v) => onThemeChange({ ...theme, color_scheme: v as 'dark' | 'light' })}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function ThemesPage({ theme, onThemeChange }: { theme: Theme; onThemeChange: (theme: Theme) => void }) {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
        <h1 className="text-xl font-semibold">Themes</h1>
        <Card>
          <CardHeader>
            <CardTitle>Themes</CardTitle>
            <CardDescription>Colors for your account.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ThemeFields theme={theme} onThemeChange={onThemeChange} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
