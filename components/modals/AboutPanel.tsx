'use client';
import React, { useEffect } from 'react';
import AudioEngine from '@/lib/audio';
import ModalShell from './ModalShell';

interface AboutPanelProps {
  onClose: () => void;
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="stat-row">
      <span className="label">{k}</span>
      <span className="mono" style={{ fontSize: 'var(--step--1)' }}>{v}</span>
    </div>
  );
}

function Cap({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="about-cap">
      <span className="mono label">{num}</span>
      <div className="about-cap-body">
        <h4>{title}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default function AboutPanel({ onClose }: AboutPanelProps) {
  useEffect(() => { AudioEngine.open(); }, []);

  return (
    <ModalShell title="About" onClose={onClose}>
      {/* Flat grid: three named areas → portrait / left / stats
          Desktop: 2-col (left spans both rows, portrait+stats in right col)
          Mobile:  column — portrait → left → stats */}
      <div className="about-grid">
        <div className='about-left'>    <div className="about-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/memoji5.gif" alt="" className="about-memoji" />
        </div>

              <h2
            className="serif"
            style={{ fontSize: 'var(--step-6)', lineHeight: 1.02, letterSpacing: '-0.02em', marginTop: 8 }}
          >
     
            <em>Hola! I&apos;m Elpidio Márquez</em>
          </h2>

            <div className="about-bio">
          <p >
            Dominican-born, Florida-based UX Engineer with three years bridging design and development—specializing in fintech dashboards and financial platforms.
          </p>
          <p >
            Focused on the details that shape real user experiences—clear flows, thoughtful motion, and small inconsistencies that affect trust. Approach blends research, logic, and technical thinking.
          </p>
     </div>
        </div>
      

     
    

        <div className="about-stats">
          <Stat k="Years active" v="3" />
          <Stat k="Key tools" v="Figma · TS · AI" />
          <Stat k="Located" v="Florida, USA" />
        </div>
      </div>

      <div className="about-caps">
        <p className="label">Capabilities</p>
        <div className="about-caps-list">
          <Cap
            num=".01"
            title="User Research"
            desc="Grounded in both qualitative and quantitative methods—capturing behavioral data, validating hypotheses, and connecting insights directly to implementation."
          />
          <Cap
            num=".02"
            title="Product Design"
            desc="Translating complex requirements into scalable flows and interfaces. Built with awareness of technical constraints, system behavior, and real-world usage."
          />
          <Cap
            num=".03"
            title="Frontend Engineering"
            desc="Bringing interactions to life with precision, ensuring usability, responsiveness, and consistency across devices and states."
          />
        </div>
      </div>
    </ModalShell>
  );
}
