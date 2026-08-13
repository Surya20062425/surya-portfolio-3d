import type { ExperienceStage, LabExperiment } from '../types';

export const EXPERIENCE: ExperienceStage[] = [
  {
    year: '2023',
    title: 'Learning',
    description:
      'Started with the fundamentals — programming logic, web basics, and the discipline of building things all the way through.',
    highlights: ['Core CS coursework', 'First HTML/CSS/JS projects', 'Python fundamentals'],
  },
  {
    year: '2024',
    title: 'Building',
    description:
      'Moved from tutorials to shipped projects — full-stack apps, real APIs, and the messy parts of finishing software.',
    highlights: ['React & Node full-stack projects', 'First deployed apps', 'Git-based workflows'],
  },
  {
    year: '2025',
    title: 'AI + Development',
    description:
      'Paired engineering with data — completed job simulations with Deloitte, Tata, and Forage Academy, and picked up generative & responsible AI practice.',
    highlights: ['Deloitte & Tata job simulations', 'Google Generative/Responsible AI', 'Data analytics & automation with n8n'],
  },
  {
    year: '2026',
    title: 'Creative Developer',
    description:
      'Bringing engineering and design together — building immersive, motion-driven interfaces where the craft of the build is part of the product.',
    highlights: ['3D & WebGL interfaces', 'GSAP-driven motion systems', 'This portfolio'],
  },
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    title: 'Particle Field Playground',
    category: 'WebGL',
    description: 'An interactive Three.js particle system that responds to cursor velocity and clicks.',
    tech: ['Three.js', 'React Three Fiber'],
  },
  {
    title: 'Algorithm Visualizer',
    category: 'Java',
    description: 'A sorting-algorithm visualizer with a Java backend simulation feeding an animated front end.',
    tech: ['Java', 'Canvas', 'JavaScript'],
  },
  {
    title: 'Generative Grid Art',
    category: 'Generative Art',
    description: 'Canvas-based generative compositions seeded from mouse movement and time.',
    tech: ['Canvas API', 'JavaScript'],
  },
  {
    title: 'Prompt Playground',
    category: 'AI',
    description: 'A small sandbox for experimenting with prompt structures and generative AI response shaping.',
    tech: ['Generative AI', 'Prompt Engineering'],
  },
  {
    title: 'Flutter Micro-Interactions',
    category: 'Flutter',
    description: 'A set of small Flutter widgets exploring physics-based micro-interactions and gestures.',
    tech: ['Flutter', 'Dart'],
  },
  {
    title: 'Automation Pipelines',
    category: 'Automation',
    description: 'n8n workflows chaining APIs and AI steps together for hands-off data processing.',
    tech: ['n8n', 'Automation'],
  },
];
