import Image from "next/image";

interface ThemeImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ThemeImage({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className = "",
}: ThemeImageProps) {
  return (
    <div className="relative">
      {/* Light mode image */}
      <Image
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} dark:hidden`}
      />
      {/* Dark mode image */}
      <Image
        src={darkSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} hidden dark:block`}
      />
    </div>
  );
}
