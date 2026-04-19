'use client';
import { useState, useEffect, useRef } from 'react';

export function useLerped(target: number, factor = 0.1): number {
  const [val, setVal] = useState(target);
  const ref = useRef(target);
  const tRef = useRef(target);

  useEffect(() => { tRef.current = target; }, [target]);

  useEffect(() => {
    let raf: number;
    const step = () => {
      ref.current += (tRef.current - ref.current) * factor;
      setVal(ref.current);
      if (Math.abs(tRef.current - ref.current) > 0.001) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [factor]);

  return val;
}
