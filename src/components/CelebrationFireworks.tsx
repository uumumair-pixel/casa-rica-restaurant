import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationFireworksProps {
  orderNumber?: string;
}

const LUXURY_GOLD_PALETTE = [
  '#C5A059', // CASA RICA Signature Gold
  '#F3E5C8', // Champagne Gold
  '#FFD700', // Bright Gold
  '#F59E0B', // Warm Amber
  '#10B981', // Emerald Gem
  '#FFFFFF', // Starlight White
  '#E6C280', // Royal Gold
  '#EC4899', // Ruby Sparkle
];

export const CelebrationFireworks: React.FC<CelebrationFireworksProps> = ({ orderNumber }) => {
  const hasFiredRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the celebration fires strictly ONCE per unique order confirmation
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;

    // Small delay to ensure the modal & DOM are fully painted
    const initialTimer = setTimeout(() => {
      // 1. Initial Center "Patakha" Firework Burst (Upward pop)
      confetti({
        particleCount: 70,
        spread: 80,
        startVelocity: 45,
        origin: { y: 0.45, x: 0.5 },
        colors: LUXURY_GOLD_PALETTE,
        ticks: 200,
        gravity: 0.9,
        scalar: 1.1,
        shapes: ['circle', 'square'],
        zIndex: 99999,
        disableForReducedMotion: true,
      });

      // 2. Left Staggered Sparkle Burst
      const timer1 = setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 65,
          startVelocity: 38,
          origin: { x: 0.25, y: 0.5 },
          colors: ['#C5A059', '#FFD700', '#F3E5C8', '#FFFFFF', '#10B981'],
          ticks: 180,
          gravity: 0.95,
          scalar: 1.0,
          zIndex: 99999,
          disableForReducedMotion: true,
        });
      }, 250);

      // 3. Right Staggered Sparkle Burst
      const timer2 = setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 65,
          startVelocity: 38,
          origin: { x: 0.75, y: 0.5 },
          colors: ['#C5A059', '#FFD700', '#F3E5C8', '#FFFFFF', '#F59E0B'],
          ticks: 180,
          gravity: 0.95,
          scalar: 1.0,
          zIndex: 99999,
          disableForReducedMotion: true,
        });
      }, 500);

      // 4. Final Gentle Star Shower / Gold Shimmer
      const timer3 = setTimeout(() => {
        confetti({
          particleCount: 35,
          spread: 100,
          startVelocity: 25,
          origin: { y: 0.35, x: 0.5 },
          colors: ['#F3E5C8', '#FFD700', '#C5A059', '#FFFFFF'],
          ticks: 160,
          gravity: 0.7,
          scalar: 0.9,
          zIndex: 99999,
          disableForReducedMotion: true,
        });
      }, 800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }, 100);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [orderNumber]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      {/* Subtle floating gold sparkle particles in the card background */}
      <div className="absolute top-4 left-1/4 w-2 h-2 rounded-full bg-[#FFD700] opacity-75 blur-[1px] animate-ping" />
      <div className="absolute top-8 right-1/4 w-1.5 h-1.5 rounded-full bg-[#F3E5C8] opacity-80 blur-[0.5px] animate-pulse" />
      <div className="absolute top-16 left-1/3 w-1 h-1 rounded-full bg-[#10B981] opacity-70 animate-ping" />
    </div>
  );
};
