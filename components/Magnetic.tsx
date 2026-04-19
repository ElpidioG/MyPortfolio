'use client';
import React, { useRef, useState } from 'react';

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function Magnetic({ children, strength = 0.3, style, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * strength, y: y * strength });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        display: 'inline-flex',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 400ms var(--ease-spring)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
