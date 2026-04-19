'use client';
import React, { useState, useEffect } from 'react';
import AudioEngine, { Haptics } from '@/lib/audio';
import { useCursor } from '@/hooks/useCursor';
import { PROJECTS, Project } from '@/data/projects';
import StarField from './StarField';

interface GalaxyViewProps {
  onOpenProject: (p: Project) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

function GalaxyPlanet({
  project,
  x,
  y,
  onClick,
}: {
  project: Project;
  x: number;
  y: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={'galaxy-planet ' + (hovered ? 'hovered' : '')}
      onMouseEnter={() => {
        setHovered(true);
        AudioEngine.hover();
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
    >
      <div className="galaxy-planet-dot">
        <span className="mono">{project.num}</span>
      </div>

      <div className="galaxy-planet-label">
        <p
          className="serif"
          style={{ fontSize: 'var(--step-1)', letterSpacing: '-0.01em' }}
        >
          {project.title}
        </p>
        <p className="label">{project.tag}</p>
      </div>
    </button>
  );
}

export default function GalaxyView({
  onOpenProject,
  onOpenAbout,
  onOpenContact,
}: GalaxyViewProps) {
  const [t, setT] = useState(0);
  const cursor = useCursor();

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    const loop = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const px = (cursor.x - 0.5) * 40;
  const py = (cursor.y - 0.5) * 40;

  return (
    <div className="galaxy-root" data-screen-label="galaxy">
      <StarField className="galaxy-starfield" />

      <div
        className="galaxy-nebula"
        style={{ transform: `translate(${px * 0.4}px, ${py * 0.4}px)` }}
        aria-hidden
      />

      <button
        className="galaxy-sun"
        onClick={() => {
          AudioEngine.open();
          Haptics.click();
          onOpenAbout();
        }}
        onMouseEnter={AudioEngine.hover}
        style={{ transform: `translate(calc(-50% + ${px * 0.2}px), calc(-50% + ${py * 0.2}px))` }}
      >
        <div className="galaxy-sun-core" />
        <div className="galaxy-sun-halo" />
        <div className="galaxy-sun-label">
          <span className="label">About</span>
        </div>
      </button>

      {PROJECTS.map((p, i) => {
        const orbit = 160 + i * 80;
        const period = 60 + i * 22;
        const phase = (i / PROJECTS.length) * Math.PI * 2;
        const angle = phase + (t / period) * Math.PI * 2;
        const x = Math.cos(angle) * orbit + px * 0.3;
        const y = Math.sin(angle) * orbit * 0.55 + py * 0.3;

        return (
          <React.Fragment key={p.id}>
            <div
              className="galaxy-orbit"
              style={{
                width: orbit * 2,
                height: orbit * 2 * 0.55,
                transform: `translate(calc(-50% + ${px * 0.15}px), calc(-50% + ${py * 0.15}px))`,
              }}
              aria-hidden
            />

            <GalaxyPlanet
              project={p}
              x={x}
              y={y}
              onClick={() => {
                AudioEngine.click();
                Haptics.click();
                onOpenProject(p);
              }}
            />
          </React.Fragment>
        );
      })}

      <button
        className="galaxy-beacon"
        onClick={() => {
          AudioEngine.open();
          Haptics.click();
          onOpenContact();
        }}
        onMouseEnter={AudioEngine.hover}
        style={{
          transform: `translate(
            calc(-50% + ${Math.cos(t / 8) * 340 + px * 0.5}px),
            calc(-50% + ${Math.sin(t / 8) * 200 + py * 0.5}px)
          )`,
        }}
      >
        <div className="galaxy-beacon-dot" />
        <span className="label">Contact</span>
      </button>

      <div className="galaxy-hero">
        <h1
          className="serif"
          style={{
            fontSize: 'var(--step-5)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginTop: 6,
         
          }}
        >
          A small <em>galaxy</em> of work
        </h1>
      </div>

      <p className="mono galaxy-hint">click a planet to open</p>
    </div>
  );
}