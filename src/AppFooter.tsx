// Shared sign-in page footer: Privacy Policy, Support, "Powered by RoboSouth LA".
// RoboSouth LA opens robosouthla.com in a new browser window.
// Links are stock shadcn link Buttons (each app's own Button), navigating on click so the
// same code works in both shadcn styles (Base UI and Radix).
// linkColor / mutedColor / strongColor: only for apps whose page is not on the shadcn theme yet
// (Sports Network keeps its white text).
import { Button } from '@/components/ui/button';

// privacyHref / supportHref: where the two links go (default: the app's own /privacy and /support pages).
// privacyHref={null} / supportHref={null}: the app has no such page yet, so the link shows grayed out and not clickable.
type AppFooterProps = {
  privacyHref?: string | null;
  supportHref?: string | null;
  linkColor?: string;
  mutedColor?: string;
  strongColor?: string;
};

export function AppFooter({ privacyHref = '/privacy', supportHref = '/support', linkColor, mutedColor, strongColor }: AppFooterProps) {
  const linkStyle = linkColor ? { color: linkColor } : undefined;
  return (
    <div className="mt-auto pt-10 flex flex-col items-center gap-1">
      <div className="flex justify-center gap-1">
        <Button type="button" variant="link" size="sm" style={linkStyle} disabled={!privacyHref}
          onClick={() => { if (privacyHref) window.location.href = privacyHref; }}>
          Privacy Policy
        </Button>
        <Button type="button" variant="link" size="sm" style={linkStyle} disabled={!supportHref}
          onClick={() => { if (supportHref) window.location.href = supportHref; }}>
          Support
        </Button>
      </div>
      <p
        className={`text-xs ${mutedColor ? '' : 'text-muted-foreground'}`}
        style={mutedColor ? { color: mutedColor } : undefined}
      >
        Powered by{' '}
        <button
          type="button"
          className={`font-semibold underline-offset-4 hover:underline ${strongColor ? '' : 'text-foreground'}`}
          style={strongColor ? { color: strongColor } : undefined}
          onClick={() => { window.open('https://robosouthla.com', '_blank', 'noopener,noreferrer'); }}
        >
          RoboSouth LA
        </button>
      </p>
    </div>
  );
}
