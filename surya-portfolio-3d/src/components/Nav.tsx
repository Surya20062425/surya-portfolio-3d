import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCursorHover } from '../context/CursorContext';

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/lab', label: 'Lab' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [shrink, setShrink] = useState(false);
  const [open, setOpen] = useState(false);
  const hover = useCursorHover();

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 w-full z-[500] flex items-center transition-[height] duration-300',
          'bg-black/70 backdrop-blur-md border-b border-white/[0.06]',
          shrink ? 'h-16' : 'h-20',
        ].join(' ')}
      >
        <div className="w-full max-w-[1400px] mx-auto px-[6vw] flex items-center justify-between">
          <NavLink to="/" className="font-space font-semibold text-lg" {...hover('link', 'HOME')}>
            SURYA<span className="text-accent">.DEV</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-9">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                {...hover('link', 'OPEN')}
                className={({ isActive }) =>
                  [
                    'text-[13px] tracking-wide relative py-1 transition-colors',
                    isActive ? 'text-white' : 'text-muted hover:text-white',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && <span className="absolute left-0 -bottom-0.5 w-full h-px bg-accent" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <button
            className="md:hidden relative w-8 h-5"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`absolute left-0 top-0 w-full h-px bg-white transition-transform duration-300 ${open ? 'translate-y-[9px] rotate-45' : ''}`}
            />
            <span className={`absolute left-0 top-[9px] w-full h-px bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
            <span
              className={`absolute left-0 top-[18px] w-full h-px bg-white transition-transform duration-300 ${open ? '-translate-y-[9px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      <div
        className={[
          'fixed inset-0 z-[400] bg-black flex flex-col justify-center gap-6 px-[8vw] transition-transform duration-500',
          open ? 'translate-y-0' : '-translate-y-full',
        ].join(' ')}
      >
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={() => setOpen(false)}
            className="font-space text-4xl font-semibold"
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}
