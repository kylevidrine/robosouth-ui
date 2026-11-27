// The app frame shared by every RoboSouth LA app: left menu bar, top bar with the account menu, Themes page,
// legal page pieces, the admin Users list and the table pager. Imported as '@robosouth/ui/frame' (separate from the
// sign-in pieces so an app that has not adopted the frame never loads these).
export { AppSidebar } from './AppSidebar';
export type { NavItem } from './AppSidebar';
export { AppTopBar } from './AppTopBar';
export { ThemeFields, ThemesPage, THEME_PRESETS, applyTheme } from './ThemeFields';
export type { Theme } from './ThemeFields';
export { LegalShell, LegalSection, LegalMail, SUPPORT_EMAIL } from './LegalShell';
export { AdminUsersTable } from './AdminUsersTable';
export type { AdminUserRow } from './AdminUsersTable';
export { TablePager } from './TablePager';
