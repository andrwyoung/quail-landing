import ThemeImage from "./theme-image";

export default function Logo() {
  return (
    <ThemeImage
      src="/logo.png"
      alt="Quail Logo. Quack!"
      width={40}
      height={40}
      className="w-6 h-6 md:w-10 md:h-10"
    />
  );
}
