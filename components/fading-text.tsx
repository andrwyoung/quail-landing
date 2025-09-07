export default function FadingHighlight({
  scrolled,
  fontClass = "",
  children,
}: {
  scrolled: boolean;
  fontClass?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`transition-color duration-600 rounded-md ${
        scrolled ? "" : "bg-transparent"
      }`}
    >
      <span
        className={`transition-opacity duration-700 ${fontClass} ${
          scrolled ? "opacity-20" : "opacity-100"
        }`}
      >
        {children}
      </span>
    </span>
  );
}
