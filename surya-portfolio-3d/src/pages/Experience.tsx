import { useEffect, useState } from 'react';
import { useAvatar } from '../context/AvatarContext';
import { useCursorHover } from '../context/CursorContext';
import { EXPERIENCE } from '../data/experience';
import Reveal from '../components/Reveal';

export default function Experience() {
  const { setState, setCameraTarget } = useAvatar();
  const hover = useCursorHover();
  const [active, setActive] = useState(EXPERIENCE.length - 1);

  useEffect(() => {
    setState('WALKING');
    setCameraTarget({ position: [0, 0.5, 7], lookAt: [0, 0, 0], fov: 46 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-screen pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        <Reveal>
          <p className="font-space text-xs tracking-[0.22em] uppercase text-gray-500 mb-5">04 / Experience</p>
          <h1 className="font-space font-semibold leading-[0.92] text-[clamp(2.6rem,7vw,6rem)]">THE JOURNEY</h1>
        </Reveal>

        {/* path */}
        <Reveal className="mt-20 relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-white/10" />
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            {EXPERIENCE.map((stage, i) => (
              <button
                key={stage.year}
                onClick={() => setActive(i)}
                {...hover('hover', 'VIEW')}
                className="text-left flex md:flex-col items-center md:items-start gap-4 md:gap-6 relative"
              >
                <span
                  className={[
                    'w-3 h-3 rounded-full border transition-all flex-shrink-0',
                    active === i ? 'bg-accent border-accent scale-125' : 'bg-black border-white/30',
                  ].join(' ')}
                />
                <div>
                  <div className={`font-space text-2xl font-semibold transition-colors ${active === i ? 'text-white' : 'text-gray-600'}`}>
                    {stage.year}
                  </div>
                  <div className={`text-xs uppercase tracking-wider mt-1 ${active === i ? 'text-accent' : 'text-gray-600'}`}>
                    {stage.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16 max-w-2xl border-t border-white/10 pt-10" key={active}>
          <h2 className="font-space text-3xl font-semibold mb-4">{EXPERIENCE[active].title}</h2>
          <p className="text-muted leading-relaxed mb-8">{EXPERIENCE[active].description}</p>
          <ul className="flex flex-col gap-3">
            {EXPERIENCE[active].highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
