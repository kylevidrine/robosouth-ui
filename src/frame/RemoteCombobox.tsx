// Shared search-as-you-type picker for a long list that lives on the server (for example customers). Stock shadcn Combobox.
// The app's server answers GET <endpoint>?search=<typed> with [{ id, label }]. Calls onChange with the chosen id and label.
import { useEffect, useState } from 'react';
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';

export type PickerItem = { id: string; label: string };

export function RemoteCombobox<T extends PickerItem>({ authFetch, endpoint, value, onChange, placeholder, id, disabled }: {
  authFetch: (input: string, init?: RequestInit) => Promise<Response>; endpoint: string; value: T | null; onChange: (item: T | null) => void;
  placeholder?: string; id?: string; disabled?: boolean;
}) {
  const [items, setItems] = useState<T[]>([]);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let live = true;
    const t = setTimeout(() => {
      authFetch(`${endpoint}?${new URLSearchParams({ search: typed })}`)
        .then((r) => (r.ok ? r.json() : []))
        .then((d: T[]) => { if (live) setItems(d); })
        .catch(() => undefined);
    }, 200);
    return () => { live = false; clearTimeout(t); };
  }, [authFetch, endpoint, typed]);

  const shown = value && !items.some((i) => i.id === value.id) ? [value, ...items] : items;
  return (
    <Combobox
      items={shown}
      value={value}
      onValueChange={(v) => onChange((v as T | null) ?? null)}
      inputValue={undefined}
      onInputValueChange={(v) => setTyped(v)}
      itemToStringLabel={(i: T) => i.label}
      isItemEqualToValue={(a: T, b: T) => a.id === b.id}
      filter={null}
      disabled={disabled}
    >
      <ComboboxInput id={id} placeholder={placeholder} disabled={disabled} className="w-full" />
      <ComboboxContent>
        <ComboboxEmpty>Nothing found.</ComboboxEmpty>
        <ComboboxList>
          {(item: T) => <ComboboxItem key={item.id} value={item}>{item.label}</ComboboxItem>}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
