'use client';
import React, { useEffect } from 'react';
import AudioEngine from '@/lib/audio';
import ModalShell from './ModalShell';
import Placeholder from '@/components/Placeholder';
import { CaseStudyProject } from '@/data/projects';

interface CaseStudyProps {
  project: CaseStudyProject;
  onClose: () => void;
}

function MetaRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="meta-row">
      <span className="label">{k}</span>
      <span className="mono">{v}</span>
    </div>
  );
}

export default function CaseStudy({ project, onClose }: CaseStudyProps) {
  useEffect(() => { AudioEngine.open(); }, []);
  const { research } = project;

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
          <MetaRow k="Year" v={project.year} />
          <MetaRow k="Role" v={project.role} />
          <MetaRow k="Toolkit" v={project.toolkit.join(' · ')} />
        </div>
      </div>

      <div className="cs-hero">
        <Placeholder
          label={`${project.id}`}
          src={project.cover}
          srcLight={project.coverLight}
          accent
          objectPosition={project.coverPosition}
          scrollable={project.coverScrollable}
        />
      </div>

      <div className="cs-body">

        <section>
          <p className="label">Problem</p>
          <p className="cs-section-text">{project.problem}</p>
        </section>

        <section className="cs-research">
          <p className="label">Research</p>
          <div className="cs-research-goal">
            <p className="label cs-sublabel">Goal</p>
            <p className="cs-section-text">{research.goal}</p>
          </div>
          <div className="cs-research-cols">
            <div className="cs-research-col">
              <p className="label cs-sublabel">Methods</p>
              <ul className="cs-bullet-list">
                {research.methods.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
            <div className="cs-research-col">
              <p className="label cs-sublabel">Insights</p>
              <ul className="cs-bullet-list">
                {research.insights.map((ins, i) => <li key={i}>{ins}</li>)}
              </ul>
            </div>
          </div>
      {research.graphics && research.graphics.length > 0 && (
  <div className="cs-research-graphics">
    {research.graphics.map((g, i) => (
      <div key={i} className="cs-research-graphic">
        <Placeholder
          src={g.src}
          srcLight={g.srcLight}
          href={g.href}
          label={g.label || `research-${i + 1}`}
          scrollable={g.scrollable}
        />
      </div>
    ))}
  </div>
)}
        </section>

        <section className="cs-objective-section">
          <p className="label">Objective</p>
          <p className="cs-objective-text serif">{project.objective}</p>
        </section>

        <section>
          <p className="label">Approach</p>
          <ol className="cs-list">
            {project.approach.map((a, i) => (
              <li key={i}>
                <span className="mono cs-num">.{String(i + 1).padStart(2, '0')}</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <p className="label">Results</p>
          <div className="cs-results">
            {project.results.map((r, i) => (
              <div className="cs-result" key={i}>
                <span className="mono" style={{ fontSize: 'var(--step-5)', color: 'var(--accent)' }}>{r.v}</span>
                <span className="label">{r.k}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cs-gallery">
          {(project.gallery && project.gallery.length > 0
            ? project.gallery
            : [{ label: `${project.id}_01` }, { label: `${project.id}_02` }]
          ).map((g, i) => (
            <div key={i}>
              <Placeholder label={g.label ?? `${project.id}_0${i + 1}`} src={g.src} srcLight={g.srcLight} href={g.href} scrollable={g.scrollable} />
            </div>
          ))}
        </section>

      </div>
    </ModalShell>
  );
}
