import confetti from "canvas-confetti";

export const fireConfetti = (xClick?: number, yClick?: number) => {
  let x = 0.5;
  let y = 0.5;

  if (xClick && yClick) {
    x = xClick / window.innerWidth;
    y = yClick / window.innerHeight;
  }

  confetti({
    particleCount: 100,
    spread: 360,
    startVelocity: 40,
    colors: ["67c6b8", "3fa796", "10b981"],
    shapes: ["circle", "square"],

    origin: { x, y },
  });
};
