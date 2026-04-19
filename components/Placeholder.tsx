'use client';
import React from 'react';

interface PlaceholderProps {
  label?: string;
  accent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Placeholder({ label = 'image', accent = false, className = '', style = {} }: PlaceholderProps) {
  return (
    <div
      className={'placeholder ' + className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: accent
          ? 'repeating-linear-gradient(135deg, var(--accent-glow) 0 8px, transparent 8px 16px), var(--bg-sunken)'
          : 'repeating-linear-gradient(135deg, var(--bg-sunken) 0 8px, var(--rule) 8px 16px)',
        color: 'var(--fg-muted)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      <span
        style={{
          background: 'var(--bg-elevated)',
          padding: '4px 8px',
          border: '1px solid var(--rule)',
          borderRadius: 4,
        }}
      >
        {label}
      </span>
    </div>
  );
}
