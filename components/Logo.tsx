import React from 'react';

interface LogoProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/** Shared-stem EM monogram — E strokes in --fg, M diagonal in --accent. */
export default function Logo({ size = 24, strokeWidth = 8, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d="M26 16 L26 84" stroke="var(--fg)" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M26 16 L50 16" stroke="var(--fg)" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M26 50 L42 50" stroke="var(--fg)" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M26 84 L50 84" stroke="var(--fg)" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M26 16 L50 50 L74 16 L74 84"
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
