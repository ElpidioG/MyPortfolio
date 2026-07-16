'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AudioEngine, { Haptics } from '@/lib/audio';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

const NO_IFRAME_HOSTS = [
  'linkedin.com',
  'x.com',
  'twitter.com',
  'instagram.com',
  'facebook.com',
  'google.com',
  'github.com',
];

interface PlaceholderProps {
  label?: string;
  src?: string;
  /** Swapped in for `src` when light mode is active. Falls back to `src` if omitted. */
  srcLight?: string;
  href?: string;
  accent?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Set false to render a plain, non-clickable thumbnail (no lightbox/expand). Default true. */
  interactive?: boolean;
  /** "cover" crops to fill (default, good for screenshots); "contain" letterboxes without cropping (good for logos/icons). */
  fit?: 'cover' | 'contain';
  /** Where the image crops from when "cover" clips it. Default "center". */
  objectPosition?: string;
  /** When true, the lightbox shows the image at full width and lets it scroll top-to-bottom instead of shrinking it to fit the screen. Use for tall full-page screenshots. */
  scrollable?: boolean;
}

export default function Placeholder({
  label = 'image',
  src,
  srcLight,
  href,
  accent = false,
  className = '',
  style = {},
  interactive = true,
  fit = 'cover',
  objectPosition = 'center',
  scrollable = false,
}: PlaceholderProps) {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsLight(root.getAttribute('data-mode') === 'light');
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ['data-mode'] });
    return () => observer.disconnect();
  }, []);

  const resolvedSrc = isLight && srcLight ? srcLight : src;

  useEffect(() => { setError(false); }, [resolvedSrc]);

  const blocksFraming = useCallback((url?: string) => {
    if (!url) return false;
    try {
      const host = new URL(url).hostname.replace(/^www\./, '');
      return NO_IFRAME_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
    } catch {
      return false;
    }
  }, []);

  const handleOpen = useCallback(() => {
    AudioEngine.click();
    Haptics.click();
    if (href && blocksFraming(href)) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    setOpen(true);
  }, [href, blocksFraming]);

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
    lockScroll();

    return () => {
      document.removeEventListener('keydown', onKeyDown, { capture: true });
      unlockScroll();
    };
  }, [open, handleClose]);

  const hasImage = Boolean(resolvedSrc && !error);
  const hasWebsite = Boolean(href);

  const inner = hasImage ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: fit === 'contain' ? 'var(--bg-elevated)' : undefined,
        padding: fit === 'contain' ? '18%' : 0,
        boxSizing: 'border-box',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolvedSrc}
        alt={label}
        onError={() => setError(true)}
        style={{ width: '100%', height: '100%', objectFit: fit, objectPosition, display: 'block' }}
      />
    </div>
  ) : (
    <div className={'placeholder-root ' + (accent ? 'placeholder-accent' : '')}>
      <span className="placeholder-label">{label}</span>
    </div>
  );

  return (
    <>
      <div
        className={`placeholder-wrap ${className}`}
        style={{ width: '100%', height: '100%', position: 'relative', cursor: interactive ? 'pointer' : 'inherit', ...style }}
        onClick={interactive ? handleOpen : undefined}
        onMouseEnter={interactive ? AudioEngine.hover : undefined}
      >
        {inner}
        {interactive && (
          <div className="placeholder-overlay">
            <span className="placeholder-overlay-hint mono">
              {hasWebsite ? 'open site' : 'expand'}
            </span>
          </div>
        )}
      </div>

      {interactive && open &&
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
                <div className={'placeholder-lightbox-site' + (scrollable ? ' scrollable' : '')}>
                  <div className="placeholder-lightbox-site-bar">
                    <span className="mono">{label}</span>

                  </div>
                  <div className={'placeholder-lightbox-image-wrap' + (scrollable ? ' scrollable' : '')}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolvedSrc}
                      alt={label}
                      className={'placeholder-lightbox-image' + (scrollable ? ' scrollable' : '')}
                    />
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