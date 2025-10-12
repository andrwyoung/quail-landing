import { Button } from "@/components/ui/button";
import { FaFeatherPointed } from "react-icons/fa6";

type PricingCardProps = {
  title: string;
  price: number;
  period?: string;
  original?: number;
  percentOff?: number;
  features: string[];
  cta: string;
  onClick: () => void;
  disabled?: boolean;
  badge?: string;
  subtext?: string;
  highlight?: boolean;
};

export function PricingCard({
  title,
  price,
  period,
  original,
  percentOff,
  features,
  cta,
  onClick,
  disabled,
  badge,
  subtext,
  highlight = false,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-lg border p-6 md:p-8 flex flex-col transition-all
          ${
            highlight
              ? "border-primary shadow-lg scale-[1.03] bg-primary/5"
              : "border-border bg-surface"
          }`}
    >
      {badge && (
        <div className="absolute -top-3 left-6">
          <span
            className={`inline-flex items-center rounded-xl 
                px-3 py-1 text-sm font-semibold shadow-sm ${
                  highlight
                    ? "bg-primary text-text-inverse"
                    : "bg-primary text-text-inverse"
                } `}
          >
            {badge}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-header text-2xl">{title}</h2>
        {percentOff !== undefined && (
          <span
            className="inline-flex items-center rounded-xl bg-primary/10 
          text-primary px-3 py-1 text-sm font-semibold"
          >
            {percentOff}% off
          </span>
        )}
      </div>

      <div className="mb-6 h-20">
        <div className="h-5">
          {original && (
            <div className="text-text-light text-sm line-through">
              ${original.toFixed(2)}
              {period && `/${period}`}
            </div>
          )}
        </div>

        <div className="text-4xl md:text-5xl font-header tracking-tight">
          ${price.toFixed(2)}
          {period && <span className="text-xl align-top ml-1">/{period}</span>}
        </div>
        {subtext && (
          <div className="text-xs text-text-light mt-2 ml-1">{subtext}</div>
        )}
      </div>

      <div className="h-px bg-border my-4" />

      <ul className="text-sm md:text-base text-text-light space-y-2 mb-12">
        {features.map((f, i) => (
          <li key={i}>
            <FaFeatherPointed className="inline mr-1 size-3" /> {f}
          </li>
        ))}
      </ul>

      <Button
        onClick={onClick}
        disabled={disabled}
        className={`mt-auto inline-flex items-center justify-center rounded-xl 
        border-2 
        transition-colors px-6 py-2 font-bold
        ${
          highlight
            ? "border-primary bg-primary text-text-inverse hover:bg-accent  hover:text-primary"
            : "border-primary bg-surface text-primary hover:text-text-inverse hover:bg-primary "
        }`}
      >
        {cta}
      </Button>
    </div>
  );
}
