export interface ProjectResult {
  k: string;
  v: string;
}

export interface ResearchMedia {
  label: string;
  src?: string;   // preview image
  /** Swapped in for `src` when the site is in light mode. */
  srcLight?: string;
  href?: string;  // website url to open in modal
  /** When true, opening this image in the lightbox lets it scroll top-to-bottom at a readable width instead of shrinking to fit. */
  scrollable?: boolean;
}

export interface ProjectResearch {
  goal: string;
  methods: string[];
  insights: string[];
  graphics?: ResearchMedia[];// optional — image labels shown as placeholders
}

export interface Experiment {
  title: string;
  description: string;
  url?: string;    // live deployed link (e.g. Vercel)
  repo?: string;    // source link
  tags?: string[];
  cover?: string;
}

interface ProjectBase {
  id: string;
  num: string;
  title: string;
  tag: string;
  year: string;
  role: string;
  toolkit: string[];
  summary: string;
  accent: string;
  cover: string;
  /** Swapped in for `cover` when the site is in light mode. */
  coverLight?: string;
  /** How the cover image fits its thumbnail on the main list. Default "cover". Use "contain" for logos/icons that shouldn't be cropped. */
  coverFit?: 'cover' | 'contain';
  /** Where the cover crops from when it's taller/wider than its frame. Default "center". */
  coverPosition?: string;
  /** When true, opening the cover in the lightbox shows it at full width and lets you scroll it top-to-bottom, like scrolling a webpage — for tall full-page screenshots. */
  coverScrollable?: boolean;
}

export interface CaseStudyProject extends ProjectBase {
  type?: 'case-study';
  problem: string;
  objective: string;
  research: ProjectResearch;
  approach: string[];
  results: ProjectResult[];
  gallery?: ResearchMedia[]; // optional — replaces the generic result placeholders
}

export interface LabProject extends ProjectBase {
  /** Swaps the case-study modal for a free-form experiments grid — no problem/objective/results. */
  type: 'lab';
  experiments: Experiment[];
}

export type Project = CaseStudyProject | LabProject;

export const PROJECTS: Project[] = [
  {
    
    id: "Portfolio",
    cover: "/PortfolioFullEvidence1.png",
    coverLight: "/PortfolioFullEvidenceW.png",
    coverPosition: "top",
    coverScrollable: true,
    num: "01",
    title: "This Portfolio",
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
    gallery: [
      { label: "Galaxy", src: "/PortfolioFullEvidence1.5.png", srcLight: "/PortfolioFullEvidence1.5W.png" },
      { label: "About", src: "/PortfolioFullEvidence2.png", srcLight: "/PortfolioEvidence2w.png" },
      { label: "Contact", src: "/PortfolioFullEvidence3.png", srcLight: "/PortfolioEvidence3w.png" },
    ],
  },
  {
    id: "UNAPEC",
    cover:"LoginDashEvidence.png",
    num: "02",
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
        "Contextual inquiry with different students across different years and programs",
        "Benchmarking of existing student communication platforms (ZeeMee, LinkedIn)",
        "Survey of 150+ students on communication pain points",
      ],
      insights: [
        "Students actively monitor 4+ channels to stay informed — fatigue is universal",
        "Admins spend ~2h/day copy-pasting announcements across platforms",
        "Event discovery is the single highest pain point for students",
      ],
       graphics: [
  {
    label: "LinkedIn",
    src: "/LinkedIn_Evidence.png",
    href: "https://www.linkedin.com/",
  },
  {
    label: "ZeeMee",
    src: "/ZeemeeEvidence.png",
      href: "https://www.zeemee.com/",
  },  
  {
    label: "Students Survey",
    src: "/SurveyEvidence.png",
      href: "https://forms.cloud.microsoft/Pages/AnalysisPage.aspx?AnalyzerToken=wTXFCE8CyM67FDjdlosd3VgtW3tWWzRl&id=wXAE0EQh5k6I_mcyUZ_BY980jKNMauxDs-zTf_B4LORUQkQ2U1dKMDZaSllQWEZRODFUODBFT1BSQi4u",
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
    gallery: [
      { label: "Messages & Administrator view", src: "/MensajeriasAdmEvidence.png" },
      { label: "Jobs & Events", src: "/VacantesEventosEvidence.png" },
    ],
  },
   {
    id: "Bleu",
    num: "03",
    cover: "/BleuEvidence1.png",
    title: "Bleu",
    tag: "Mobile · Fintech",
    year: "2023",
    role: "UX Research + Design",
    toolkit: ["Figma", "User Interviews", "UML", "Wireflows"],
    summary:
      "A UX case study for Bleu's banking app — a custom alerts module and UI refresh so users never lose track of a due date again.",
    problem:
      "At Bleu, many users forget card cut-off dates and credit limits, resulting in late payments and overspending that erode their financial control.",
    objective:
      "Research, plan, and design an alerts module for Bleu's mobile app that helps users better track their finances — increasing overall satisfaction with the experience.",
    research: {
      goal: "Understand the needs behind the negative feedback Bleu had received — what users complain about most, what they ask for, and what they actually need.",
      methods: [
        "8 user interviews with customers who had submitted negative feedback",
        "Competitive analysis of 4 banking apps (CariBank, Skit, SafeX, FundsAid)",
        "5-day research sprint spanning interviews and competitor analysis",
      ],
      insights: [
        "60% of interviewees couldn't tell the difference between a card's cut-off date and its payment due date",
        "0 of the 4 competitor apps let users set up custom account alerts",
        "Users don't feel capable of saving and rarely check their finances proactively",
      ],
    },
    approach: [
      "Mapped the alert flow with a use-case and UML diagram before touching UI",
      "Built a wireflow to sequence the new screens against the app's existing structure",
      "Refreshed the visual identity — new logo, login screen, and layout",
      "Shipped a dedicated Alerts module: cut-off reminders, payment due dates, and balance-consumption notifications, each configurable by days-before and priority",
    ],
    results: [
      { k: "Users interviewed", v: "8" },
      { k: "Competitors analyzed", v: "4" },
      { k: "Negative feedback (target)", v: "-40%" },
    ],
    accent: "amber",
    gallery: [
      { label: "Dashboard", src: "/BleuEvidence2.png" },
      { label: "Alerts", src: "/BleuEvidence3.png" }
    ],
  },
  {
    id: "Experiments",
    cover:"/GithubLogo.png",
    coverFit: "contain",
    num: "04",
    title: "Code Experiments",
    tag: "WebGL · Interaction · AI",
    year: "2019 — now",
    role: "Solo",
    toolkit: ["Three.js", "WebAudio", "Shaders"],
    summary:
      "Small, sharp prototypes I build to answer a single question — 'what would this feel like?' No problems, no objectives, no results — just the bench where I try things.",
    type: "lab",
    accent: "violet",
    experiments: [
      {
        title: "Information Retrieval System",
        description:
          "A document platform where users register, log in, upload articles, and browse the uploaded catalog.",
        url: "https://elpidiom-sri.vercel.app/",
        cover: "/SRIevidence.png",
        tags: ["React"],
      },
      {
        title: "GitHub profile",
        description: "Repositories, commits, and everything else I ship outside client work.",
        url: "https://github.com/ElpidioG",
        cover: "/GithubLogo.png",
      },
    ],
  },
];
