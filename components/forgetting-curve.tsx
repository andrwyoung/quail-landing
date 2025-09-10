"use client";

import { useMemo, useState } from "react";

export default function ForgettingCurve() {
  const [day, setDay] = useState(1);

  const k = 0.35;

  const px = (x: number) => 36 + x * (504 / 14);
  const py = (y: number) => 244 - y * 220;

  const points = useMemo(() => {
    const pts = [];
    for (let d = 0; d <= 14; d += 0.25) {
      const y = Math.exp(-k * d);
      pts.push(`${px(d)},${py(y)}`);
    }
    return pts.join(" L ");
  }, []);

  const d = `M ${points}`;

  const fillD = `M${px(0)},${py(1)} ${points} L${px(14)},${py(0)} L${px(
    0
  )},${py(0)} Z`;

  const cursorX = px(day);
  const cursorY = py(Math.exp(-k * day));
  const pct = (day / 14) * 100;

  const recall = Math.round(Math.exp(-k * day) * 100);

  return (
    // [Grok] Modernized the forgetting curve component by making it declarative, adding fill area, axis labels, and CSS transitions for smoother interactions.
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl">
      <div className="text-xs uppercase tracking-wider font-bold text-text-light/80 mb-2">
        Why it works
      </div>
      <h3 className="font-header text-2xl md:text-3xl font-semibold mb-4 text-text">
        The forgetting curve
      </h3>

      <div className="p-3 bg-background rounded-md border border-border mb-4">
        <svg
          viewBox="0 0 570 280"
          width="100%"
          height="260"
          role="img"
          aria-label="Interactive forgetting curve"
          className="w-full h-auto"
        >
          {/* Axes */}
          <line
            x1="36"
            y1="12"
            x2="36"
            y2="244"
            stroke="rgba(255,255,255,.22)"
            strokeWidth="1"
          />
          <line
            x1="36"
            y1="244"
            x2="540"
            y2="244"
            stroke="rgba(255,255,255,.22)"
            strokeWidth="1"
          />

          {/* Guides removed per design: no suggested review points */}

          {/* Fill under curve */}
          <path d={fillD} fill="url(#fillGradient)" />

          {/* Curve path */}
          <path
            d={d}
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="3"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--color-primary)" />
              <stop
                offset="1"
                stopColor="var(--color-primary)"
                stopOpacity="0.7"
              />
            </linearGradient>
            <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0"
                stopColor="var(--color-primary)"
                stopOpacity="0.3"
              />
              <stop
                offset="1"
                stopColor="var(--color-primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Axis labels */}
          <g fill="rgba(0,0,0,0.7)" fontSize="16">
            {/* X-axis */}
            {[0, 7, 14].map((d) => (
              <text key={d} x={px(d)} y="270" textAnchor="middle">
                {d} days
              </text>
            ))}
            {/* Y-axis */}
            <text x={42} y={py(1) - 6} textAnchor="end">
              100%
            </text>
            <text x={32} y={py(0)} textAnchor="end">
              0%
            </text>
          </g>

          {/* Legend */}
          <g transform="translate(420,10)" aria-label="Legend: current recall">
            <rect
              x="0"
              y="0"
              width="150" // wider
              height="36" // taller
              rx="14"
              ry="14"
              fill="rgba(255,255,255,0.85)" // slightly more opaque for contrast
              stroke="rgba(0,0,0,0.08)"
            />
            <circle cx="18" cy="18" r="7" fill="var(--color-primary)" />
            <text
              x="36"
              y="23" // adjust baseline
              fontSize="15" // bigger text
              fontWeight="500" // semi-bold for clarity
              fill="rgba(0,0,0,0.8)"
            >
              Current recall
            </text>
          </g>

          {/* [GPT-5] (Edit made) Make the interactive cursor dot red and larger */}
          <circle
            cx={cursorX}
            cy={cursorY}
            r="10"
            fill="var(--color-primary)"
            stroke="white"
            strokeWidth=""
            style={{ transition: "cx 0.1s ease-out, cy 0.1s ease-out" }}
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center gap-3 mb-3">
        <label htmlFor="daySlider" className="text-sm text-text-light">
          Days since you read
        </label>
        <div className="relative flex-1 mx-3">
          <input
            id="daySlider"
            type="range"
            min="0"
            max="14"
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-full h-3 appearance-none rounded-full outline-none cursor-pointer"
            aria-label="Days since you read"
            aria-valuemin={0}
            aria-valuemax={14}
            aria-valuenow={day}
            // strong fill + tinted remainder so the WHOLE bar is visible
            style={{
              background: `linear-gradient(
                to right,
                var(--color-primary) 0%,
                var(--color-primary) ${pct}%,
                rgba(20, 184, 166, 0.20) ${pct}%,
                rgba(20, 184, 166, 0.20) 100%
              )`,
              borderRadius: 9999,
            }}
          />
          {/* [GPT-5] (Edit made) Move 'Drag me' away from legend; will render below */}
          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              background: white;
              border-radius: 50%;
              border: 2px solid var(--color-primary);
              cursor: pointer;
              box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
            }
            input[type="range"]::-moz-range-thumb {
              width: 16px;
              height: 16px;
              background: white;
              border-radius: 50%;
              border: 2px solid var(--color-primary);
              cursor: pointer;
              box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
            }
          `}</style>
        </div>
        <output className="text-sm font-semibold text-text min-w-[60px]">
          {day === 1 ? "1 day" : `${day} days`}
        </output>
      </div>

      <div className="text-center flex justify-center items-center gap-4 mb-2">
        <div className="text-md text-text-light translate-y-1">
          Predicted recall:
        </div>
        <div className="text-4xl font-header font-medium text-text">
          {recall}%
        </div>
      </div>

      {/* Legend */}
      {/* <div className="flex items-center gap-4 text-sm text-text-light mt-4">
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full bg-primary"
            style={{
              boxShadow: "0 0 0 4px rgba(101, 213, 151, 0.25)",
            }}
          ></div>
          Current recall
        </div>
      </div> */}
    </div>
  );
}
