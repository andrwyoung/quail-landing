import React from "react";
import { FaBoltLightning, FaBook, FaBrain } from "react-icons/fa6";

const features: {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
}[] = [
  {
    title: "Fast",
    description: (
      <>
        Get what you want to know right away
      </>
    ),
    icon: <FaBoltLightning />,
  },
  {
    title: "Flexible",
    description: (
      <>
        Support for newsletters, documents, epubs, and more
      </>
    ),
    icon: <FaBook />,
  },
  {
    title: "Beautiful",
    description: (
      <>
        Minimalist design for maximum focus.
      </>
    ),
    icon: <FaBrain />,
  },
];

export default function Features() {
  return (
    <>
      {features.map((feature) => (
        <div key={feature.title} className="p-6 rounded-lg bg-secondary-bg">
          <h3 className="font-header text-2xl mb-4 text-text font-medium flex items-center gap-2">
            <span className="translate-y-[1px] text-md text-primary">
              {feature.icon}
            </span>

            {feature.title}
          </h3>
          <p className="text-text-light text-md">{feature.description}</p>
        </div>
      ))}
    </>
  );
}
