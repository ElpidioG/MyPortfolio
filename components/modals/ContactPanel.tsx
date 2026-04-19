'use client';
import React, { useEffect, useState } from 'react';
import AudioEngine from '@/lib/audio';
import ModalShell from './ModalShell';

interface ContactPanelProps {
  onClose: () => void;
}

function IconEmail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function SocialIcons() {
  return (
    <div className="social-icons">
      <a
        className="social-icon"
        href="mailto:elpidiomarquez0417@gmail.com"
        aria-label="Email"
        onMouseEnter={AudioEngine.hover}
      >
        <IconEmail />
      </a>
      <a
        className="social-icon"
        href="https://linkedin.com/in/elpidio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        onMouseEnter={AudioEngine.hover}
      >
        <IconLinkedIn />
      </a>
      <a
        className="social-icon"
        href="https://github.com/elpidio"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        onMouseEnter={AudioEngine.hover}
      >
        <IconGitHub />
      </a>
    </div>
  );
}

export default function ContactPanel({ onClose }: ContactPanelProps) {
  useEffect(() => { AudioEngine.open(); }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio — ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.open(`mailto:elpidiomarquez0417@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    AudioEngine.chime?.();
  };

  return (
    <ModalShell title="Contact" onClose={onClose} narrow>
      <div className="contact-panel-body">
        <h2 className="serif contact-heading">
          I&apos;m selectively available<br />for collaborations.
        </h2>

        {sent ? (
          <p className="contact-sent mono">Your mail client opened — talk soon ✦</p>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label className="label" htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                className="contact-input"
                type="text"
                required
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="contact-field">
              <label className="label" htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                className="contact-input"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="contact-field">
              <label className="label" htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                className="contact-input contact-textarea"
                required
                placeholder="Tell me about your project…"
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
            <button className="btn contact-submit" type="submit" onMouseEnter={AudioEngine.hover}>
              Send message →
            </button>
          </form>
        )}

        <div className="contact-divider" />
        <SocialIcons />
      </div>
    </ModalShell>
  );
}
