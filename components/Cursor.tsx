'use client';
import { useEffect, useRef } from 'react';

const TRAIL = 28;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const history = useRef(Array.from({ length: TRAIL }, () => ({ x: -300, y: -300 })));
  const mouse = useRef({ x: -300, y: -300 });
  const head = useRef({ x: -300, y: -300 });
  const scale = useRef(1);
  const isClickable = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      isClickable.current = !!(e.target as HTMLElement).closest(
        'button, a, input, select, [role="button"]'
      );
    };

    document.addEventListener('mousemove', onMove);

    let raf: number;

    const loop = () => {
      head.current.x += (mouse.current.x - head.current.x) * 0.14;
      head.current.y += (mouse.current.y - head.current.y) * 0.14;

      const targetScale = isClickable.current ? 1.7 : 1;
      scale.current += (targetScale - scale.current) * 0.18;

      history.current = [{ ...head.current }, ...history.current.slice(0, TRAIL - 1)];

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${head.current.x}px, ${head.current.y}px) translate(-50%, -50%) scale(${scale.current.toFixed(3)})`;
      }
const TRAIL_OFFSET = 4;
     trailRefs.current.forEach((el, i) => {
  if (!el) return;

  const p =
    history.current[i + TRAIL_OFFSET] ??
    history.current[history.current.length - 1];

  const t = (i + 1) / TRAIL;

  // smaller trail so it doesn't bulge around the main dot
  const s = Math.max(0.08, 0.78 - t * 0.62);

  el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${s.toFixed(3)})`;

  // lighter early nodes so they don't create an oval core
  el.style.opacity = ((1 - t) * 0.22).toFixed(3);
});
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
      }}
    >
      {Array.from({ length: TRAIL }, (_, i) => (
        <div
          key={i}
          ref={el => {
            trailRefs.current[i] = el;
          }}
          style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: 8,
  height: 8,
  borderRadius: '50%',
  background: 'var(--accent-dim)', // softer fill
  boxShadow: `
    0 0 6px var(--accent-glow),
    0 0 12px oklch(0.70 0.17 290 / 0.12)
  `,

  willChange: 'transform, opacity',
}}
        />
      ))}

      <div
        ref={dotRef}
     style={{
  position: 'absolute',
  top: 0,
  left: 0,
  width: 11,
  height: 11,
  borderRadius: '50%',
 background: 'oklch(0.70 0.17 290 / 0.6)',
          boxShadow: `
            0 0 12px oklch(0.70 0.17 290 / 0.6),
            0 0 28px oklch(0.70 0.17 290 / 0.25)
          `,
 
  willChange: 'transform',
}}
      />
    </div>
  );
}