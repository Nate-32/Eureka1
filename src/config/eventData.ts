export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
}

export interface AboutHighlight {
  id: string;
  title: string;
  description: string;
  icon: 'sparkles' | 'layers' | 'compass';
}

export interface TrackItem {
  id: string;
  title: string;
  focusArea: string;
  description: string;
  icon: 'atom' | 'brain-circuit' | 'dna' | 'globe';
}

export interface PrizeTier {
  id: string;
  rankLabel: string;
  title: string;
  amountPlaceholder: string;
  summary: string;
  perks: string[];
  featured?: boolean;
  accent: 'silver' | 'amber' | 'ice';
}

export interface SponsorSlot {
  id: string;
  placeholderLabel: string;
  logoUrl?: string;
}

export interface SponsorTier {
  id: string;
  tierName: string;
  subtitle: string;
  slots: SponsorSlot[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactChannel {
  id: string;
  role: string;
  label: string;
  value: string;
  href?: string;
  icon: 'mail' | 'message-square' | 'phone';
}

export function assetUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = relativePath.startsWith('/')
    ? relativePath.slice(1)
    : relativePath;
  return `${normalizedBase}${normalizedPath}`;
}

export const eventData = {
  brandName: 'EUREKA',
  tagline: 'IGNITE: DISCOVERY',
  heroIdentityLabel: 'Engineering & Innovation Summit · Ignite: Discovery',
  heroSubtitle:
    'A breakthrough moment in a frozen, atmospheric world — where deep curiosity meets luminous realization and working prototypes come to life.',
  primaryCtaLabel: 'Explore EUREKA',
  secondaryCtaLabel: 'Discover More',
  submitProposalLabel: 'Submit Proposal',
  externalProposalFormUrl: null as string | null,
  externalQueryFormUrl: null as string | null,
  assets: {
    heroBackground: 'assets/aistudio/BG_2d93766c.png',
    heroBackgroundWebp: 'assets/aistudio/BG_2d93766c.webp',
    heroTypography: 'assets/aistudio/Typo_e768a689.png',
    heroTypographyWebp: 'assets/aistudio/Typo_e768a689.webp',
    frostEdge: 'assets/aistudio/Snow_82a6541e.png',
  },
  navLinks: [
    {id: 'about', label: 'About', href: '#about'},
    {id: 'tracks', label: 'Tracks', href: '#tracks'},
    {id: 'prizes', label: 'Prizes', href: '#prizes'},
    {id: 'faq', label: 'FAQ', href: '#faq'},
    {id: 'contact', label: 'Contact', href: '#contact'},
  ] as NavLinkItem[],
  about: {
    eyebrow: 'The Philosophy',
    heading: 'Where Breakthroughs Begin.',
    leadParagraph:
      'EUREKA celebrates rigorous engineering, original research, hands-on experimentation, and working prototypes. Built for teams who step into unexplored territory and turn abstract questions into tangible systems.',
    secondaryParagraph:
      'Guided by the Ignite: Discovery visual ethos, ideas evolve from quiet midnight inquiry under the aurora into functional demonstrations evaluated by technical mentors and industry pioneers.',
    highlights: [
      {
        id: 'ignition',
        title: 'From Darkness to Clarity',
        description:
          'Focused build cycles that take raw hypotheses from initial sketch to demonstrable prototype.',
        icon: 'sparkles',
      },
      {
        id: 'prototypes',
        title: 'Built for Working Systems',
        description:
          'Emphasis on verifiable engineering, hardware-software integration, and reproducible results.',
        icon: 'layers',
      },
      {
        id: 'synergy',
        title: 'Cross-Disciplinary Discovery',
        description:
          'Collaborative convergence across deep tech, machine intelligence, biosciences, and frontier tools.',
        icon: 'compass',
      },
    ] as AboutHighlight[],
  },
  tracks: {
    eyebrow: 'Discovery Tracks',
    heading: 'Explore Your Field of Impact',
    subtitle:
      'Four focused domains engineered for deep experimentation, technical depth, and real-world breakthroughs.',
    items: [
      {
        id: 'quantum-deep-tech',
        title: 'Quantum & Deep Tech',
        focusArea: 'Hardware · Simulation · Cryptography',
        description:
          'Pioneering work in quantum computing, novel cryptographic primitives, materials simulation, and post-silicon architectures.',
        icon: 'atom',
      },
      {
        id: 'intelligent-systems-ai',
        title: 'Intelligent Systems & AI',
        focusArea: 'Reasoning · Multimodal · Edge Compute',
        description:
          'Autonomous agents, structured reasoning models, multimodal perception, and edge-deployable systems solving complex challenges.',
        icon: 'brain-circuit',
      },
      {
        id: 'bio-discovery-health',
        title: 'Bio-Discovery & Health',
        focusArea: 'Computational Bio · Biosensors · MedTech',
        description:
          'Computational biology, diagnostic interfaces, resilient medical tooling, and planetary biosensors designed for human well-being.',
        icon: 'dna',
      },
      {
        id: 'open-breakthrough',
        title: 'Open Breakthrough',
        focusArea: 'Frontier Software · Open Science',
        description:
          'Unconventional engineering ideas that cross traditional boundaries—frontier developer tooling, open science, and bold moonshots.',
        icon: 'globe',
      },
    ] as TrackItem[],
  },
  prizes: {
    eyebrow: 'Awards & Recognition',
    heading: 'Honoring True Innovation',
    subtitle:
      'Recognizing standout engineering execution, research depth, and high-impact working prototypes.',
    sampleNotice:
      'Sample prize structure shown as editable placeholders. Official prize pools and partner perks are subject to final confirmation.',
    tiers: [
      {
        id: 'runner-up',
        rankLabel: 'Runner Up',
        title: 'Aurora Discovery',
        amountPlaceholder: 'Prize Pool TBD',
        summary:
          'Awarded for exceptional technical execution, reliability, and prototype polish.',
        perks: [
          'Runner-up grant & recognition (TBD)',
          'Cloud & compute partner credits (TBD)',
          'Technical mentorship fast-track',
        ],
        accent: 'silver',
      },
      {
        id: 'grand-champion',
        rankLabel: 'Grand Champion',
        title: 'The Eureka Prize',
        amountPlaceholder: 'Grand Award TBD',
        summary:
          'Highest distinction for the most transformative breakthrough prototype overall.',
        perks: [
          'Grand Champion grant & trophy (TBD)',
          'Incubation & research advisory track',
          'Dedicated GPU & cloud compute pool (TBD)',
          'Featured Demo Day showcase slot',
        ],
        featured: true,
        accent: 'amber',
      },
      {
        id: 'third-place',
        rankLabel: 'Third Place',
        title: 'Ignite Catalyst',
        amountPlaceholder: 'Award TBD',
        summary:
          'Honoring the most promising early-stage technical breakthrough and concept.',
        perks: [
          'Third-place grant & certificate (TBD)',
          'Ecosystem compute credits (TBD)',
          'Partner network introductions',
        ],
        accent: 'ice',
      },
    ] as PrizeTier[],
  },
  sponsors: {
    eyebrow: 'Ecosystem Partners',
    heading: 'Event Sponsors',
    subtitle:
      'Backed by forward-looking institutions, research labs, and technology partners.',
    placeholderNotice:
      'Editable sponsor placement slots below. Official partner logos and announcements will appear here once confirmed.',
    tiers: [
      {
        id: 'platinum',
        tierName: 'Platinum Partners',
        subtitle: 'Lead infrastructure & flagship breakthrough patrons',
        slots: [
          {id: 'plat-1', placeholderLabel: 'Platinum Partner Slot 01'},
          {id: 'plat-2', placeholderLabel: 'Platinum Partner Slot 02'},
        ],
      },
      {
        id: 'gold',
        tierName: 'Gold Partners',
        subtitle: 'Track supporters & compute ecosystem collaborators',
        slots: [
          {id: 'gold-1', placeholderLabel: 'Gold Partner Slot 01'},
          {id: 'gold-2', placeholderLabel: 'Gold Partner Slot 02'},
          {id: 'gold-3', placeholderLabel: 'Gold Partner Slot 03'},
        ],
      },
      {
        id: 'silver',
        tierName: 'Silver Partners',
        subtitle: 'Community & tooling contributors',
        slots: [
          {id: 'silver-1', placeholderLabel: 'Silver Partner Slot 01'},
          {id: 'silver-2', placeholderLabel: 'Silver Partner Slot 02'},
          {id: 'silver-3', placeholderLabel: 'Silver Partner Slot 03'},
          {id: 'silver-4', placeholderLabel: 'Silver Partner Slot 04'},
        ],
      },
    ] as SponsorTier[],
  },
  finalCta: {
    heading: 'One Idea Changes Everything.',
    description:
      'Step out of the dark and illuminate what comes next. Prepare your concept, assemble your team, and bring a working breakthrough to EUREKA.',
    ctaLabel: 'Submit Your Proposal',
  },
  faq: {
    eyebrow: 'Information & Guidelines',
    heading: 'Frequently Asked Questions',
    subtitle:
      'Core details about participating in EUREKA and submitting a proposal.',
    draftNotice:
      'Draft FAQ content shown below. Official eligibility criteria and event rules are subject to confirmation prior to opening.',
    items: [
      {
        id: 'faq-1',
        question: 'Who can submit a proposal for EUREKA?',
        answer:
          'Draft policy: EUREKA is designed for university students, researchers, builders, and engineers across disciplines. Final team size limits and attendance format details will be confirmed in the official rulebook.',
      },
      {
        id: 'faq-2',
        question: 'What does the "Ignite: Discovery" theme emphasize?',
        answer:
          'Projects are encouraged to highlight a genuine moment of breakthrough—illuminating an unsolved technical problem with a clear, verifiable prototype rather than purely theoretical slides.',
      },
      {
        id: 'faq-3',
        question: 'Are there participation fees or hardware prerequisites?',
        answer:
          'Draft policy: Participation details, venue provisions, and compute/hardware support kits will be published alongside official registration announcements.',
      },
      {
        id: 'faq-4',
        question: 'Who retains ownership of intellectual property built at the event?',
        answer:
          'Draft policy: Builders are intended to retain ownership of their original code and intellectual property. Exact legal terms will be specified in the confirmed participant agreement.',
      },
    ] as FaqItem[],
  },
  contact: {
    eyebrow: 'Reach Out',
    heading: 'Get in Touch',
    subtitle:
      'Questions about proposals, tracks, or sponsorships? Connect with the organizing desk.',
    channels: [
      {
        id: 'desk-general',
        role: 'Organizing Committee',
        label: 'General & Event Desk',
        value: 'organizing-desk@eureka-event.example',
        icon: 'mail',
      },
      {
        id: 'desk-tech',
        role: 'Tracks & Proposals',
        label: 'Technical Coordination',
        value: 'proposals@eureka-event.example',
        icon: 'message-square',
      },
      {
        id: 'desk-sponsors',
        role: 'Ecosystem Partnerships',
        label: 'Sponsorship Inquiries',
        value: 'partners@eureka-event.example',
        icon: 'phone',
      },
    ] as ContactChannel[],
    placeholderNote:
      'Contact details above are editable placeholders configured in src/config/eventData.ts.',
  },
  footer: {
    description:
      'IGNITE: DISCOVERY — An engineering and innovation summit built around luminous breakthroughs beneath the winter aurora.',
    copyright: 'EUREKA. All rights reserved.',
  },
};
