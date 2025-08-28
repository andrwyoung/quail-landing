import React, { useId, useState } from "react";
import { FaCaretDown } from "react-icons/fa6";

type faqItem = { question: string; answer: React.ReactNode };

const faqText: faqItem[] = [
  {
    question: "What is Quail?",
    answer: (
      <>
        Quail is a <strong>memory-optimized reader</strong> that helps you
        retain what you read using incremental reading and spaced recall.
      </>
    ),
  },
  {
    question: "How is this different from a normal reading app?",
    answer: (
      <>
        Traditional readers focus on presentation. Quail focuses on{" "}
        <strong>retention</strong>: excerpts, prompts, and review timing so
        ideas actually stick.
      </>
    ),
  },
  {
    question: "Do I need to change how I read?",
    answer: (
      <>
        Not much. Keep reading. Quail <strong>surfaces the right chunks</strong>{" "}
        at the right time and lets you capture highlights without breaking flow.
      </>
    ),
  },
  {
    question: "Is there a free plan?",
    answer: (
      <>
        We’re in early access. You can <strong>join the waitlist</strong> in the
        hero and we’ll notify you as spots open.
      </>
    ),
  },
  {
    question: "Does it work offline?",
    answer: (
      <>
        Core reading works offline; sync and spaced review scheduling require a
        connection to keep data consistent across devices.
      </>
    ),
  },
];

function FAQItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="border-b border-surface">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className="w-full py-4 px-4 text-left flex items-center gap-2 group
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                     transition-colors cursor-pointer"
        >
          <FaCaretDown
            aria-hidden="true"
            className={`shrink-0 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
          <span className="text-xl font-regular font-header px-1 group-hover:bg-highlight rounded-md">
            {question}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`px-4 text-[0.9375rem] leading-relaxed transition-[max-height,opacity,margin] duration-300
          ${
            open
              ? "max-h-64 mb-2 mt-1 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }
        `}
      >
        {children}
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="flex flex-col gap-4">
      {faqText.map((faq, index) => (
        <FAQItem key={index} question={faq.question}>
          {faq.answer}
        </FAQItem>
      ))}
    </div>
  );
}
