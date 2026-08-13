import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAvatar } from '../context/AvatarContext';
import { useCursorHover } from '../context/CursorContext';
import { PROJECTS } from '../data/projects';
import Reveal from '../components/Reveal';

const STAGES = [
  { key: 'problem', label: 'Problem' },
  { key: 'approach', label: 'Idea → Development' },
  { key: 'outcome', label: 'Final Product' },
] as const;

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const { setState, setCameraTarget } = useAvatar();
  const hover = useCursorHover();

  useEffect(() => {
    setState('THINKING');
    setCameraTarget({ position: [-1.2, 0.4, 5.8], lookAt: [0.3, 0, 0], fov: 40 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <section className="relative min-h-screen pt-40 pb-32">
      <div className="max-w-[1000px] mx-auto px-[6vw]">
        <Reveal>
          <Link to="/projects" {...hover('link', 'BACK')} className="text-xs uppercase tracking-wider text-gray-500">
            ← All Projects
          </Link>
          <p className="font-space text-xs tracking-[0.22em] uppercase text-gray-500 mt-8 mb-4">Project {project.index}</p>
          <h1 className="font-space font-semibold leading-[0.95] text-[clamp(2.4rem,6vw,5rem)]">{project.name}</h1>
          <p className="text-muted max-w-xl mt-6 leading-relaxed">{project.description}</p>
        </Reveal>

        <Reveal className="flex flex-wrap gap-2 mt-8">
          {project.stack.map((s) => (
            <span key={s} className="text-[11px] text-gray-500 border border-white/10 rounded-full px-3 py-1.5">
              {s}
            </span>
          ))}
        </Reveal>

        <Reveal className="mt-10 flex gap-4">
          <a href={project.link} target="_blank" rel="noopener noreferrer" {...hover('project', 'VIEW')} className="btn-fill">
            Live Demo →
          </a>
        </Reveal>

        <div className="mt-24 flex flex-col gap-14">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.key} delay={i * 0.05}>
              <div className="border-t border-white/10 pt-6">
                <span className="font-space text-sm text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-space text-2xl font-semibold mt-2 mb-3">{stage.label}</h3>
                <p className="text-muted leading-relaxed max-w-2xl">{project[stage.key]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
