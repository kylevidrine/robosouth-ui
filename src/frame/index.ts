// The app frame shared by every RoboSouth LA app: left menu bar, top bar with the account menu, Themes page,
// legal page pieces, the admin console (mounted at /admin, in no menu) and the table pager. Imported as '@robosouth/ui/frame' (separate from the
// sign-in pieces so an app that has not adopted the frame never loads these).
export { AppSidebar } from './AppSidebar';
export type { NavItem } from './AppSidebar';
export { MobileIconStrip } from './MobileIconStrip';
export { AppSidebarProvider } from './AppSidebarProvider';
export { AppTopBar } from './AppTopBar';
export { ThemeFields, ThemesPage, THEME_PRESETS, applyTheme } from './ThemeFields';
export type { Theme } from './ThemeFields';
export { SettingsPage } from './SettingsPage';
export { LegalShell, LegalSection, LegalMail, SUPPORT_EMAIL } from './LegalShell';
export { AdminConsole } from './AdminConsole';
export { AdminUsersTable } from './AdminUsersTable';
export type { AdminUserRow } from './AdminUsersTable';
export { TablePager } from './TablePager';
// List and detail pieces for CRM-style pages (customers, properties, jobs): tables, cards, forms, filters, selection.
export { StatusBadge } from './StatusBadge';
export type { StatusTone } from './StatusBadge';
export { FormField, OptionSelect, FormSection, TextField, TextAreaField, CheckField } from './FormField';
export { useServerList } from './useServerList';
export type { ServerList } from './useServerList';
export { DataTable } from './DataTable';
export type { Column } from './DataTable';
export { DetailShell, PageHeader } from './DetailShell';
export { FilterSheet } from './FilterSheet';
export { ListCard } from './ListCard';
export { SelectionBar } from './SelectionBar';
export { RemoteCombobox } from './RemoteCombobox';
export type { PickerItem } from './RemoteCombobox';
export { CardList } from './CardList';
