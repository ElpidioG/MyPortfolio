'use client';
import { useState, useEffect, useRef } from 'react';

export function useSpring(target: number, stiffness = 0.12, damping = 0.78): number {
  const [val, setVal] = useState(target);
  const vRef = useRef(0);
  const valRef = useRef(target);
  const targetRef = useRef(target);

  useEffect(() => { targetRef.current = target; }, [target]);

  useEffect(() => {
    let raf: number;
    const step = () => {
      const delta = targetRef.current - valRef.current;
      vRef.current = vRef.current * damping + delta * stiffness;
      valRef.current = valRef.current + vRef.current;
      setVal(valRef.current);
      if (Math.abs(vRef.current) > 0.0001 || Math.abs(delta) > 0.0001) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [stiffness, damping]);

  return val;
}
