import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo3.png"
      alt="Quail Logo. Quack!"
      width={40}
      height={40}
      className="w-6 h-6 md:w-10 md:h-10"
    />
  );
}
