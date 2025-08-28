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
        scrolled ? "bg-highlight" : "bg-transparent"
      }`}
    >
      <span
        className={`transition-opacity duration-700 ${fontClass} ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </span>
    </span>
  );
}
