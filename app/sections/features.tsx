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
        Optimized for speed with modern tooling and minimal overhead. Tailor the
        design system to your brand <strong>with ease</strong>.
      </>
    ),
    icon: <FaBook />,
  },
  {
    title: "Flexible",
    // description: (
    //   <>
    //     Optimized for speed with modern tooling and minimal overhead.{" "}
    //     <span className="bg-highlight font-bold px-0.5">
    //       Tailor the design system
    //     </span>{" "}
    //     system to your brand <strong>with ease</strong>.
    //   </>
    // ),
    description: (
      <>
        Optimized for speed with modern tooling and minimal overhead. Tailor the
        design system to your brand <strong>with ease</strong>.
      </>
    ),
    icon: <FaBoltLightning />,
  },
  {
    title: "Beautiful",
    description: (
      <>
        Optimized for speed with modern tooling and minimal overhead. Tailor the
        design
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
