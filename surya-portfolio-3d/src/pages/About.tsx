import { useEffect } from 'react';
import { useAvatar } from '../context/AvatarContext';
import Reveal from '../components/Reveal';

const OBJECTS = ['Laptop', 'Code', 'Camera', 'AI', 'Design', '3D'];

const STORY = [
  {
    title: 'Who I Am',
    body: "A computer science graduate who treats software like a craft — I care as much about how something feels to use as whether it technically works.",
  },
  {
    title: 'What I Build',
    body: 'Full-stack applications, data-driven tools, and interfaces with real motion and depth — from React front ends to Python-powered analytics.',
  },
  {
    title: 'What I Enjoy',
    body: 'The moment a rough idea becomes something you can click, drag, or scroll through. I like the last 10% — polish, motion, detail.',
  },
  {
    title: 'My Philosophy',
    body: 'Engineering and design are not separate disciplines. The best products come from people willing to be good at both.',
  },
];

export default function About() {
  const { setState, setCameraTarget } = useAvatar();

  useEffect(() => {
    setState('THINKING');
    setCameraTarget({ position: [1.4, 0.5, 5.6], lookAt: [-0.3, 0.1, 0], fov: 42 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-screen pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-[6vw]">
        <Reveal>
          <p className="font-space text-xs tracking-[0.22em] uppercase text-gray-500 mb-5">01 / About</p>
          <h1 className="font-space font-semibold leading-[0.92] text-[clamp(2.6rem,7vw,6rem)]">WHO AM I?</h1>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 gap-14">
          {STORY.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-space text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24 flex flex-wrap gap-3">
          {OBJECTS.map((o) => (
            <span key={o} className="font-space text-xs uppercase tracking-wider border border-white/10 rounded-full px-4 py-2 text-muted">
              {o}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
