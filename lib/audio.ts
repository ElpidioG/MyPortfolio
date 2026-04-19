interface PlayOptions {
  freq?: number;
  dur?: number;
  type?: OscillatorType;
  vol?: number;
  attack?: number;
  release?: number;
  detune?: number;
}

const AudioEngine = (() => {
  let ctx: AudioContext | null = null;
  let muted = false;
  let master: GainNode | null = null;

  const ensure = () => {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.12;
      master.connect(ctx.destination);
    } catch {}
  };

  const play = ({ freq = 440, type = "sine" as OscillatorType, vol = 0.5, attack = 0.005, release = 0.06, detune = 0 }: PlayOptions) => {
    if (muted) return;
    ensure();
    if (!ctx || !master) return;
    if (ctx.state === "suspended") ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);
    osc.connect(gain).connect(master);
    osc.start(now);
    osc.stop(now + attack + release + 0.02);
  };

  return {
    tick: () => play({ freq: 1800, type: "sine", vol: 0.15, release: 0.04 }),
    hover: () => play({ freq: 1200, type: "triangle", vol: 0.08, release: 0.05 }),
    click: () => {
      play({ freq: 220, type: "sine", vol: 0.3, release: 0.08 });
      play({ freq: 660, type: "sine", vol: 0.15, release: 0.1, detune: 6 });
    },
    open: () => {
      play({ freq: 440, type: "sine", vol: 0.2, release: 0.18 });
      setTimeout(() => play({ freq: 660, type: "sine", vol: 0.15, release: 0.16 }), 60);
    },
    close: () => play({ freq: 330, type: "sine", vol: 0.15, release: 0.14 }),
    chime: () => {
      [523, 659, 784].forEach((f, i) =>
        setTimeout(() => play({ freq: f, type: "sine", vol: 0.14, release: 0.3 }), i * 80)
      );
    },
    setMuted: (m: boolean) => { muted = m; },
    isMuted: () => muted,
  };
})();

export const Haptics = {
  tick: () => { try { navigator.vibrate && navigator.vibrate(2); } catch {} },
  click: () => { try { navigator.vibrate && navigator.vibrate(8); } catch {} },
  thump: () => { try { navigator.vibrate && navigator.vibrate([12, 40, 8]); } catch {} },
};

export default AudioEngine;
