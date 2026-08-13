import type { Skill } from '../types';

export const SKILLS: Skill[] = [
  { name: 'React', category: 'FRONTEND', note: 'Component architecture, hooks, state management' },
  { name: 'JavaScript', category: 'FRONTEND', note: 'Modern ES6+, async patterns' },
  { name: 'TypeScript', category: 'FRONTEND', note: 'Strongly-typed application architecture' },
  { name: 'HTML/CSS', category: 'FRONTEND', note: 'Semantic markup, responsive layout systems' },
  { name: 'Tailwind CSS', category: 'FRONTEND', note: 'Utility-first styling at scale' },

  { name: 'Node.js', category: 'BACKEND', note: 'REST APIs, server-side JavaScript' },
  { name: 'Django', category: 'BACKEND', note: 'Python web framework, ORM' },
  { name: 'Express', category: 'BACKEND', note: 'Lightweight API routing & middleware' },
  { name: 'PHP', category: 'BACKEND', note: 'Server-side scripting fundamentals' },

  { name: 'Flutter', category: 'MOBILE', note: 'Cross-platform app development' },
  { name: 'Firebase', category: 'MOBILE', note: 'Realtime data, auth, multiplayer backends' },

  { name: 'Generative AI', category: 'AI', note: 'Prompting, LLM integration' },
  { name: 'Responsible AI', category: 'AI', note: 'Ethics, fairness, transparency' },
  { name: 'n8n', category: 'AI', note: 'Workflow & process automation' },
  { name: 'Predictive Analytics', category: 'AI', note: 'Model validation, forecasting' },

  { name: 'Three.js', category: '3D', note: 'WebGL scenes, geometry, materials' },
  { name: 'React Three Fiber', category: '3D', note: 'Declarative 3D in React' },
  { name: 'GSAP', category: '3D', note: 'Cinematic motion & scroll choreography' },

  { name: 'Figma', category: 'DESIGN', note: 'UI systems, prototyping' },
  { name: 'Data Visualization', category: 'DESIGN', note: 'Communicating data clearly' },

  { name: 'Git', category: 'TOOLS', note: 'Version control, collaborative workflows' },
  { name: 'Docker', category: 'TOOLS', note: 'Containerized environments' },
  { name: 'Python', category: 'TOOLS', note: 'Pandas, Jupyter, scripting & analysis' },
  { name: 'SQL', category: 'TOOLS', note: 'Relational data modeling & queries' },
];

export const SKILL_CATEGORIES = ['ALL', 'FRONTEND', 'BACKEND', 'MOBILE', 'AI', '3D', 'DESIGN', 'TOOLS'] as const;
