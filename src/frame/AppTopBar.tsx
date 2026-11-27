// Shared top bar: the menu button (phone only) on the left, the person's avatar with the account menu on the far right.
// The account menu shows name and email, then Themes, Settings and Sign out (same order in every app).
// Avatar, DropdownMenu and Button are each app's own stock shadcn components.
import { LogOut, Palette, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AppTopBarProps {
  name: string;
  email: string;
  picture?: string;
  onThemes: () => void;
  onSettings: () => void;
  onSignOut: () => void;
}

const initials = (name: string) => name.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export function AppTopBar({ name, email, picture, onThemes, onSettings, onSignOut }: AppTopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-end border-b bg-background px-4 md:px-6">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full focus:outline-hidden" aria-label="Account menu">
          <Avatar className="cursor-pointer">
            {picture ? <AvatarImage src={picture} alt={name} referrerPolicy="no-referrer" /> : null}
            <AvatarFallback>{initials(name || email)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <p className="font-medium">{name}</p>
              <p className="text-xs font-normal text-muted-foreground">{email}</p>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={onThemes}>
            <Palette /> Themes
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onSettings}>
            <Settings /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-destructive" onClick={onSignOut}>
            <LogOut /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
