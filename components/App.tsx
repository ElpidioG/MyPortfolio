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

export default function App() {
  const [direction, setDirection] = useState<'Home' | 'galaxy'>('Home');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      </div>

      {activeProject && <CaseStudy project={activeProject} onClose={() => setActiveProject(null)} />}
      {aboutOpen && <AboutPanel onClose={() => setAboutOpen(false)} />}
      {contactOpen && <ContactPanel onClose={() => setContactOpen(false)} />}
    </div>
  );
}
