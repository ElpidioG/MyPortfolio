'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AudioEngine, { Haptics } from '@/lib/audio';

interface PlaceholderProps {
  label?: string;
  src?: string;
  href?: string;
  accent?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function Placeholder({
  label = 'image',
  src,
  href,
  accent = false,
  className = '',
  style = {},
}: PlaceholderProps) {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    AudioEngine.click();
    Haptics.click();
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    AudioEngine.close();
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        handleClose();
      }
    };

    document.addEventListener('keydown', onKeyDown, { capture: true });
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown, { capture: true });
      document.body.style.overflow = '';
    };
  }, [open, handleClose]);

  const hasImage = Boolean(src && !error);
  const hasWebsite = Boolean(href);

  const inner = hasImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={label}
      onError={() => setError(true)}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  ) : (
    <div className={'placeholder-root ' + (accent ? 'placeholder-accent' : '')}>
      <span className="placeholder-label">{label}</span>
    </div>
  );

  return (
    <>
      <div
        className={`placeholder-wrap ${className}`}
        style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer', ...style }}
        onClick={handleOpen}
        onMouseEnter={AudioEngine.hover}
      >
        {inner}
        <div className="placeholder-overlay">
          <span className="placeholder-overlay-hint mono">
            {hasWebsite ? 'open site' : 'expand'}
          </span>
        </div>
      </div>

      {open &&
        createPortal(
          <div
            className="placeholder-lightbox"
            onClick={handleClose}
            role="dialog"
            aria-modal
            aria-label={label}
          >
            <button
              type="button"
              className="placeholder-lightbox-close mono"
              onClick={handleClose}
              onMouseEnter={AudioEngine.hover}
            >
              esc ×
            </button>

            <div
              className="placeholder-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {hasWebsite ? (
                <div className="placeholder-lightbox-site">
                  <div className="placeholder-lightbox-site-bar">
                    <span className="mono">{label}</span>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="placeholder-lightbox-site-link mono"
                      onMouseEnter={AudioEngine.hover}
                    >
                      open in new tab
                    </a>
                  </div>

                  <iframe
                    src={href}
                    title={label}
                    className="placeholder-lightbox-iframe"
                  />
                </div>
              ) : hasImage ? (
                <div className="placeholder-lightbox-site">
                  <div className="placeholder-lightbox-site-bar">
                    <span className="mono">{label}</span>
                  
                  </div>
                  <div className="placeholder-lightbox-image-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={label} className="placeholder-lightbox-image" />
                  </div>
                </div>
              ) : (
                <div style={{ width: '70vw', height: '60vh' }}>{inner}</div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}