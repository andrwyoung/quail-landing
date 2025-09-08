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

  const recall = Math.round(Math.exp(-k * day) * 100);

  return (
    // [Grok] Modernized the forgetting curve component by making it declarative, adding fill area, axis labels, and CSS transitions for smoother interactions.
    <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl">
      <div className="text-xs uppercase tracking-wider font-bold text-text-light mb-2">
        Why it works
      </div>
      <h3 className="font-header text-2xl font-bold mb-4 text-text">
        The forgetting curve
      </h3>

      <div className="p-2 bg-background rounded-xl border border-border mb-4">
        <svg
          viewBox="0 0 560 280"
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
          <g fill="rgba(0,0,0,0.7)" fontSize="12">
            {/* X-axis */}
            {[0, 7, 14].map((d) => (
              <text key={d} x={px(d)} y="270" textAnchor="middle">
                {d} days
              </text>
            ))}
            {/* Y-axis */}
            <text x={34} y={py(1) - 6} textAnchor="end">
              100%
            </text>
            <text x={36} y={py(0) + 4} textAnchor="end">
              0%
            </text>
          </g>

          {/* Interactive cursor */}
          <circle
            cx={cursorX}
            cy={cursorY}
            r="5"
            fill="var(--color-primary)"
            stroke="white"
            strokeWidth="2"
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
            className="w-full h-2 appearance-none rounded-full outline-none"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${
                (day / 14) * 100
              }%, rgba(255,255,255,0.2) ${
                (day / 14) * 100
              }%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
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

      <div className="text-center mb-4">
        <div className="text-sm text-text-light">Predicted recall:</div>
        <div className="text-xl font-bold text-text">{recall}%</div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm text-text-light">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/25"></div>
          Current recall
        </div>
      </div>
    </div>
  );
}
