// Shared pair of email buttons under the OR divider: "Sign in with Email" and "Create account".
// Size, corners, font and spacing live here only. Button is each app's own stock shadcn Button.
// signInOpen / createOpen: the button whose form is open turns "secondary" (Receipts behavior).
// fillColor / outlineColor / textColor: only for apps whose page is not on the shadcn theme yet
// (Sports Network keeps its red fill and white outline).
import { Button } from '@/components/ui/button';

type EmailButtonsProps = {
  onSignIn: () => void;
  onCreate: () => void;
  signInOpen?: boolean;
  fillColor?: string;
  outlineColor?: string;
  textColor?: string;
};

const shape = 'flex-1 h-11 text-sm font-bold';

export function EmailButtons({ onSignIn, onCreate, signInOpen, fillColor, outlineColor, textColor }: EmailButtonsProps) {
  return (
    <div className="flex gap-3 w-full">
      <Button
        type="button"
        className={shape}
        variant={signInOpen ? 'secondary' : 'default'}
        style={fillColor ? { backgroundColor: fillColor, color: textColor } : undefined}
        onClick={onSignIn}
      >
        Sign in with Email
      </Button>
      <Button
        type="button"
        variant="outline"
        className={shape}
        style={outlineColor ? { borderColor: outlineColor, borderWidth: 2, backgroundColor: 'transparent', color: textColor } : undefined}
        onClick={onCreate}
      >
        Create account
      </Button>
    </div>
  );
}
