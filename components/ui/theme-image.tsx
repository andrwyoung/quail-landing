import Image from "next/image";

export default function ThemeImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  // darkSrc will ALWAYS be -lighter
  const darkSrc = src.replace(".png", "-lighter.png");

  return (
    <>
      {/* Light mode image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        priority={priority}
        height={height}
        className={`${className} dark:hidden`}
      />
      {/* Dark mode image */}
      <Image
        src={darkSrc}
        alt={alt}
        width={width}
        priority={priority}
        height={height}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
