'use client';
import { useState, useEffect } from 'react';

interface CursorPos {
  x: number;
  y: number;
  raw: { x: number; y: number };
}

export function useCursor(): CursorPos {
  const [pos, setPos] = useState<CursorPos>({ x: 0.5, y: 0.5, raw: { x: 0, y: 0 } });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        raw: { x: e.clientX, y: e.clientY },
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return pos;
}
