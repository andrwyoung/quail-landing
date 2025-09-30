import { FaCrow } from "react-icons/fa6";

export default function RequestInviteButton({
  label,
}: {
  label: string;
  size?: "default" | "large";
}) {
  return (
    <button
      type="submit"
      className={`px-6 py-2 rounded-xl bg-primary hover:bg-primary-hover
         text-text-inverse cursor-pointer font-bold 
         transition-all duration-200 hover:-translate-y-0.5 
         shadow-lg shadow-primary/25 flex flex-row gap-2 items-center`}
    >
      <FaCrow /> <span>{label}</span>
    </button>
  );
}
