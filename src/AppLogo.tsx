// Shared app logo for every RoboSouth LA app's sign-in page.
// Size and shape live here only. Each app passes its own image and name.
// bordered: for logos whose background matches the page (outline shows the shape).
type AppLogoProps = {
  src: string;
  alt: string;
  bordered?: boolean;
};

export function AppLogo({ src, alt, bordered = false }: AppLogoProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`size-56 object-contain rounded-3xl mb-6 ${bordered ? 'border-2 border-border' : ''}`}
    />
  );
}
