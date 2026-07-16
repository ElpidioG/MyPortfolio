'use client';
import React, { useEffect } from 'react';
import AudioEngine from '@/lib/audio';
import ModalShell from './ModalShell';
import Placeholder from '@/components/Placeholder';
import { LabProject } from '@/data/projects';

interface LabProps {
  project: LabProject;
  onClose: () => void;
}

export default function Lab({ project, onClose }: LabProps) {
  useEffect(() => { AudioEngine.open(); }, []);
  const experiments = project.experiments;

  return (
    <ModalShell title={project.title} onClose={onClose}>
      <div className="cs-head">
        <div>
          <p className="label">{project.tag}</p>
          <h2 className="serif cs-title" style={{ lineHeight: 0.98, letterSpacing: '-0.03em', marginTop: 8 }}>
            {project.title}
          </h2>
          <p style={{ marginTop: '1rem', color: 'var(--fg-muted)', maxWidth: '56ch', fontSize: 'var(--step-1)' }}>
            {project.summary}
          </p>
        </div>
        <div className="cs-meta">
          <div className="meta-row">
            <span className="label">Year</span>
            <span className="mono">{project.year}</span>
          </div>
          <div className="meta-row">
            <span className="label">Role</span>
            <span className="mono">{project.role}</span>
          </div>
          <div className="meta-row">
            <span className="label">Toolkit</span>
            <span className="mono">{project.toolkit.join(' · ')}</span>
          </div>
        </div>
      </div>

      <div className="cs-body">
        <section className="lab-grid">
          {experiments.length > 0 ? (
            experiments.map((exp, i) => (
              <div className="lab-card" key={i}>
                <div className="lab-card-cover">
                  <Placeholder label={exp.title} src={exp.cover} href={exp.url} />
                </div>
                <div className="lab-card-body">
                  <h3 className="serif lab-card-title">{exp.title}</h3>
                  <p className="lab-card-desc">{exp.description}</p>
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="lab-card-tags">
                      {exp.tags.map((t, ti) => (
                        <span className="mono lab-tag" key={ti}>{t}</span>
                      ))}
                    </div>
                  )}
                  <div className="lab-card-links">
                    {exp.repo && (
                      <a
                        href={exp.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mono lab-card-link"
                        onMouseEnter={AudioEngine.hover}
                        onClick={AudioEngine.click}
                      >
                        source ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="cs-section-text" style={{ color: 'var(--fg-dim)' }}>
              Bench is being restocked — check back soon.
            </p>
          )}
        </section>
      </div>
    </ModalShell>
  );
}
