export interface ProjectResult {
  k: string;
  v: string;
}

export interface Project {
  id: string;
  num: string;
  title: string;
  kicker: string;
  tag: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  problem: string;
  approach: string[];
  results: ProjectResult[];
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio",
    num: "01",
    title: "This Portfolio",
    kicker: "Self-reference",
    tag: "Code · Design · AI",
    year: "2026",
    role: "Everything",
    stack: ["React", "CSS Houdini", "WebAudio", "Claude API"],
    summary:
      "A living showcase of how I think across code, design, and AI tooling. Three spatial metaphors, one system, zero shortcuts.",
    problem:
      "Most engineer portfolios are case-study PDFs in disguise. I wanted something that performs the craft — where the medium is the argument.",
    approach: [
      "Built three directions — Gallery, Desk, Grid — each a different answer to 'what does spatial mean on the web'",
      "A single shared token system survives a density toggle, a type-pair swap, and a light/dark flip without breaking",
      "Claude API wired into case-study panels for live Q&A; falls back gracefully when offline",
    ],
    results: [
      { k: "Directions explored", v: "3" },
      { k: "Lines of CSS", v: "~1.2k" },
      { k: "Lighthouse a11y", v: "98" },
    ],
    accent: "phosphor",
  },
  {
    id: "bank",
    num: "02",
    title: "Northbound Bank",
    kicker: "Proposal",
    tag: "Mobile · Fintech",
    year: "2025",
    role: "Design + Prototyping",
    stack: ["Figma", "React Native", "Rive"],
    summary:
      "A mobile banking redesign proposal. Replaces dashboard-first thinking with a timeline of your money — past, present, projected.",
    problem:
      "Balance-first banking hides the actual question — 'can I afford this?' — under a wall of transactions.",
    approach: [
      "Reframed the home screen as a horizontal time-strip, not a ledger",
      "Forecast chips surface upcoming bills inline with present-day spending",
      "Micro-interactions borrowed from calendar UIs make time feel continuous, not paginated",
    ],
    results: [
      { k: "Flows prototyped", v: "12" },
      { k: "Usability (SUS)", v: "82" },
      { k: "Decision time", v: "-34%" },
    ],
    accent: "amber",
  },
  {
    id: "unapec",
    num: "03",
    title: "UNAPEC",
    kicker: "Dual-surface",
    tag: "Web + Mobile · EdTech",
    year: "2025",
    role: "Product Design",
    stack: ["Figma", "Next.js", "Supabase"],
    summary:
      "A social platform for UNAPEC university — a student-facing mobile app, an admin-facing web dashboard, one schema.",
    problem:
      "Student comms live in WhatsApp groups, emails, and outdated portals. Admins have no visibility; students have too many inboxes.",
    approach: [
      "One graph of posts, events, and announcements — three permission layers",
      "Mobile feed collapses formal and informal channels into a single timeline",
      "Dashboard lets moderators scrub, segment, and schedule without leaving the list view",
    ],
    results: [
      { k: "Surfaces shipped", v: "2" },
      { k: "Admin actions/day", v: "+6x" },
      { k: "Student DAU target", v: "8k" },
    ],
    accent: "cyan",
  },
  {
    id: "experiments",
    num: "04",
    title: "Code Experiments",
    kicker: "Tinkering",
    tag: "WebGL · Interaction · AI",
    year: "2024 — now",
    role: "Solo",
    stack: ["Three.js", "WebAudio", "Shaders"],
    summary:
      "Small, sharp prototypes I build to answer a single question — 'what would this feel like?'",
    problem:
      "UX craft atrophies without practice. I keep a rotating bench of micro-prototypes to stay calibrated.",
    approach: [
      "Physics-based toggles, cursor-reactive type, audio-driven motion",
      "Each experiment scoped to ~2 hours; most become blog posts or ship as components",
      "Open-source when the idea isn't load-bearing for a client",
    ],
    results: [
      { k: "Shipped", v: "23" },
      { k: "In progress", v: "4" },
      { k: "Blog posts", v: "11" },
    ],
    accent: "violet",
  },
];
