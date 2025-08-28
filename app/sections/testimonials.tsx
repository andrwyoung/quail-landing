import React from "react";

const testimonials: {
  name: string;
  role: string;
  quote: React.ReactNode;
}[] = [
  {
    name: "Alice Nguyen",
    role: "Student",
    quote: (
      <>
        Quail has completely changed the way I read. I actually{" "}
        <strong>remember things</strong> now instead of{" "}
        <strong>rereading over and over</strong>.
      </>
    ),
  },
  {
    name: "Marcus Brown",
    role: "Researcher",
    quote: (
      <>
        I can <strong>pick up where I left off</strong> without losing context.
        It's like the app understands how <strong>memory really works</strong>.
      </>
    ),
  },
];

export default function Testimonials() {
  return (
    <div className="grid md:grid-cols-2 gap-12">
      {testimonials.map((t) => (
        <div key={t.name} className="p-0">
          {" "}
          {/* no background, no padding */}
          <p className="text-md text-text-light mb-4 italic">“{t.quote}”</p>
          <h4 className="font-header text-xl text-text font-medium">
            {t.name}
          </h4>
          <p className="text-text-light text-sm">{t.role}</p>
        </div>
      ))}
    </div>
  );
}
