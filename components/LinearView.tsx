'use client';
import React, { useState } from 'react';
import AudioEngine, { Haptics } from '@/lib/audio';
import Placeholder from './Placeholder';
import { PROJECTS, Project } from '@/data/projects';
import StarField from './StarField';
import { SocialIcons } from './modals/ContactPanel';

interface LinearViewProps {
  onOpenProject: (p: Project) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

function MemojiSwap() {
  const [hovered, setHovered] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  return (
    <div
      className="linear-memoji-wrap"
      data-hovered={hovered}
      onMouseEnter={() => { setRestartKey(k => k + 1); setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/memoji2.png" alt="" className="linear-memoji linear-memoji-default"    />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/memoji5.png" alt="" className="linear-memoji linear-memoji-hover"   />
    </div>
  );
}

function LinearWorkCard({ project, onOpen, index }: { project: Project; onOpen: () => void; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className={'linear-work-card' + (hovered ? ' hovered' : '')}
      data-flip={index % 2 === 1}
      onMouseEnter={() => { setHovered(true); AudioEngine.hover(); }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => { AudioEngine.click(); Haptics.click(); onOpen(); }}
    >
      <div className="linear-work-card-thumb">
        <Placeholder label={project.id} accent={hovered} />
      </div>
      <div className="linear-work-card-body">
        <div className="linear-work-card-meta">
          <span className="mono" style={{ color: 'var(--fg-dim)', fontSize: 'var(--step--1)' }}>{project.num}</span>
          <span className="label">{project.tag} · {project.year}</span>
        </div>
        <h3 className="serif linear-work-card-title">{project.title}</h3>
        <p className="linear-work-card-summary">{project.summary}</p>
        <div className="linear-work-card-footer">
          <span className="label">{project.role}</span>
          <span className="mono linear-work-card-arrow">→</span>
        </div>
      </div>
    </button>
  );
}

export default function LinearView({ onOpenProject, onOpenAbout, onOpenContact }: LinearViewProps) {
  return (
<div
  style={{
    position: 'relative',
    overflow: 'hidden',
    minHeight: '100vh',
  }}
>
  <StarField />

  <div
    className="linear-root"
    data-screen-label="linear"
    style={{
      position: 'relative',

    }}
  >
      {/* Hero */}
      <section className="linear-hero">
        <div className='linear-hero-content'>
        <div className="linear-hero-intro">
        <div className='linear-hero-text'> <h1
            className="serif linear-h1"
          >
I turn everyday friction into experiences people actually enjoy
          </h1><p className="linear-sub">
UX Engineer working across design and development.

        </p></div> 
          <MemojiSwap />
        </div>
<div className="linear-cta">
          <button className="btn" onClick={onOpenContact} onMouseEnter={AudioEngine.hover}>
            Work with me →
          </button>
          <button className="btn ghost" onClick={onOpenAbout} onMouseEnter={AudioEngine.hover}>
            About
          </button>
        </div>
      </div>
        
        <div className="linear-scroll-hint mono" aria-hidden>
  
          <span className="linear-scroll-line" />
        </div>
      </section>

      {/* Selected work */}
      <section className="linear-work-section">

        <div className="linear-work-grid">
          {PROJECTS.map((p, i) => (
            <LinearWorkCard key={p.id} project={p} onOpen={() => onOpenProject(p)} index={i} />
          ))}
        </div>
        
      </section>

      {/* Contact */}
      <section className="linear-section linear-contact">
<h2 className="serif linear-h2" style={{ textAlign: "center" }}>
          Let&apos;s build <em> our future together</em>
        </h2>
        <button className="btn" onClick={onOpenContact} onMouseEnter={AudioEngine.hover}>
          Get in touch →
        </button>
     
        
        <footer className="linear-footer mono">
          <span>
             <SocialIcons />
</span>
          <span>© 2026 Elpidio Márquez - Built from scratch</span>
        
        </footer>
      </section>
    </div></div>
  );
}
