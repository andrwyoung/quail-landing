import React from "react";

const features = [
  {
    title: "Fast",
    description:
      "Optimized for speed with modern tooling and minimal overhead.",
  },
  {
    title: "Flexible",
    description: "Tailor the design system to your brand with ease.",
  },
  {
    title: "Beautiful",
    description:
      "Clean typography and accessible color choices out of the box.",
  },
];

export default function Features() {
  return (
    <>
      {features.map((feature) => (
        <div key={feature.title} className="p-6 rounded-lg bg-secondary-bg">
          <h3 className={`font-header text-xl mb-2 text-text`}>
            {feature.title}
          </h3>
          <p className="text-text-light text-md">{feature.description}</p>
        </div>
      ))}
    </>
  );
}
