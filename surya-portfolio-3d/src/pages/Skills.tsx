import { useEffect, useState } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { useCursorHover } from '../context/CursorContext';
import { SKILLS, SKILL_CATEGORIES } from '../data/skills';
import Reveal from '../components/Reveal';

export default function Skills() {
  const { setState, setCameraTarget, pulse } = useAvatar();
  const hover = useCursorHover();
  const [active, setActive] = useState<(typeof SKILL_CATEGORIES)[number]>('ALL');

  useEffect(() => {
    setState('LOOKING_AT_UI');
    setCameraTarget({ position: [0, 0.6, 7], lookAt: [0, 0, 0], fov: 48 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = active === 'ALL' ? SKILLS : SKILLS.filter((s) => s.category === active);

  return (
    <section className="relative min-h-screen pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        <Reveal>
          <p className="font-space text-xs tracking-[0.22em] uppercase text-gray-500 mb-5">02 / Skills</p>
          <h1 className="font-space font-semibold leading-[0.92] text-[clamp(2.6rem,7vw,6rem)]">
            TECHNOLOGY
            <br />
            UNIVERSE
          </h1>
        </Reveal>

        <Reveal className="flex flex-wrap gap-3 mt-14 mb-14">
          {SKILL_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={[
                'px-5 py-2.5 rounded-full text-xs uppercase tracking-wider border transition-colors',
                active === c ? 'bg-accent text-black border-accent' : 'border-white/10 text-muted hover:text-white',
              ].join(' ')}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((s, i) => (
            <Reveal key={s.name} delay={(i % 8) * 0.03}>
              <div
                {...hover('3d', 'DRAG')}
                onMouseEnter={() => pulse('EXCITED', 900)}
                className="group border border-white/10 rounded-lg p-6 h-full transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(201,162,75,0.35)]"
              >
                <span className="text-[10px] tracking-[0.14em] uppercase text-gray-500">{s.category}</span>
                <h3 className="font-space text-xl font-semibold mt-3">{s.name}</h3>
                <p className="text-muted text-sm mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
