// Shared "Payment received" page shown after a successful checkout, before signing in.
// Layout and sizes live here only. Each app passes its own name, logo and product name.
import { Button } from '@/components/ui/button';
import { AuthPage } from './AuthPage';
import { AppLogo } from './AppLogo';

type PaymentReceivedPageProps = {
  logoSrc: string;
  logoAlt: string;
  logoBordered?: boolean;
  productName: string;
  onContinue: () => void;
  background?: string;
};

export function PaymentReceivedPage({ logoSrc, logoAlt, logoBordered, productName, onContinue, background }: PaymentReceivedPageProps) {
  return (
    <AuthPage background={background}>
      <AppLogo src={logoSrc} alt={logoAlt} bordered={logoBordered} />
      <h1 className="text-2xl font-bold mb-2">Payment received</h1>
      <p className="text-base leading-relaxed text-muted-foreground mb-6">
        Thank you. Your {productName} account is ready. Sign in the same way you did before and you are in.
      </p>
      <Button type="button" size="lg" className="w-full h-12 text-base font-bold" onClick={onContinue}>
        Continue to sign in
      </Button>
    </AuthPage>
  );
}
