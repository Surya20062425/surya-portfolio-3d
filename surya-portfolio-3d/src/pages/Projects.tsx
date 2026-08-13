import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAvatar } from '../context/AvatarContext';
import { useCursorHover } from '../context/CursorContext';
import { PROJECTS } from '../data/projects';
import Reveal from '../components/Reveal';

export default function Projects() {
  const { setState, setCameraTarget } = useAvatar();
  const hover = useCursorHover();

  useEffect(() => {
    setState('CODING');
    setCameraTarget({ position: [0, 0.3, 7.4], lookAt: [0, 0, 0], fov: 46 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-screen pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        <Reveal>
          <p className="font-space text-xs tracking-[0.22em] uppercase text-gray-500 mb-5">03 / Projects</p>
          <h1 className="font-space font-semibold leading-[0.92] text-[clamp(2.6rem,7vw,6rem)]">SELECTED WORK</h1>
          <p className="text-muted max-w-md mt-6">A collection of things I've built, experimented with, and shipped.</p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link
                to={`/projects/${p.slug}`}
                {...hover('project', 'VIEW')}
                className="group block border border-white/10 rounded-xl p-8 md:p-12 transition-all duration-400 hover:border-accent"
              >
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div>
                    <span className="font-space text-sm text-gray-500">PROJECT {p.index}</span>
                    <h2 className="font-space text-3xl md:text-5xl font-semibold mt-3 group-hover:text-accent transition-colors">
                      {p.name}
                    </h2>
                  </div>
                  <span className="text-[11px] uppercase tracking-wider border border-white/10 rounded-full px-4 py-2 text-muted">
                    {p.tag}
                  </span>
                </div>
                <p className="text-muted max-w-2xl mt-6 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-2 mt-8">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[11px] text-gray-500 border border-white/10 rounded-full px-3 py-1.5">
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
