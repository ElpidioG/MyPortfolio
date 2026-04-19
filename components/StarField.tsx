'use client';
import React, { useMemo, useEffect, useRef } from 'react';
import { useCursor } from '@/hooks/useCursor';

interface StarData {
  x: number;
  y: number;
  r: number;
  o: number;
  delay: number;
}

function LayerStars({
  count,
  px,
  py,
  size,
  opacity,
  seed,
}: {
  count: number;
  px: number;
  py: number;
  size: number;
  opacity: number;
  seed: number;
}) {
  const stars = useMemo<StarData[]>(() => {
    const arr: StarData[] = [];
    let s = seed * 9973;

    const rand = () => {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };

    for (let i = 0; i < count; i++) {
      arr.push({
        x: rand() * 100,
        y: rand() * 100,
        r: size * (0.5 + rand() * 0.8),
        o: opacity * (0.5 + rand() * 0.5),
        delay: rand() * 4,
      });
    }

    return arr;
  }, [count, size, opacity, seed]);

  return (
    <div
      className="galaxy-stars"
      style={{ transform: `translate(${px}px, ${py}px)` }}
      aria-hidden
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="galaxy-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.r,
            height: s.r,
            opacity: s.o,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function StarField({ className = '' }: { className?: string }) {
  const cursor = useCursor();
  const nebulaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = nebulaRef.current;
    if (!el) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, window.scrollY / max) : 0;

      // hue goes violet(292°)→red(~20°) by crossing 360° — CSS wraps automatically
      const h1 = (292 + t * 88).toFixed(1);
      const h2 = (248 + t * 127).toFixed(1);
      const x1 = (15 + t * 45).toFixed(1);
      const y1 = (t * 55).toFixed(1);
      const x2 = (88 - t * 40).toFixed(1);
      const y2 = (90 - t * 35).toFixed(1);

      el.style.background =
        `radial-gradient(ellipse 110% 90% at ${x1}% ${y1}%, oklch(0.44 0.20 ${h1} / 0.15) 0%, transparent 58%), ` +
        `radial-gradient(ellipse 90% 75% at ${x2}% ${y2}%, oklch(0.38 0.18 ${h2} / 0.12) 0%, transparent 55%)`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const px = (cursor.x - 0.5) * 40;
  const py = (cursor.y - 0.5) * 40;

  return (
    <div className={`starfield-root ${className}`.trim()} aria-hidden>
      <div ref={nebulaRef} className="starfield-nebula" />
      <div className="starfield-deep" />

      <LayerStars count={120} px={px * 0.3} py={py * 0.3} size={1} opacity={0.4} seed={1} />
      <LayerStars count={70} px={px * 0.6} py={py * 0.6} size={1.6} opacity={0.65} seed={2} />
      <LayerStars count={30} px={px * 1.0} py={py * 1.0} size={2.4} opacity={0.9} seed={3} />
    </div>
  );
}
