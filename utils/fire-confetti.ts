import confetti from "canvas-confetti";

export const fireConfetti = (e?: React.MouseEvent) => {
  const x = e ? e.clientX / window.innerWidth : 0.5;
  const y = e ? e.clientY / window.innerHeight : 0.5;

  confetti({
    particleCount: 100,
    spread: 360,

    origin: { x, y },
  });
};
