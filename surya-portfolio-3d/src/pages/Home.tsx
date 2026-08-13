import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useAvatar } from '../context/AvatarContext';
import { useCursorHover } from '../context/CursorContext';

const TAGS = [
  { label: 'DEVELOPER', pos: 'top-[18%] left-[8%]' },
  { label: 'DESIGNER', pos: 'top-[28%] right-[10%]' },
  { label: '3D CREATIVE', pos: 'bottom-[26%] left-[10%]' },
  { label: 'AI BUILDER', pos: 'bottom-[16%] right-[8%]' },
];

export default function Home() {
  const { setState, setCameraTarget, setPointer } = useAvatar();
  const hover = useCursorHover();

  useEffect(() => {
    setState('CURSOR_FOLLOW');
    setCameraTarget({ position: [0, 0.4, 6.2], lookAt: [0, 0.1, 0], fov: 45 });

    gsap.fromTo(
      '.home-line span',
      { yPercent: 110 },
      { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out', delay: 0.1 }
    );
    gsap.fromTo('.home-fade', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, delay: 0.6 });

    function onMove(e: MouseEvent) {
      setPointer((e.clientX / window.innerWidth - 0.5) * 2, (e.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-10 overflow-hidden">
      {TAGS.map((t) => (
        <span
          key={t.label}
          className={`home-fade absolute ${t.pos} font-space text-[11px] tracking-[0.16em] uppercase text-muted border border-white/10 rounded-full px-4 py-2 hidden md:block`}
        >
          {t.label}
        </span>
      ))}

      <div className="flex-1 flex items-center justify-center text-center pointer-events-none">
        <div>
          <p className="home-fade font-space text-xs tracking-[0.3em] uppercase text-muted mb-4">Hey, I'm</p>
          <h1 className="font-space font-bold leading-[0.88] text-[clamp(3.4rem,11vw,9rem)]">
            <span className="home-line block overflow-hidden">
              <span className="inline-block">SURYA</span>
            </span>
            <span className="home-line block overflow-hidden">
              <span className="inline-block">PRAKASH</span>
            </span>
          </h1>
          <p className="home-fade font-space text-sm md:text-base tracking-[0.2em] uppercase text-accent mt-6">
            Creative Developer
          </p>
          <p className="home-fade max-w-md mx-auto text-muted mt-4 text-sm md:text-base leading-relaxed">
            I build digital experiences where code meets creativity.
          </p>
        </div>
      </div>

      <div className="home-fade w-full max-w-[1400px] mx-auto px-[6vw] flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
        <Link to="/about" className="btn-fill" {...hover('link', 'ENTER')}>
          Explore My World →
        </Link>
        <Link to="/projects" className="btn-outline" {...hover('link', 'VIEW')}>
          View Projects
        </Link>
      </div>
    </section>
  );
}
