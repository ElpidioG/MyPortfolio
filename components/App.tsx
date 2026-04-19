'use client';
import React, { useState, useEffect } from 'react';
import AudioEngine from '@/lib/audio';
import LinearView from './LinearView';
import GalaxyView from './GalaxyView';
import StarField from './StarField';
import Cursor from './Cursor';
import AboutPanel from './modals/AboutPanel';
import ContactPanel from './modals/ContactPanel';
import CaseStudy from './modals/CaseStudy';
import { Project } from '@/data/projects';

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function App() {
  const [direction, setDirection] = useState<'Home' | 'galaxy'>('Home');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('em-mode') as 'dark' | 'light' | null;
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    if (mode === 'light') {
      document.documentElement.setAttribute('data-mode', 'light');
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
    localStorage.setItem('em-mode', mode);
  }, [mode]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      document.documentElement.style.setProperty('--scroll-t', t.toFixed(4));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchTo = (dir: 'Home' | 'galaxy') => { setDirection(dir); AudioEngine.click(); };
  const toggleMode = () => { setMode(m => m === 'dark' ? 'light' : 'dark'); AudioEngine.click(); };

  const handlers = {
    onOpenProject: (p: Project) => setActiveProject(p),
    onOpenAbout: () => setAboutOpen(true),
    onOpenContact: () => setContactOpen(true),
  };

  return (
    <div className="app-root">
      <StarField />
      <Cursor />
      {direction === 'Home'
        ? <LinearView {...handlers} />
        : <GalaxyView {...handlers} />
      }

      <div className={'top-bar' + (scrolled ? ' scrolled' : '')}>
        <div className="brand">
          <span className="brand-mark" />
          <span>Elpidio Márquez</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="direction-switch">
            {(['Home', 'galaxy'] as const).map((key) => (
              <button
                key={key}
                className={direction === key ? 'active' : ''}
                onClick={() => switchTo(key)}
                onMouseEnter={AudioEngine.hover}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
            <span className="nav-sep" aria-hidden />
            <button
              className="nav-link"
              onClick={() => { AudioEngine.click(); setAboutOpen(true); }}
              onMouseEnter={AudioEngine.hover}
            >
              About
            </button>
            <button
              className="nav-link"
              onClick={() => { AudioEngine.click(); setContactOpen(true); }}
              onMouseEnter={AudioEngine.hover}
            >
              Contact
            </button>
          </div>
          <button
            className="theme-toggle"
            onClick={toggleMode}
            onMouseEnter={AudioEngine.hover}
            aria-label="Toggle light/dark mode"
          >
            {mode === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      {activeProject && <CaseStudy project={activeProject} onClose={() => setActiveProject(null)} />}
      {aboutOpen && <AboutPanel onClose={() => setAboutOpen(false)} />}
      {contactOpen && <ContactPanel onClose={() => setContactOpen(false)} />}
    </div>
  );
}
