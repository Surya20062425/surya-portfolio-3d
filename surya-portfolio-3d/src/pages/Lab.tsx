import { useEffect } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { useCursorHover } from '../context/CursorContext';
import { LAB_EXPERIMENTS } from '../data/experience';
import Reveal from '../components/Reveal';

export default function Lab() {
  const { setState, setCameraTarget, pulse } = useAvatar();
  const hover = useCursorHover();

  useEffect(() => {
    setState('CODING');
    setCameraTarget({ position: [0, 0.2, 6.6], lookAt: [0, 0, 0], fov: 50 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-screen pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        <Reveal>
          <p className="font-space text-xs tracking-[0.22em] uppercase text-gray-500 mb-5">05 / Lab</p>
          <h1 className="font-space font-semibold leading-[0.92] text-[clamp(2.6rem,7vw,6rem)]">THE LAB</h1>
          <p className="text-muted max-w-md mt-6">Things I build when I'm curious.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20">
          {LAB_EXPERIMENTS.map((exp, i) => (
            <Reveal key={exp.title} delay={(i % 6) * 0.04}>
              <div
                {...hover('hover')}
                onClick={() => pulse('EXCITED', 1200)}
                className="cursor-pointer border border-white/10 rounded-lg p-7 h-full hover:border-accent transition-colors duration-300"
              >
                <span className="text-[10px] tracking-[0.14em] uppercase text-accent">{exp.category}</span>
                <h3 className="font-space text-xl font-semibold mt-3">{exp.title}</h3>
                <p className="text-muted text-sm mt-3 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-[10px] text-gray-500 border border-white/10 rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
