'use client';
import React, { useEffect } from 'react';
import AudioEngine from '@/lib/audio';

interface ModalShellProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  narrow?: boolean;
}

export default function ModalShell({ title, children, onClose, narrow }: ModalShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const close = () => { AudioEngine.close(); onClose(); };

  return (
    <div className="modal-root">
      <div className="modal-backdrop" onClick={close} />
      <div className={'modal-panel ' + (narrow ? 'narrow' : '')}>
        <div className="modal-head">
          <span className="label">{title}</span>
          <button
            className="modal-close"
            onClick={close}
            onMouseEnter={AudioEngine.hover}
          >
            <span className="mono">esc</span>
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
