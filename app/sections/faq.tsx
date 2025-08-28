import React, { useState } from "react";
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

  return (
    <div
      className=" py-4 px-4 border-b border-surface group transition-all text-left cursor-pointer"
      onClick={() => setOpen((prev) => !prev)}
    >
      <div
        className="w-full flex gap-2  items-center  transition-colors duration-200
       group"
      >
        <FaCaretDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
        <h3
          className={`text-xl font-regular font-header select-none px-1 group-hover:bg-highlight rounded-md `}
        >
          {question}
        </h3>
      </div>
      <div
        className={`select-none text-[0.9375rem] leading-relaxed transition-all duration-300 ${
          open
            ? "max-h-64 mb-2 mt-4 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
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
