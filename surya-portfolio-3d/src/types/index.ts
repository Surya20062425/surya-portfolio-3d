export type AvatarState =
  | 'IDLE'
  | 'CURSOR_FOLLOW'
  | 'LOOKING_AT_UI'
  | 'WALKING'
  | 'THINKING'
  | 'CODING'
  | 'EXCITED'
  | 'SUCCESS'
  | 'CONTACT';

export type CursorState = 'default' | 'hover' | 'project' | 'link' | 'avatar' | '3d';

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  tag: string;
  description: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  link: string;
}

export type SkillCategory = 'FRONTEND' | 'BACKEND' | 'MOBILE' | 'AI' | '3D' | 'DESIGN' | 'TOOLS';

export interface Skill {
  name: string;
  category: SkillCategory;
  note: string;
}

export interface Certification {
  title: string;
  org: string;
  desc: string;
  id: string;
  link: string;
}

export interface ExperienceStage {
  year: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface LabExperiment {
  title: string;
  category: string;
  description: string;
  tech: string[];
}
