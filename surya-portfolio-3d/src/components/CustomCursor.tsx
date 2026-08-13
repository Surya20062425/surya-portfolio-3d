import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCursor } from '../context/CursorContext';

const LABELS: Record<string, string> = {
  project: 'VIEW',
  link: 'OPEN',
  avatar: 'INTERACT',
  '3d': 'DRAG',
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { state, label } = useCursor();

  useEffect(() => {
    const isTouch = window.matchMedia('(hover:none), (pointer:coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });

    function onMove(e: MouseEvent) {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      setRingX(e.clientX);
      setRingY(e.clientY);
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const expanded = state !== 'default';
  const displayLabel = label || LABELS[state] || '';

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={ringRef}
        className={[
          'fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center',
          'border transition-[width,height,background-color,border-color] duration-200 ease-out',
          expanded ? 'w-[70px] h-[70px] bg-white/[0.06] border-white/80' : 'w-[34px] h-[34px] bg-transparent border-white/50',
        ].join(' ')}
      >
        <span
          className="font-space text-[10px] tracking-[0.14em] uppercase transition-opacity duration-150"
          style={{ opacity: expanded && displayLabel ? 1 : 0 }}
        >
          {displayLabel}
        </span>
      </div>
    </>
  );
}
