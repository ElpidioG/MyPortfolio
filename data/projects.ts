export interface ProjectResult {
  k: string;
  v: string;
}

export interface ResearchMedia {
  label: string;
  src?: string;   // preview image
  href?: string;  // website url to open in modal
}

export interface ProjectResearch {
  goal: string;
  methods: string[];
  insights: string[];
  graphics?: ResearchMedia[];// optional — image labels shown as placeholders
}

export interface Project {
  id: string;
  num: string;
  title: string;
  tag: string;
  year: string;
  role: string;
  toolkit: string[];
  summary: string;
  problem: string;
  objective: string;
  research: ProjectResearch;
  approach: string[];
  results: ProjectResult[];
  accent: string;
  cover: string; 
}

export const PROJECTS: Project[] = [
  {
    
    id: "portfolio",
    cover:"/MyPortfolio_.png",
    num: "01",
    title: "My Portfolio",
    tag: "Code · Design · AI",
    year: "2026",
    role: "UX + UI + Frontend",
    toolkit: ["Research", "Figma", "TypeScript", "CSS", "AI"],
    summary:
      "A living showcase of how I perform across research, design, code, and AI tooling.",
    problem:
      "Most UX portfolios present outcomes through static narratives, making it difficult to evaluate the interactive and experiential quality of the work.",
    objective:
      "Design and build a responsive, interaction-driven portfolio that allows users to evaluate UX work through real experience.",
    research: {
      goal: "Understand how interactive portfolios are evaluated by design and engineering hiring managers in the first 30 seconds.",
      methods: [
        "Portfolio reviews of 20+ senior UX/FE engineers",
         
        "Personal audit of my own experience reviewing candidate work",
      ],
      insights: [
        "Interactivity > static — static sites are skipped faster",
        "Users scan, not read, — therefore, case study density has no value without clarity",
        "A good-looking interface fails without usability",
      ],     graphics: [
  {
    label: "Pratibha Joshi",
    src: "/PortfolioEvidence1.png",
    href: "https://www.pratibhajoshi.com/",

  },
  {
    label: "Helena Stening",
    src: "/PortfolioEvidence2.png",
      href: "https://www.helenastening.com/",
  },  
  {
    label: "Dennis Snellenberg",
    src: "/PortfolioEvidence3.png",
      href: "https://dennissnellenberg.com/",
  },
],
    },
    approach: [
      "Built and iterated directly in code",
      "Prioritize usability and clarity over heavy storytelling",
      "Integrate accessible feedback (haptics, sound, light/dark modes)",
    ],
    results: [
      { k: "Responsiveness", v: "Yes" },
      { k: "Lines of CSS", v: "~1.2k" },
      { k: "Themes", v: "Adaptive" },
    ],
    accent: "phosphor",
  },
  {
    id: "bank",
    num: "02",
    cover:"/MyPortfolio_.png",
    title: "Northbound Bank",
    tag: "Mobile · Fintech",
    year: "2025",
    role: "Design + Prototyping",
    toolkit: ["Figma", "React Native", "Rive"],
    summary:
      "A mobile banking redesign proposal. Replaces dashboard-first thinking with a timeline of your money — past, present, projected.",
    problem:
      "Balance-first banking hides the actual question — 'can I afford this?' — under a wall of transactions.",
    objective:
      "Redesign the core banking experience so users can answer 'can I afford this?' in under 5 seconds, without mental arithmetic.",
    research: {
      goal: "Identify why users feel uncertain making purchase decisions from their current banking app.",
      methods: [
        "Usability testing with 8 existing mobile banking users",
        "Two-week diary study tracking spending decisions and app check-ins",
        "Competitive analysis of 5 top mobile banking apps",
      ],
      insights: [
        "Users check their balance 3+ times before committing to a large purchase",
        "Upcoming bills are the dominant source of financial anxiety",
        "Users already think in timelines — the apps just don't support it",
      ],
      graphics: [
  {
    label: "Pratibha Joshi",
    src: "/PortfolioEvidence1.png",
    href: "https://www.pratibhajoshi.com/",

  },
  {
    label: "Helena Stening",
    src: "/PortfolioEvidence2.png",
      href: "https://www.helenastening.com/",
  },  
  {
    label: "Dennis Snellenberg",
    src: "/PortfolioEvidence3.png",
      href: "https://dennissnellenberg.com/",
  },
],
    },
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
    cover:"/MyPortfolio_.png",
    num: "03",
    title: "UNAPEC",
    tag: "Web + Mobile · EdTech",
    year: "2025",
    role: "Product Design",
    toolkit: ["Figma", "Next.js", "Supabase"],
    summary:
      "A social platform for UNAPEC university — a student-facing mobile app, an admin-facing web dashboard, one schema.",
    problem:
      "Student comms live in WhatsApp groups, emails, and outdated portals. Admins have no visibility; students have too many inboxes.",
    objective:
      "Unify student and admin communication into one platform — reducing inbox fragmentation and giving administrators real-time visibility.",
    research: {
      goal: "Map the communication gaps between students and administrative staff across all four faculties.",
      methods: [
        "Contextual inquiry with 12 students across different years and programs",
        "Admin workflow shadowing across 3 full sessions",
        "Survey of 200+ students on communication pain points",
      ],
      insights: [
        "Students actively monitor 4+ channels to stay informed — fatigue is universal",
        "Admins spend ~2h/day copy-pasting announcements across platforms",
        "Event discovery is the single highest pain point for students",
      ],
       graphics: [
  {
    label: "Pratibha Joshi",
    src: "/PortfolioEvidence1.png",
    href: "https://www.pratibhajoshi.com/",

  },
  {
    label: "Helena Stening",
    src: "/PortfolioEvidence2.png",
      href: "https://www.helenastening.com/",
  },  
  {
    label: "Dennis Snellenberg",
    src: "/PortfolioEvidence3.png",
      href: "https://dennissnellenberg.com/",
  },
],
    },
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
    cover:"/MyPortfolio_.png",
    num: "04",
    title: "Code Experiments",
    tag: "WebGL · Interaction · AI",
    year: "2024 — now",
    role: "Solo",
    toolkit: ["Three.js", "WebAudio", "Shaders"],
    summary:
      "Small, sharp prototypes I build to answer a single question — 'what would this feel like?'",
    problem:
      "UX craft atrophies without practice. I keep a rotating bench of micro-prototypes to stay calibrated.",
    objective:
      "Build and ship micro-prototypes that sharpen specific interaction and technical skills, each scoped to a single testable question.",
    research: {
      goal: "Identify the highest-leverage interactions to explore for skill development over a rolling 6-month window.",
      methods: [
        "Review of emerging browser APIs and W3C drafts",
        "Survey of interaction patterns across award-winning sites (Awwwards, CSS Design Awards)",
        "Personal retrospective on gaps from past client work",
      ],
      insights: [
        "Physics-based feedback creates perceived quality far beyond visual polish",
        "Audio reinforcement increases perceived responsiveness without changing actual latency",
        "AI integration has moved from differentiator to baseline expectation",
      ],
    },
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
