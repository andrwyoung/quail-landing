import { AnimatePresence, motion } from "framer-motion";
import React, { useId, useState } from "react";
import { FaFeatherPointed } from "react-icons/fa6";

type faqItem = { question: string; answer: React.ReactNode };

const faqText: faqItem[] = [
  {
    question: "What is Quail?",
    answer: (
      <>
        Quail is a reader that helps you <strong>remember what you read</strong>
        . Just read normally, clip what matters, and Quail brings it back at the
        right time so ideas stick.
        <br />
        <br />
        We use well researched algorithmns that medical students and researchers
        <strong> already use</strong> to learn content extremely fast, and we
        make it simple for you to use.
      </>
    ),
  },
  {
    question: "Do I need new habits?",
    answer: (
      <>
        No, just <strong>read as usual</strong>! When something matters, you
        clip it. Then our app helps resurface the clips at the best time so you
        don&apos;t forget it.
      </>
    ),
  },
  // {
  //   question: 'What is a "clip"?',
  //   answer: (
  //     <>
  //       A clip is a <strong>highlight of a quote or short block</strong> you
  //       want to remember. Quail keeps the context and schedules it for you.
  //     </>
  //   ),
  // },
  // {
  //   question: "What is incremental reading?",
  //   answer: (
  //     <>
  //       It is <strong>short, repeated refreshers</strong> that turn your clips
  //       into long‑term memory. You do not build decks or manage schedules. Quail
  //       handles timing for you.
  //     </>
  //   ),
  // },
  {
    question: "How much time does this take?",
    answer: (
      <>
        You actually <strong>save time</strong>. Instead of rereading entire
        books or articles to refresh your memory, just review the clips that
        matter in a few minutes!
      </>
    ),
  },
  {
    question: "Can I import my reading?",
    answer: (
      <>
        Yes. Import <strong>PDFs, EPUBs, newsletters, and web clips</strong> so
        your library lives in one place.
      </>
    ),
  },
  {
    question: "Is my data private?",
    answer: (
      <>
        Your library is <strong>private</strong>. We do not sell your data, and
        you can export your content anytime.
      </>
    ),
  },
];

function FAQItem({
  question,
  children,
  open,
  onToggle,
}: {
  question: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="border-b border-text-light/30 sm:min-w-full md:min-w-3xl ">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full py-4 px-4 text-left flex items-center gap-2 group
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                     transition-colors cursor-pointer"
        >
          <FaFeatherPointed
            aria-hidden="true"
            className={`shrink-0 text-lg transition-all duration-150 group-hover:-rotate-12 ${
              open ? " text-primary/80" : ""
            }`}
          />
          <span
            className={`text-xl font-regular font-header px-2 py-0.5
          transition-colors duration-150 rounded-md group-hover:bg-primary/50
          ${open ? "bg-primary/30" : ""}`}
          >
            {question}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 4,
              marginBottom: 8,
            }}
            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="px-4 text-[0.9375rem] leading-relaxed overflow-hidden"
          >
            <div className="pt-2 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {faqText.map((faq, index) => (
        <FAQItem
          key={index}
          question={faq.question}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        >
          {faq.answer}
        </FAQItem>
      ))}
    </div>
  );
}
